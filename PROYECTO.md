# Polla Mundialista 2026 - Estado del Proyecto

## Resumen General
Aplicación web para polla del Mundial FIFA 2026 construida con Firebase (Firestore + Auth) y desplegada en Vercel.

## Stack Tecnológico
- **Frontend**: HTML5, CSS3, JavaScript vanilla (ES6+)
- **Backend**: Firebase Firestore (base de datos) + Firebase Auth (autenticación)
- **Hosting**: Vercel (deploy automático desde GitHub)
- **Datos**: 104 partidos del Mundial 2026 (fase de grupos + eliminatorias)

## Funcionalidades Implementadas

### Autenticación y Usuarios
- ✅ Registro/Login con email/contraseña (Firebase Auth)
- ✅ Roles: `admin` y `player`
- ✅ Aprobación manual de usuarios por admin
- ✅ Persistencia de sesión automática

### Gestión de Grupos (Solo Admin)
- ✅ Crear/eliminar grupos
- ✅ Asignar usuarios a grupos
- ✅ Selector de grupo en header (multi-grupo)

### Predicciones
- ✅ Ingreso de marcador por partido (local/visitante)
- ✅ Bloqueo automático **30 min antes** del inicio
- ✅ Estados visuales: `⏱ Cierra en X min`, `🔒 CERRADO`, `🔴 EN JUEGO`, `✅ FINALIZADO`
- ✅ Filtro por fase/jornada

### Panel Admin
- ✅ Ingreso de resultados oficiales
- ✅ Recalculo automático de puntos al guardar resultado
- ✅ Vista de todos los partidos por fase

### Sistema de Puntos
- ✅ **3 puntos**: resultado exacto (ej. 1-1 vs 1-1)
- ✅ **1 punto**: acertar ganador/empate (ej. 0-0 vs 1-1 → empate)
- ✅ **0 puntos**: fallar resultado
- ✅ Desempate: más resultados exactos

### Leaderboard
- ✅ Tabla global y por grupo
- ✅ Orden: puntos descendente → exactos descendente
- ✅ Resaltado del usuario actual

## Estructura de Datos (Firestore)

### Colecciones
| Colección | Documento ID | Campos Principales |
|-----------|--------------|-------------------|
| `matches` | `1`...`104` | `id, phase, group, home, away, time, status, realHome, realAway, isTBD` |
| `predictions` | `emailId(user)` | `{ [matchId]: { h, a } }` |
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

### Bloqueo de Predicciones
```javascript
// En app.js:50-76
const cutoff = new Date(kickoff.getTime() - 30 * 60 * 1000); // -30 min
return Date.now() >= cutoff.getTime();
```
- Hora del partido en `data.js`: hora local Colombia (UTC-5)
- Conversión a UTC: `hour + 5` en `parseMatchTime()`

### Cálculo de Puntos
```javascript
// En app.js:549-555
getOutcome(h, a) → 'H' | 'A' | 'D'
calculatePointsForPrediction(predH, predA, realH, realA)
```
- Empate predicho (0-0) vs real (1-1) = **1 punto** ✓

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
- [ ] Exportar leaderboard a CSV/PDF
- [ ] Tests automatizados
- [ ] PWA (offline support)