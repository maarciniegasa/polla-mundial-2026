# Polla Mundialista 2026 - Estado del Proyecto

## Resumen General
Aplicación web para polla del Mundial FIFA 2026 construida con Firebase (Firestore + Auth) y desplegada en Vercel.

## Stack Tecnológico
- **Frontend**: HTML5, CSS3, JavaScript vanilla (ES6+)
- **Backend**: Firebase Firestore (base de datos) + Firebase Auth (autenticación)
- **Hosting**: Vercel (deploy automático desde GitHub)
- **Datos**: 104 partidos del Mundial 2026 (fase de grupos + eliminatorias)
- **Librerías externas**: jsPDF + autoTable (generación PDF reportes)

## Funcionalidades Implementadas

### Autenticación y Usuarios
- ✅ Registro/Login con email/contraseña (Firebase Auth)
- ✅ Roles: `admin` y `player`
- ✅ Aprobación manual de usuarios por admin
- ✅ Persistencia de sesión automática
- ✅ **Recuperación de contraseña** (`sendPasswordResetEmail`) con enlace "¿Olvidaste tu contraseña?" y email en español

### Gestión de Grupos (Solo Admin)
- ✅ Crear/eliminar grupos
- ✅ Asignar usuarios a grupos
- ✅ Selector de grupo en header (multi-grupo)

### Predicciones
- ✅ Ingreso de marcador por partido (local/visitante)
- ✅ Bloqueo automático **30 min antes** del inicio
- ✅ **Auto-actualización UI cada 30s** (timer) para estados de bloqueo sin recargar página
- ✅ **Validación servidor al guardar** (re-check `Date.now()` en `savePrediction`)
- ✅ Estados visuales: `⏱ Cierra en X min`, `🔒 CERRADO`, `🔴 EN JUEGO`, `✅ FINALIZADO`
- ✅ Filtro por fase/jornada
- ✅ **Ver predicciones de otros jugadores** (NUEVO)
  - Modal "Predicciones del día" en partidos bloqueados (30 min antes)
  - Modal "Predicciones de grupos cerrados" para clasificados
  - Filtro automático: solo jugadores de los mismos grupos del usuario
  - Resaltado de predicción propia en verde con "(Tú)"
  - Fecha en hora local Colombia (UTC-5), no UTC

### Predicción Clasificados (NUEVO)
- ✅ Pestaña "Predicción clasificados" para seleccionar 1.º y 2.º por grupo (12 grupos A-L)
- ✅ Equipos por grupo desde `GROUP_TEAMS` en data.js (extraídos del Excel oficial)
- ✅ Deadline independiente por grupo: **30 min antes** del 1er partido del grupo
- ✅ Advertencia **2 horas antes** con countdown visual (`⏰ Cierra en X min`)
- ✅ Estados: `⏱ Cierra en X min` → `⏰ Cierra en X min` (warning) → `🔒 CERRADO` → `Fase de grupos finalizada`
- ✅ Guardado por grupo individual en colección `groupPredictions`

### Panel Admin
- ✅ Ingreso de resultados oficiales (sin timer, siempre editable)
- ✅ Recalculo automático de puntos al guardar resultado
- ✅ Vista de todos los partidos por fase
- ✅ **Sección "Resultados Reales - Fase de Grupos"** para ingresar 1.º y 2.º real por grupo
- ✅ Tabla de predicciones de todos los jugadores con puntos calculados por grupo
- ✅ **Descarga PDF de predicciones** por fase y grupo (solo partidos con deadline cumplido)
  - Filtrado por grupo seleccionado en header (o global)
  - Columnas: Jugador, Fase, Grupo, Local, Visit., Pred.Loc, Pred.Vis
  - Incluye predicciones vacías para control
  - Incluye admins y players del grupo

### Sistema de Puntos
- ✅ **3 puntos**: resultado exacto marcador (ej. 1-1 vs 1-1)
- ✅ **1 punto**: acertar ganador/empate marcador (ej. 0-0 vs 1-1 → empate)
- ✅ **0 puntos**: fallar resultado marcador
- ✅ **5 puntos**: 1.º y 2.º clasificados exactos (orden correcto)
- ✅ **2 puntos**: mismos 2 equipos clasificados, orden invertido
- ✅ **1 punto**: solo 1 de los 2 equipos clasificados correcto (cualquier posición)
- ✅ **0 puntos**: ningún equipo clasificado correcto
- ✅ Desempate global: más resultados exactos (marcador 3pts + clasificados 5pts)

### Leaderboard
- ✅ Tabla global y por grupo
- ✅ Orden: puntos descendente → exactos descendente
- ✅ Resaltado del usuario actual
- ✅ **Puntos combinados**: marcador + clasificados

## Estructura de Datos (Firestore)

### Colecciones
| Colección | Documento ID | Campos Principales |
|-----------|--------------|-------------------|
| `matches` | `1`...`104` | `id, phase, group, home, away, time, status, realHome, realAway, isTBD` |
| `predictions` | `emailId(user)` | `{ [matchId]: { h, a } }` |
| `groupPredictions` | `emailId(user)` | `{ [groupId]: { first, second } }` |
| `groupResults` | `results` (single doc) | `{ [groupId]: { first, second } }` |
| `users` | `emailId(user)` | `email, name, role, groups[], isApproved, createdAt` |
| `groups` | `auto-id` | `name, createdAt` |
| `config` | `app` | `matchesSeeded, seededAt` |

