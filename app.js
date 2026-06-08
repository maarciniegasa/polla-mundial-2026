// app.js - Polla Mundialista 2026 | Firebase Firestore Edition

const ADMIN_EMAIL = 'maarciniegasa@gmail.com';

// Sanitize email for safe Firestore document ID
function emailId(email) {
    return email.toLowerCase().replace(/\./g, '_').replace(/@/g, '_at_');
}

// --- LOADING UI ---
function showLoading(msg = 'Cargando...') {
    const el = document.getElementById('loading-overlay');
    if (el) {
        el.style.display = 'flex';
        document.getElementById('loading-msg').textContent = msg;
    }
}
function hideLoading() {
    const el = document.getElementById('loading-overlay');
    if (el) el.style.display = 'none';
}

// --- FIRESTORE INIT: Seed matches once on first run ---
    async function initDB() {
        const configRef = db.collection('config').doc('app');
        const configSnap = await configRef.get();
        if (!configSnap.exists) {
            showLoading('Inicializando base de datos por primera vez...');
            const batch = db.batch();
            allMatchesData.forEach(match => {
                batch.set(db.collection('matches').doc(String(match.id)), match);
            });
            await batch.commit();
            await configRef.set({
                matchesSeeded: true,
                seededAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ Partidos cargados a Firestore.');
        }

        // Fix legacy phase name for match 104
        const finalRef = db.collection('matches').doc('104');
        const finalSnap = await finalRef.get();
        if (finalSnap.exists && finalSnap.data().phase === 'FINAL') {
            await finalRef.update({ phase: 'Final' });
        }
    }

// --- TIME LOCK LOGIC ---
function parseMatchTime(timeStr) {
    const monthMap = {
        'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
        'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11,
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const m = timeStr.match(/(\w+)\s+(\d+)-([A-Za-z]+),\s*(\d+):(\d+)\s*(a|p)\.?/i);
    if (!m) return null;
    const month = monthMap[m[3]];
    if (month === undefined) return null;
    const day = parseInt(m[2]);
    let hour = parseInt(m[4]);
    const minute = parseInt(m[5]);
    const isPM = m[6].toLowerCase() === 'p';
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    return new Date(Date.UTC(2026, month, day, hour + 5, minute, 0));
}

function isPredLocked(match) {
    if (match.status === 'finished' || match.isTBD) return true;
    const kickoff = parseMatchTime(match.time);
    if (!kickoff) return false;
    const cutoff = new Date(kickoff.getTime() - 30 * 60 * 1000);
    return Date.now() >= cutoff.getTime();
}

function getLockLabel(match) {
    if (match.status === 'finished') return 'FINALIZADO';
    if (match.isTBD) return 'Equipos por definir';
    const kickoff = parseMatchTime(match.time);
    if (!kickoff) return match.time;
    const cutoff = new Date(kickoff.getTime() - 30 * 60 * 1000);
    const now = Date.now();
    if (now >= kickoff.getTime()) return '🔴 EN JUEGO';
    if (now >= cutoff.getTime()) {
        const minsLeft = Math.ceil((kickoff.getTime() - now) / 60000);
        return `🔒 CERRADO (en ${minsLeft} min)`;
    }
    const minsToLock = Math.ceil((cutoff.getTime() - now) / 60000);
    if (minsToLock <= 120) return `⏱ Cierra en ${minsToLock} min`;
    return match.time;
}

// --- AUTH LOGIC (Firebase Authentication) ---
let currentUser = null;
let authMode = 'login';
let authReady = false;
let currentGroupId = null;
let allGroups = {};

window.toggleAuthMode = function(mode) {
    authMode = mode;
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('auth-name').style.display = mode === 'register' ? 'block' : 'none';
    document.getElementById('auth-submit-btn').textContent = mode === 'register' ? 'Registrarse' : 'Ingresar';
    document.getElementById('auth-error').textContent = '';
};

document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim().toLowerCase();
    const pass  = document.getElementById('auth-password').value;
    const name  = document.getElementById('auth-name').value.trim();
    const errorEl = document.getElementById('auth-error');
    errorEl.textContent = '';

    showLoading(authMode === 'register' ? 'Registrando cuenta...' : 'Ingresando...');

    try {
        if (authMode === 'register') {
            if (!name) { errorEl.textContent = 'El nombre es obligatorio.'; hideLoading(); return; }

            try {
                await auth.createUserWithEmailAndPassword(email, pass);
            } catch (regErr) {
                if (regErr.code === 'auth/email-already-in-use') {
                    errorEl.textContent = 'El correo ya está registrado.';
                } else if (regErr.code === 'auth/weak-password') {
                    errorEl.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                } else {
                    errorEl.textContent = 'Error al registrar. Intenta de nuevo.';
                }
                hideLoading();
                return;
            }

            await db.collection('users').doc(emailId(email)).set({
                email, name, groups: [],
                role: email === ADMIN_EMAIL ? 'admin' : 'player',
                isApproved: email === ADMIN_EMAIL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            const snap = await db.collection('users').doc(emailId(email)).get();
            await loginUser(snap.data());

        } else {
            try {
                await auth.signInWithEmailAndPassword(email, pass);
            } catch (authErr) {
                if (authErr.code === 'auth/user-not-found') {
                    const snap = await db.collection('users').doc(emailId(email)).get();
                    if (snap.exists && snap.data().password && snap.data().password === pass) {
                        await auth.createUserWithEmailAndPassword(email, pass);
                        await snap.ref.update({
                            password: firebase.firestore.FieldValue.delete()
                        });
                    } else {
                        throw new Error('Correo o contraseña incorrectos.');
                    }
                } else if (authErr.code === 'auth/wrong-password') {
                    throw new Error('Correo o contraseña incorrectos.');
                } else {
                    throw authErr;
                }
            }

            const snap = await db.collection('users').doc(emailId(email)).get();
            if (!snap.exists) throw new Error('Cuenta no encontrada.');
            await loginUser(snap.data());
        }
    } catch(err) {
        errorEl.textContent = err.message || 'Error de conexión. Intenta de nuevo.';
        console.error(err);
    }
    hideLoading();
});

async function loginUser(user) {
    currentUser = user;
    await initDB();
    await initGroups();

    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    document.getElementById('current-user-name').textContent = user.name;

    const adminNav   = document.getElementById('nav-admin');
    const usersNav   = document.getElementById('nav-users');
    const groupsNav  = document.getElementById('nav-groups');
    const pendingNav = document.getElementById('nav-pending');
    const navBtnsArr = Array.from(document.querySelectorAll('.nav-btn'));

    if (user.role === 'admin') {
        adminNav.style.display   = 'inline-block';
        usersNav.style.display   = 'inline-block';
        groupsNav.style.display  = 'inline-block';
        pendingNav.style.display = 'none';
        navBtnsArr.forEach(btn => {
            if (btn.id !== 'nav-pending') btn.style.display = 'inline-block';
        });
        document.querySelector('[data-target="predictions"]').click();
        await renderUsersView();
    } else {
        adminNav.style.display = 'none';
        usersNav.style.display = 'none';
        groupsNav.style.display = 'none';
        if (!user.isApproved) {
            navBtnsArr.forEach(btn => btn.style.display = 'none');
            pendingNav.style.display = 'inline-block';
            pendingNav.click();
        } else {
            navBtnsArr.forEach(btn => {
                const hide = ['nav-admin', 'nav-users', 'nav-pending'];
                btn.style.display = hide.includes(btn.id) ? 'none' : 'inline-block';
            });
            document.querySelector('[data-target="predictions"]').click();
        }
    }
    await renderMatchesView();
    await updateLeaderboard();
}

window.logout = async function() {
    await auth.signOut();
    currentUser = null;
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
};

// --- GROUPS LOGIC ---
async function initGroups() {
    const groupsSnap = await db.collection('groups').orderBy('createdAt').get();
    allGroups = {};
    groupsSnap.docs.forEach(d => { allGroups[d.id] = d.data(); });

    const selector = document.getElementById('group-selector');
    selector.innerHTML = '';

    const userGroups = currentUser.role === 'admin'
        ? Object.keys(allGroups)
        : (currentUser.groups || []);

    if (userGroups.length === 0) {
        selector.style.display = 'none';
        currentGroupId = null;
        return;
    }

    userGroups.forEach(gid => {
        const grp = allGroups[gid];
        if (grp) {
            const opt = document.createElement('option');
            opt.value = gid;
            opt.textContent = grp.name;
            selector.appendChild(opt);
        }
    });

    if (userGroups.length > 1) selector.style.display = 'inline-block';
    else selector.style.display = 'none';

    currentGroupId = userGroups[0] || null;
    selector.value = currentGroupId || '';
}

window.onGroupChange = function() {
    currentGroupId = document.getElementById('group-selector').value || null;
    if (document.getElementById('leaderboard').classList.contains('active')) {
        updateLeaderboard();
    }
};

window.createGroup = async function() {
    const input = document.getElementById('new-group-name');
    const name = input.value.trim();
    if (!name) { alert('Ingresa un nombre para el grupo.'); return; }

    try {
        const ref = await db.collection('groups').add({
            name, createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        // Auto-assign admin to the new group
        const adminRef = db.collection('users').doc(emailId(currentUser.email));
        await adminRef.update({
            groups: firebase.firestore.FieldValue.arrayUnion(ref.id)
        });
        input.value = '';
        await renderGroupsView();
        await initGroups();
    } catch(err) {
        alert('Error al crear grupo.');
        console.error(err);
    }
};

window.deleteGroup = async function(groupId) {
    if (!confirm('¿Eliminar este grupo? Los usuarios perderán la asignación.')) return;
    try {
        // Remove group from all users
        const usersSnap = await db.collection('users').get();
        const batch = db.batch();
        usersSnap.docs.forEach(d => {
            if (d.data().groups && d.data().groups.includes(groupId)) {
                batch.update(d.ref, {
                    groups: firebase.firestore.FieldValue.arrayRemove(groupId)
                });
            }
        });
        batch.delete(db.collection('groups').doc(groupId));
        await batch.commit();
        await renderGroupsView();
        await initGroups();
    } catch(err) {
        alert('Error al eliminar grupo.');
        console.error(err);
    }
};

window.renderGroupsView = async function() {
    const container = document.getElementById('groups-list');
    if (!container) return;
    container.innerHTML = '<p style="color:#888;">Cargando...</p>';

    try {
        const snap = await db.collection('groups').orderBy('createdAt').get();
        container.innerHTML = '';
        if (snap.empty) {
            container.innerHTML = '<p style="color:#888;">No hay grupos creados aún.</p>';
            return;
        }
        snap.docs.forEach(d => {
            const g = d.data();
            const card = document.createElement('div');
            card.className = 'group-card';
            card.innerHTML = `
                <span class="group-card-name">${g.name}</span>
                <div class="group-card-actions">
                    <span style="color:var(--text-muted);font-size:0.8rem;">ID: ${d.id}</span>
                    <button class="btn-small danger" onclick="deleteGroup('${d.id}')">Eliminar</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch(err) {
        container.innerHTML = '<p style="color:#ef4444;">Error al cargar grupos.</p>';
        console.error(err);
    }
};

window.addUserToGroup = async function(email, groupId) {
    try {
        const ref = db.collection('users').doc(emailId(email));
        await ref.update({ groups: firebase.firestore.FieldValue.arrayUnion(groupId) });
        await renderUsersView();
    } catch(err) {
        alert('Error al asignar grupo.');
        console.error(err);
    }
};

window.removeUserFromGroup = async function(email, groupId) {
    try {
        const ref = db.collection('users').doc(emailId(email));
        await ref.update({ groups: firebase.firestore.FieldValue.arrayRemove(groupId) });
        await renderUsersView();
    } catch(err) {
        alert('Error al quitar grupo.');
        console.error(err);
    }
};

// --- SESSION RESTORE (Firebase Auth persistence automática) ---
auth.onAuthStateChanged(async (firebaseUser) => {
    if (authReady) return;
    authReady = true;

    showLoading('Iniciando la plataforma...');
    try {
        if (firebaseUser) {
            const snap = await db.collection('users').doc(emailId(firebaseUser.email)).get();
            if (snap.exists) {
                await loginUser(snap.data());
                hideLoading();
                return;
            }
        }
    } catch(err) {
        console.error('Error en inicio:', err);
    }
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
    hideLoading();
});

// --- NAVIGATION ---
const navBtns = document.querySelectorAll('.nav-btn');
const views   = document.querySelectorAll('.view-section');

navBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        navBtns.forEach(b => b.classList.remove('active'));
        views.forEach(v => v.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
        if (btn.dataset.target === 'users' && currentUser?.role === 'admin') await renderUsersView();
        if (btn.dataset.target === 'groups' && currentUser?.role === 'admin') await renderGroupsView();
        if (btn.dataset.target === 'leaderboard') await updateLeaderboard();
    });
});

// --- MATCHES VIEW ---
window.renderMatchesView = async function() {
    if (!currentUser) return;
    const activePhase = document.getElementById('phase-select').value;
    const adminPhaseEl = document.getElementById('admin-phase-select');
    const adminPhase  = adminPhaseEl ? adminPhaseEl.value : null;

    const mContainer = document.getElementById('matches-container');
    const aContainer = document.getElementById('admin-matches-container');
    mContainer.innerHTML = '<p style="color:#888;text-align:center;padding:2rem;">Cargando partidos...</p>';
    if (aContainer) aContainer.innerHTML = '';

    try {
        const [matchSnap, predSnap] = await Promise.all([
            db.collection('matches').where('phase', '==', activePhase).get(),
            db.collection('predictions').doc(emailId(currentUser.email)).get()
        ]);

        const matches  = matchSnap.docs.map(d => d.data()).sort((a, b) => a.id - b.id);
        const myPreds  = predSnap.exists ? predSnap.data() : {};

        mContainer.innerHTML = '';
        if (matches.length === 0) {
            mContainer.innerHTML = '<p style="color:#888;text-align:center;padding:2rem;">No hay partidos en esta fase.</p>';
        }
        matches.forEach(match => mContainer.appendChild(createMatchCard(match, myPreds[match.id] || {}, false)));

        // Admin panel
        if (currentUser.role === 'admin' && aContainer && adminPhase) {
            const adminSnap = await db.collection('matches').where('phase', '==', adminPhase).get();
            const adminMatches = adminSnap.docs.map(d => d.data()).sort((a, b) => a.id - b.id);
            aContainer.innerHTML = '';
            adminMatches.forEach(match => aContainer.appendChild(createMatchCard(match, {}, true)));
        }
    } catch(err) {
        mContainer.innerHTML = '<p style="color:#ef4444;text-align:center;padding:2rem;">Error al cargar. Revisa tu conexión.</p>';
        console.error(err);
    }
};

function createMatchCard(match, myPred, isAdmin) {
    const card = document.createElement('div');

    const locked      = !isAdmin && isPredLocked(match);
    const statusLabel = isAdmin
        ? (match.status === 'finished' ? 'FINALIZADO' : match.time)
        : getLockLabel(match);
    const statusClass = match.status === 'finished' ? 'finished' : (locked ? 'locked' : match.status);

    const hScore = isAdmin
        ? (match.realHome  != null ? match.realHome  : '')
        : (myPred.h !== undefined  ? myPred.h        : '');
    const aScore = isAdmin
        ? (match.realAway != null ? match.realAway  : '')
        : (myPred.a !== undefined ? myPred.a        : '');

    const disabled   = locked ? 'disabled' : '';
    const inputClass = isAdmin ? 'admin-input' : 'pred-input';

    let actionButton;
    if (isAdmin) {
        actionButton = `<button class="btn-save" style="background:var(--accent-gold);color:black;" onclick="simulateResult(${match.id})">Guardar Resultado Oficial</button>`;
    } else if (locked) {
        const hasPred = myPred.h !== undefined;
        const icon = match.status === 'finished' ? '✅ Partido finalizado' : (hasPred ? '🔒 Predicción guardada' : '🔒 Predicciones cerradas');
        actionButton = `<button class="btn-save" disabled style="opacity:0.5;cursor:not-allowed;">${icon}</button>`;
    } else {
        actionButton = `<button class="btn-save" onclick="savePrediction(${match.id})">Guardar Predicción</button>`;
    }

    card.className = `match-card ${!isAdmin && locked ? 'match-card-locked' : ''}`;
    card.innerHTML = `
        <div class="match-header">
            <span>${match.group}</span>
            <span class="match-status ${statusClass}">${statusLabel}</span>
        </div>
        <div class="teams-container">
            <div class="team"><span class="flag">${match.homeFlag}</span><span class="team-name">${match.home}</span></div>
            <div class="score-inputs">
                <input type="number" min="0" class="score-input ${inputClass}" data-match="${match.id}" data-team="home" value="${hScore}" ${disabled}>
                <span class="vs">-</span>
                <input type="number" min="0" class="score-input ${inputClass}" data-match="${match.id}" data-team="away" value="${aScore}" ${disabled}>
            </div>
            <div class="team"><span class="flag">${match.awayFlag}</span><span class="team-name">${match.away}</span></div>
        </div>
        ${actionButton}
    `;
    return card;
}

// --- SAVE PREDICTION ---
window.savePrediction = async (matchId) => {
    const inputs = document.querySelectorAll(`.pred-input[data-match="${matchId}"]`);
    const h = parseInt(inputs[0].value);
    const a = parseInt(inputs[1].value);
    if (isNaN(h) || isNaN(a)) { alert('Ingresa valores numéricos válidos.'); return; }

    try {
        await db.collection('predictions').doc(emailId(currentUser.email)).set(
            { [matchId]: { h, a } },
            { merge: true }
        );
        alert('✅ Predicción guardada exitosamente.');
        await updateLeaderboard();
    } catch(err) {
        alert('Error al guardar. Revisa tu conexión.');
        console.error(err);
    }
};

// --- ADMIN: SAVE OFFICIAL RESULT ---
window.simulateResult = async (matchId) => {
    const inputs = document.querySelectorAll(`.admin-input[data-match="${matchId}"]`);
    const h = parseInt(inputs[0].value);
    const a = parseInt(inputs[1].value);
    if (isNaN(h) || isNaN(a)) { alert('Debes ingresar un resultado numérico para guardar.'); return; }

    showLoading('Guardando resultado oficial...');
    try {
        await db.collection('matches').doc(String(matchId)).update({
            realHome: h,
            realAway: a,
            status: 'finished'
        });
        alert('✅ Resultado oficial guardado. Puntos recalculados.');
        await renderMatchesView();
        await updateLeaderboard();
    } catch(err) {
        alert('Error al guardar. Revisa tu conexión.');
        console.error(err);
    }
    hideLoading();
};

// --- LEADERBOARD ---
function getOutcome(h, a) { return h > a ? 'H' : (h < a ? 'A' : 'D'); }

function calculatePointsForPrediction(predH, predA, realH, realA) {
    if (predH === realH && predA === realA) return { pts: 3, exact: 1 };
    if (getOutcome(predH, predA) === getOutcome(realH, realA)) return { pts: 1, exact: 0 };
    return { pts: 0, exact: 0 };
}

async function updateLeaderboard() {
    try {
        // Update header with current group name
        const groupName = currentGroupId && allGroups[currentGroupId]
            ? allGroups[currentGroupId].name : 'Global';
        const lbHeader = document.querySelector('#leaderboard .section-header h2');
        if (lbHeader) {
            lbHeader.textContent = currentGroupId && allGroups[currentGroupId]
                ? `🏆 ${groupName}` : '🏆 Tabla de Posiciones';
        }
        const lbSub = document.querySelector('#leaderboard .section-header p');
        if (lbSub) {
            lbSub.textContent = currentGroupId
                ? `Posiciones del grupo: ${groupName}`
                : 'Selecciona o crea un grupo para ver las posiciones.';
        }

        const [usersSnap, finishedSnap, predsSnap] = await Promise.all([
            db.collection('users').get(),
            db.collection('matches').where('status', '==', 'finished').get(),
            db.collection('predictions').get()
        ]);

        let users = usersSnap.docs.map(d => d.data());

        // Filter by selected group
        if (currentGroupId) {
            users = users.filter(u => u.groups && u.groups.includes(currentGroupId));
        }

        const finishedMatches = finishedSnap.docs.map(d => d.data());
        const allPreds       = {};
        predsSnap.docs.forEach(d => { allPreds[d.id] = d.data(); });

        const scores = users.map(u => {
            let pts = 0, exact = 0;
            const uPreds = allPreds[emailId(u.email)] || {};
            finishedMatches.forEach(m => {
                const pred = uPreds[m.id];
                if (pred) {
                    const res = calculatePointsForPrediction(pred.h, pred.a, m.realHome, m.realAway);
                    pts += res.pts; exact += res.exact;
                }
            });
            return { name: u.name, email: u.email, pts, exact };
        });

        scores.sort((a, b) => b.pts !== a.pts ? b.pts - a.pts : b.exact - a.exact);

        const tbody = document.getElementById('leaderboard-body');
        tbody.innerHTML = '';
        scores.forEach((s, i) => {
            const tr = document.createElement('tr');
            if (currentUser && s.email === currentUser.email) tr.style.background = 'rgba(16,185,129,0.1)';
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`;
            tr.innerHTML = `
                <td class="pos-rank">${medal}</td>
                <td>${s.name}${currentUser && s.email === currentUser.email ? ' <span style="color:var(--accent-green)">(Tú)</span>' : ''}</td>
                <td class="pts-cell">${s.pts}</td>
                <td>${s.exact}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch(err) {
        console.error('Error actualizando leaderboard:', err);
    }
}

// --- USERS MANAGEMENT ---
window.renderUsersView = async function() {
    const tbody = document.getElementById('users-body');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#888;">Cargando...</td></tr>';

    try {
        const [usersSnap, groupsSnap] = await Promise.all([
            db.collection('users').orderBy('createdAt').get(),
            db.collection('groups').get()
        ]);

        const groups = {};
        groupsSnap.docs.forEach(d => { groups[d.id] = d.data().name; });

        tbody.innerHTML = '';
        usersSnap.docs.forEach(doc => {
            const u = doc.data();
            const userGroups = u.groups || [];
            const statusBadge = u.isApproved
                ? '<span style="color:var(--accent-green);font-weight:bold;">✅ Aprobado</span>'
                : '<span style="color:var(--accent-red);font-weight:bold;">⏳ Pendiente</span>';
            const actionBtn = u.role === 'admin'
                ? '<span style="color:#888;">—</span>'
                : `<button class="btn-save" style="padding:0.4rem 0.8rem;margin:0;" onclick="toggleApproval('${u.email}')">
                     ${u.isApproved ? 'Revocar' : 'Aprobar'}
                   </button>`;

            // Groups badges + assignment UI
            let groupsHtml = '<div class="group-selector-wrap">';
            userGroups.forEach(gid => {
                if (groups[gid]) {
                    groupsHtml += `<span class="group-badge">${groups[gid]} <span style="cursor:pointer;color:var(--accent-red);" onclick="removeUserFromGroup('${u.email}','${gid}')">✕</span></span>`;
                }
            });
            if (Object.keys(groups).length > 0) {
                groupsHtml += `<select class="group-select" style="font-size:0.75rem;padding:0.15rem 0.3rem;" onchange="addUserToGroup('${u.email}', this.value); this.value=''">
                    <option value="">+ Grupo</option>`;
                Object.entries(groups).forEach(([gid, gname]) => {
                    if (!userGroups.includes(gid)) {
                        groupsHtml += `<option value="${gid}">${gname}</option>`;
                    }
                });
                groupsHtml += `</select>`;
            }
            groupsHtml += '</div>';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>${groupsHtml}</td>
                <td>${statusBadge}</td>
                <td>${actionBtn}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch(err) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#ef4444;">Error al cargar usuarios.</td></tr>';
        console.error(err);
    }
};

window.toggleApproval = async function(email) {
    try {
        const ref  = db.collection('users').doc(emailId(email));
        const snap = await ref.get();
        if (snap.exists) {
            await ref.update({ isApproved: !snap.data().isApproved });
            await renderUsersView();
        }
    } catch(err) {
        alert('Error al actualizar. Revisa tu conexión.');
        console.error(err);
    }
};


