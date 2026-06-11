const XLSX = require('xlsx');
const wb = XLSX.readFile('Mundial_FIFA_2026_Colombia.xlsx');
const ws = wb.Sheets['Mundial FIFA 2026'];
const data = XLSX.utils.sheet_to_json(ws);

const groups = {};
data.forEach(row => {
  const g = row['Grupo'];
  if (!groups[g]) groups[g] = { teams: new Set(), firstMatch: null };
  groups[g].teams.add(row['Equipo Local']);
  groups[g].teams.add(row['Equipo Visitante']);
  const fecha = row['Fecha'];
  const hora = row['Hora (COT)'];
  if (fecha && hora) {
    const dayMonth = fecha.split(' ')[1]; // "11-Jun"
    const [day, monthStr] = dayMonth.split('-');
    const monthMap = { 'Jun': 5, 'Jul': 6 }; // 0-indexed
    const month = monthMap[monthStr];
    const dt = new Date(2026, month, parseInt(day));
    const [time, ampm] = hora.split(' ');
    let [h, m] = time.split(':').map(Number);
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    dt.setHours(h, m, 0, 0);
    if (!groups[g].firstMatch || dt < groups[g].firstMatch) groups[g].firstMatch = dt;
  }
});

Object.entries(groups).forEach(([g, v]) => {
  console.log('Grupo', g, ':', Array.from(v.teams).sort().join(', '));
  console.log('  Primer partido:', v.firstMatch);
});

// Also output as JS object for data.js
console.log('\n--- GROUP_TEAMS ---');
const groupTeams = {};
Object.entries(groups).forEach(([g, v]) => {
  groupTeams[g] = Array.from(v.teams).sort();
});
console.log('const GROUP_TEAMS =', JSON.stringify(groupTeams, null, 2));

console.log('\n--- GROUP_FIRST_MATCH ---');
const groupFirstMatch = {};
Object.entries(groups).forEach(([g, v]) => {
  groupFirstMatch[g] = v.firstMatch.toISOString();
});
console.log('const GROUP_FIRST_MATCH =', JSON.stringify(groupFirstMatch, null, 2));