## Archivos del Proyecto
```
mundial/
├── index.html          # Estructura UI + navegación
├── styles.css          # Estilos (tema oscuro, responsive)
├── app.js              # Lógica completa (auth, matches, leaderboard, admin)
├── data.js             # 104 partidos hardcoded (seed inicial)
├── firebase-config.js  # Config Firebase (no versionar secrets)
├── vercel.json         # Config deploy Vercel
└── PROYECTO.md         # Este archivo
```

## Reglas de Negocio Clave

### Bloqueo de Predicciones (Marcador)
```javascript
// En app.js:50-76
const cutoff = new Date(kickoff.getTime() - 30 * 60 * 1000); // -30 min
return Date.now() >= cutoff.getTime();
```
- Hora del partido en `data.js`: hora local Colombia (UTC-5)
- Conversión a UTC: `hour + 5` en `parseMatchTime()`
- **Regex fix**: `([^\s]+)` en vez de `(\w+)` para soportar días acentuados (Mié, Sáb)

### Auto-actualización de Bloqueo (Timer UI)
```javascript
// En app.js: startLockTimer() / updateLockUI()
setInterval(updateLockUI, 30000); // cada 30s
```
- Actualiza: status labels, inputs disabled/enabled, botones, clases CSS
- Solo en vistas usuario (`#matches-container`, `#group-predictions-container`)
- **No afecta panel admin** (`#admin-matches-container`)
- Validación extra al guardar: `savePrediction` hace fetch + `isPredLocked()` en servidor

### Bloqueo de Predicciones (Clasificados)
```javascript
// En app.js: getGroupLockInfo()
const kickoff = new Date(GROUP_FIRST_MATCH[groupId]);     // UTC del 1er partido del grupo
const cutoff = new Date(kickoff.getTime() - 30 * 60 * 1000); // -30 min
const warning = new Date(kickoff.getTime() - 2 * 60 * 60 * 1000); // -2h
```
- `GROUP_FIRST_MATCH` en `data.js`: timestamps UTC del 1er partido por grupo (extraídos del Excel)
- Deadline **independiente por grupo** (cada grupo cierra según su primer partido)
- Warning **2h antes** del deadline por grupo
- Comparación en UTC (`Date.now()`) → funciona en cualquier zona horaria

### Cálculo de Puntos (Marcador)
```javascript
// En app.js: calculatePointsForPrediction()
getOutcome(h, a) → 'H' | 'A' | 'D'
```
- **3 pts**: marcador exacto
- **1 pt**: ganador/empate correcto
- **0 pts**: fallado

### Cálculo de Puntos (Clasificados)
```javascript
// En app.js: calculateGroupPredictionPoints()
```
| Acierto | Puntos | Exacto |
|---------|--------|--------|
| 1.º y 2.º exactos (orden) | 5 | ✅ |
| Mismos 2 equipos, orden invertido | 2 | ❌ |
| Solo 1 equipo correcto (cualquier posición) | 1 | ❌ |
| Ninguno | 0 | ❌ |

- Desempate global: suma de `exact` (marcador 3pts + clasificados 5pts)

### Ver Predicciones de Otros Jugadores (NUEVO)
```javascript
// En app.js: openMatchPredictionsModal() / openGroupPredictionsModal()
```
- **Disponible solo tras deadline** (partidos: 30 min antes; grupos: deadline cumplido)
- **Botones en UI**: "👁 Ver predicciones del día" / "👁 Ver predicciones de grupos cerrados"
- **Filtrado por grupos**: `users` query con `array-contains-any` (grupos del usuario actual)
- **Fetch client-side**: `predictions.get()` + `groupPredictions.get()` para evitar límite `in` (max 10)
- **Fecha local Colombia**: `getColombiaDateString()` resta 5h a UTC para `dateKey` correcto
- **Modal responsive**: tabla con Jugador | Predicción (marcador) o 1.º/2.º (clasificados)
- **Resaltado usuario actual**: fila verde con "(Tú)"

## Despliegue
```bash
git add -A
git commit -m "mensaje"
git push origin main  # Vercel deploya automático
```

## Variables de Entorno (Vercel)
Configurar en dashboard de Vercel:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

## Pendientes / Mejoras Futuras
- [ ] Notificaciones push/email antes de cierre
- [ ] Historial de predicciones por usuario
- [ ] Exportar leaderboard a CSV/PDF (parcial: PDF predicciones admin implementado)
- [ ] Tests automatizados
- [ ] PWA (offline support)
- [ ] Notificaciones automáticas 2h antes por grupo (clasificados)
- [ ] Vista de "clasificados reales" pública tras finalizar fase de grupos

## Historial de Cambios Recientes (Jun 2026)
| Fecha | Commit | Descripción |
|-------|--------|-------------|
| 21-jun | `848ba39` | Fix: evitar límite Firestore 'in' query (fetch all predictions client-side) en modales |
| 21-jun | `1357ed5` | Fix: usar zona horaria Colombia (UTC-5) para dateKey en modales predicciones |
| 21-jun | `a9dd5fa` | Feat: ver predicciones de otros jugadores tras deadline (modales + botones) |
| 18-jun | `0fe0695` | Feat: PDF download predicciones admin (filtrado grupo, solo partidos bloqueados) |
| 18-jun | `43947b8` | Fix: evitar límite Firestore 'in' query (fetch all predictions client-side) |
| 18-jun | `db0bbdd` | Feat: incluir predicciones de admins en PDF download |
| 17-jun | `87d9b64` | Fix: timer solo en vista usuario, no panel admin |
| 17-jun | `6acfcf3` | Feat: lock timer 30s + validación servidor al guardar |
| 17-jun | `520a2d3` | Feat: recuperación contraseña (Firebase sendPasswordResetEmail) |
| 17-jun | `e292d80` | Fix: parseMatchTime regex para días acentuados (Mié, Sáb) |