// data.js - Datos extraidos del Excel Mundial_FIFA_2026_Colombia.xlsx

const GROUP_TEAMS = {
  "A": [
    "Corea del Sur",
    "México",
    "República Checa",
    "Sudáfrica"
  ],
  "B": [
    "Bosnia y Herzegovina",
    "Canadá",
    "Catar",
    "Suiza"
  ],
  "C": [
    "Brasil",
    "Escocia",
    "Haití",
    "Marruecos"
  ],
  "D": [
    "Australia",
    "EE.UU.",
    "Paraguay",
    "Turquía"
  ],
  "E": [
    "Alemania",
    "Costa de Marfil",
    "Curazao",
    "Ecuador"
  ],
  "F": [
    "Japón",
    "Países Bajos",
    "Suecia",
    "Túnez"
  ],
  "G": [
    "Bélgica",
    "Egipto",
    "Irán",
    "Nueva Zelanda"
  ],
  "H": [
    "Arabia Saudita",
    "Cabo Verde",
    "España",
    "Uruguay"
  ],
  "I": [
    "Francia",
    "Irak",
    "Noruega",
    "Senegal"
  ],
  "J": [
    "Argelia",
    "Argentina",
    "Austria",
    "Jordania"
  ],
  "K": [
    "Colombia",
    "Portugal",
    "República del Congo",
    "Uzbekistán"
  ],
  "L": [
    "Croacia",
    "Ghana",
    "Inglaterra",
    "Panamá"
  ]
};

const GROUP_FIRST_MATCH = {
  "A": "2026-06-11T19:00:00.000Z",
  "B": "2026-06-12T19:00:00.000Z",
  "C": "2026-06-13T22:00:00.000Z",
  "D": "2026-06-13T01:00:00.000Z",
  "E": "2026-06-14T17:00:00.000Z",
  "F": "2026-06-14T20:00:00.000Z",
  "G": "2026-06-15T19:00:00.000Z",
  "H": "2026-06-15T16:00:00.000Z",
  "I": "2026-06-16T19:00:00.000Z",
  "J": "2026-06-17T01:00:00.000Z",
  "K": "2026-06-17T17:00:00.000Z",
  "L": "2026-06-17T20:00:00.000Z"
};

const allMatchesData = [
    {
        id: 1, phase: 'Jornada 1', group: 'A',
        home: 'México', homeFlag: '🇲🇽',
        away: 'Sudáfrica', awayFlag: '🇿🇦',
        time: 'Jue 11-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 2, phase: 'Jornada 1', group: 'A',
        home: 'Corea del Sur', homeFlag: '🇰🇷',
        away: 'República Checa', awayFlag: '🇨🇿',
        time: 'Jue 11-Jun, 9:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 3, phase: 'Jornada 1', group: 'B',
        home: 'Canadá', homeFlag: '🇨🇦',
        away: 'Bosnia y Herzegovina', awayFlag: '🇧🇦',
        time: 'Vie 12-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 4, phase: 'Jornada 1', group: 'D',
        home: 'EE.UU.', homeFlag: '🇺🇸',
        away: 'Paraguay', awayFlag: '🇵🇾',
        time: 'Vie 12-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 5, phase: 'Jornada 1', group: 'B',
        home: 'Catar', homeFlag: '🇶🇦',
        away: 'Suiza', awayFlag: '🇨🇭',
        time: 'Sáb 13-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 6, phase: 'Jornada 1', group: 'C',
        home: 'Brasil', homeFlag: '🇧🇷',
        away: 'Marruecos', awayFlag: '🇲🇦',
        time: 'Sáb 13-Jun, 5:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 7, phase: 'Jornada 1', group: 'C',
        home: 'Haití', homeFlag: '🇭🇹',
        away: 'Escocia', awayFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        time: 'Sáb 13-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 8, phase: 'Jornada 1', group: 'D',
        home: 'Australia', homeFlag: '🇦🇺',
        away: 'Turquía', awayFlag: '🇹🇷',
        time: 'Sáb 13-Jun, 11:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 9, phase: 'Jornada 1', group: 'E',
        home: 'Alemania', homeFlag: '🇩🇪',
        away: 'Curazao', awayFlag: '🇨🇼',
        time: 'Dom 14-Jun, 12:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 10, phase: 'Jornada 1', group: 'F',
        home: 'Países Bajos', homeFlag: '🇳🇱',
        away: 'Japón', awayFlag: '🇯🇵',
        time: 'Dom 14-Jun, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 11, phase: 'Jornada 1', group: 'E',
        home: 'Costa de Marfil', homeFlag: '🇨🇮',
        away: 'Ecuador', awayFlag: '🇪🇨',
        time: 'Dom 14-Jun, 6:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 12, phase: 'Jornada 1', group: 'F',
        home: 'Suecia', homeFlag: '🇸🇪',
        away: 'Túnez', awayFlag: '🇹🇳',
        time: 'Dom 14-Jun, 9:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 13, phase: 'Jornada 1', group: 'H',
        home: 'España', homeFlag: '🇪🇸',
        away: 'Cabo Verde', awayFlag: '🇨🇻',
        time: 'Lun 15-Jun, 11:00 AM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 14, phase: 'Jornada 1', group: 'G',
        home: 'Bélgica', homeFlag: '🇧🇪',
        away: 'Egipto', awayFlag: '🇪🇬',
        time: 'Lun 15-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 15, phase: 'Jornada 1', group: 'H',
        home: 'Arabia Saudita', homeFlag: '🇸🇦',
        away: 'Uruguay', awayFlag: '🇺🇾',
        time: 'Lun 15-Jun, 5:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 16, phase: 'Jornada 1', group: 'G',
        home: 'Irán', homeFlag: '🇮🇷',
        away: 'Nueva Zelanda', awayFlag: '🇳🇿',
        time: 'Lun 15-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 17, phase: 'Jornada 1', group: 'I',
        home: 'Francia', homeFlag: '🇫🇷',
        away: 'Senegal', awayFlag: '🇸🇳',
        time: 'Mar 16-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 18, phase: 'Jornada 1', group: 'I',
        home: 'Iraq', homeFlag: '🇮🇶',
        away: 'Noruega', awayFlag: '🇳🇴',
        time: 'Mar 16-Jun, 5:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 19, phase: 'Jornada 1', group: 'J',
        home: 'Argentina', homeFlag: '🇦🇷',
        away: 'Argelia', awayFlag: '🇩🇿',
        time: 'Mar 16-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 20, phase: 'Jornada 1', group: 'J',
        home: 'Austria', homeFlag: '🇦🇹',
        away: 'Jordania', awayFlag: '🇯🇴',
        time: 'Mar 16-Jun, 11:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 21, phase: 'Jornada 1', group: 'K',
        home: 'Portugal', homeFlag: '🇵🇹',
        away: 'República del Congo', awayFlag: '🇨🇩',
        time: 'Mié 17-Jun, 12:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 22, phase: 'Jornada 1', group: 'L',
        home: 'Inglaterra', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        away: 'Croacia', awayFlag: '🇭🇷',
        time: 'Mié 17-Jun, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 23, phase: 'Jornada 1', group: 'L',
        home: 'Ghana', homeFlag: '🇬🇭',
        away: 'Panamá', awayFlag: '🇵🇦',
        time: 'Mié 17-Jun, 6:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 24, phase: 'Jornada 1', group: 'K',
        home: 'Uzbekistán', homeFlag: '🇺🇿',
        away: 'Colombia', awayFlag: '🇨🇴',
        time: 'Mié 17-Jun, 9:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 25, phase: 'Jornada 2', group: 'A',
        home: 'República Checa', homeFlag: '🇨🇿',
        away: 'Sudáfrica', awayFlag: '🇿🇦',
        time: 'Jue 18-Jun, 11:00 AM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 26, phase: 'Jornada 2', group: 'B',
        home: 'Suiza', homeFlag: '🇨🇭',
        away: 'Bosnia y Herzegovina', awayFlag: '🇧🇦',
        time: 'Jue 18-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 27, phase: 'Jornada 2', group: 'B',
        home: 'Canadá', homeFlag: '🇨🇦',
        away: 'Catar', awayFlag: '🇶🇦',
        time: 'Jue 18-Jun, 5:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 28, phase: 'Jornada 2', group: 'A',
        home: 'México', homeFlag: '🇲🇽',
        away: 'Corea del Sur', awayFlag: '🇰🇷',
        time: 'Jue 18-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 29, phase: 'Jornada 2', group: 'D',
        home: 'EE.UU.', homeFlag: '🇺🇸',
        away: 'Australia', awayFlag: '🇦🇺',
        time: 'Vie 19-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 30, phase: 'Jornada 2', group: 'C',
        home: 'Escocia', homeFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        away: 'Marruecos', awayFlag: '🇲🇦',
        time: 'Vie 19-Jun, 5:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 31, phase: 'Jornada 2', group: 'C',
        home: 'Brasil', homeFlag: '🇧🇷',
        away: 'Haití', awayFlag: '🇭🇹',
        time: 'Vie 19-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 32, phase: 'Jornada 2', group: 'D',
        home: 'Turquía', homeFlag: '🇹🇷',
        away: 'Paraguay', awayFlag: '🇵🇾',
        time: 'Vie 19-Jun, 11:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 33, phase: 'Jornada 2', group: 'F',
        home: 'Países Bajos', homeFlag: '🇳🇱',
        away: 'Suecia', awayFlag: '🇸🇪',
        time: 'Sáb 20-Jun, 12:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 34, phase: 'Jornada 2', group: 'E',
        home: 'Alemania', homeFlag: '🇩🇪',
        away: 'Costa de Marfil', awayFlag: '🇨🇮',
        time: 'Sáb 20-Jun, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 35, phase: 'Jornada 2', group: 'E',
        home: 'Ecuador', homeFlag: '🇪🇨',
        away: 'Curazao', awayFlag: '🇨🇼',
        time: 'Sáb 20-Jun, 7:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 36, phase: 'Jornada 2', group: 'F',
        home: 'Túnez', homeFlag: '🇹🇳',
        away: 'Japón', awayFlag: '🇯🇵',
        time: 'Dom 21-Jun, 11:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 37, phase: 'Jornada 2', group: 'H',
        home: 'España', homeFlag: '🇪🇸',
        away: 'Arabia Saudita', awayFlag: '🇸🇦',
        time: 'Dom 21-Jun, 11:00 AM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 38, phase: 'Jornada 2', group: 'G',
        home: 'Bélgica', homeFlag: '🇧🇪',
        away: 'Irán', awayFlag: '🇮🇷',
        time: 'Dom 21-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 39, phase: 'Jornada 2', group: 'H',
        home: 'Uruguay', homeFlag: '🇺🇾',
        away: 'Cabo Verde', awayFlag: '🇨🇻',
        time: 'Dom 21-Jun, 5:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 40, phase: 'Jornada 2', group: 'G',
        home: 'Nueva Zelanda', homeFlag: '🇳🇿',
        away: 'Egipto', awayFlag: '🇪🇬',
        time: 'Dom 21-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 41, phase: 'Jornada 2', group: 'J',
        home: 'Argentina', homeFlag: '🇦🇷',
        away: 'Austria', awayFlag: '🇦🇹',
        time: 'Lun 22-Jun, 12:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 42, phase: 'Jornada 2', group: 'I',
        home: 'Francia', homeFlag: '🇫🇷',
        away: 'Iraq', awayFlag: '🇮🇶',
        time: 'Lun 22-Jun, 4:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 43, phase: 'Jornada 2', group: 'I',
        home: 'Noruega', homeFlag: '🇳🇴',
        away: 'Senegal', awayFlag: '🇸🇳',
        time: 'Lun 22-Jun, 7:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 44, phase: 'Jornada 2', group: 'J',
        home: 'Jordania', homeFlag: '🇯🇴',
        away: 'Argelia', awayFlag: '🇩🇿',
        time: 'Lun 22-Jun, 11:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 45, phase: 'Jornada 2', group: 'K',
        home: 'Portugal', homeFlag: '🇵🇹',
        away: 'Uzbekistán', awayFlag: '🇺🇿',
        time: 'Mar 23-Jun, 12:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 46, phase: 'Jornada 2', group: 'L',
        home: 'Inglaterra', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        away: 'Ghana', awayFlag: '🇬🇭',
        time: 'Mar 23-Jun, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 47, phase: 'Jornada 2', group: 'L',
        home: 'Panamá', homeFlag: '🇵🇦',
        away: 'Croacia', awayFlag: '🇭🇷',
        time: 'Mar 23-Jun, 6:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 48, phase: 'Jornada 2', group: 'K',
        home: 'Colombia', homeFlag: '🇨🇴',
        away: 'República del Congo', awayFlag: '🇨🇩',
        time: 'Mar 23-Jun, 9:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 49, phase: 'Jornada 3', group: 'B',
        home: 'Suiza', homeFlag: '🇨🇭',
        away: 'Canadá', awayFlag: '🇨🇦',
        time: 'Mié 24-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 50, phase: 'Jornada 3', group: 'B',
        home: 'Bosnia y Herzegovina', homeFlag: '🇧🇦',
        away: 'Catar', awayFlag: '🇶🇦',
        time: 'Mié 24-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 51, phase: 'Jornada 3', group: 'C',
        home: 'Marruecos', homeFlag: '🇲🇦',
        away: 'Haití', awayFlag: '🇭🇹',
        time: 'Mié 24-Jun, 5:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 52, phase: 'Jornada 3', group: 'C',
        home: 'Escocia', homeFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        away: 'Brasil', awayFlag: '🇧🇷',
        time: 'Mié 24-Jun, 5:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 53, phase: 'Jornada 3', group: 'A',
        home: 'Sudáfrica', homeFlag: '🇿🇦',
        away: 'Corea del Sur', awayFlag: '🇰🇷',
        time: 'Mié 24-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 54, phase: 'Jornada 3', group: 'A',
        home: 'República Checa', homeFlag: '🇨🇿',
        away: 'México', awayFlag: '🇲🇽',
        time: 'Mié 24-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 55, phase: 'Jornada 3', group: 'E',
        home: 'Ecuador', homeFlag: '🇪🇨',
        away: 'Alemania', awayFlag: '🇩🇪',
        time: 'Jue 25-Jun, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 56, phase: 'Jornada 3', group: 'E',
        home: 'Curazao', homeFlag: '🇨🇼',
        away: 'Costa de Marfil', awayFlag: '🇨🇮',
        time: 'Jue 25-Jun, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 57, phase: 'Jornada 3', group: 'F',
        home: 'Túnez', homeFlag: '🇹🇳',
        away: 'Países Bajos', awayFlag: '🇳🇱',
        time: 'Jue 25-Jun, 6:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 58, phase: 'Jornada 3', group: 'F',
        home: 'Japón', homeFlag: '🇯🇵',
        away: 'Suecia', awayFlag: '🇸🇪',
        time: 'Jue 25-Jun, 6:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 59, phase: 'Jornada 3', group: 'D',
        home: 'Turquía', homeFlag: '🇹🇷',
        away: 'EE.UU.', awayFlag: '🇺🇸',
        time: 'Jue 25-Jun, 9:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 60, phase: 'Jornada 3', group: 'D',
        home: 'Paraguay', homeFlag: '🇵🇾',
        away: 'Australia', awayFlag: '🇦🇺',
        time: 'Jue 25-Jun, 9:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 61, phase: 'Jornada 3', group: 'I',
        home: 'Noruega', homeFlag: '🇳🇴',
        away: 'Francia', awayFlag: '🇫🇷',
        time: 'Vie 26-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 62, phase: 'Jornada 3', group: 'I',
        home: 'Senegal', homeFlag: '🇸🇳',
        away: 'Iraq', awayFlag: '🇮🇶',
        time: 'Vie 26-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 63, phase: 'Jornada 3', group: 'H',
        home: 'Uruguay', homeFlag: '🇺🇾',
        away: 'España', awayFlag: '🇪🇸',
        time: 'Vie 26-Jun, 7:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 64, phase: 'Jornada 3', group: 'H',
        home: 'Cabo Verde', homeFlag: '🇨🇻',
        away: 'Arabia Saudita', awayFlag: '🇸🇦',
        time: 'Vie 26-Jun, 7:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 65, phase: 'Jornada 3', group: 'G',
        home: 'Nueva Zelanda', homeFlag: '🇳🇿',
        away: 'Bélgica', awayFlag: '🇧🇪',
        time: 'Vie 26-Jun, 10:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 66, phase: 'Jornada 3', group: 'G',
        home: 'Egipto', homeFlag: '🇪🇬',
        away: 'Irán', awayFlag: '🇮🇷',
        time: 'Vie 26-Jun, 10:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 67, phase: 'Jornada 3', group: 'L',
        home: 'Panamá', homeFlag: '🇵🇦',
        away: 'Inglaterra', awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        time: 'Sáb 27-Jun, 4:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 68, phase: 'Jornada 3', group: 'L',
        home: 'Croacia', homeFlag: '🇭🇷',
        away: 'Ghana', awayFlag: '🇬🇭',
        time: 'Sáb 27-Jun, 4:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 69, phase: 'Jornada 3', group: 'K',
        home: 'Colombia', homeFlag: '🇨🇴',
        away: 'Portugal', awayFlag: '🇵🇹',
        time: 'Sáb 27-Jun, 6:30 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 70, phase: 'Jornada 3', group: 'K',
        home: 'República del Congo', homeFlag: '🇨🇩',
        away: 'Uzbekistán', awayFlag: '🇺🇿',
        time: 'Sáb 27-Jun, 6:30 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 71, phase: 'Jornada 3', group: 'J',
        home: 'Argelia', homeFlag: '🇩🇿',
        away: 'Austria', awayFlag: '🇦🇹',
        time: 'Sáb 27-Jun, 9:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 72, phase: 'Jornada 3', group: 'J',
        home: 'Jordania', homeFlag: '🇯🇴',
        away: 'Argentina', awayFlag: '🇦🇷',
        time: 'Sáb 27-Jun, 9:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: false
    },
    {
        id: 73, phase: 'Ronda de 32', group: 'nan',
        home: '2.º Grupo A', homeFlag: '🏳️',
        away: '2.º Grupo B', awayFlag: '🏳️',
        time: 'Dom 28-Jun, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 76, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo C', homeFlag: '🏳️',
        away: '2.º Grupo F', awayFlag: '🏳️',
        time: 'Lun 29-Jun, 12:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 74, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo E', homeFlag: '🏳️',
        away: 'Mejor 3.º (A/B/C/D/F)', awayFlag: '🏳️',
        time: 'Lun 29-Jun, 3:30 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 75, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo F', homeFlag: '🏳️',
        away: '2.º Grupo C', awayFlag: '🏳️',
        time: 'Lun 29-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 78, phase: 'Ronda de 32', group: 'nan',
        home: '2.º Grupo E', homeFlag: '🏳️',
        away: '2.º Grupo I', awayFlag: '🏳️',
        time: 'Mar 30-Jun, 12:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 77, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo I', homeFlag: '🏳️',
        away: 'Mejor 3.º (C/D/F/G/H)', awayFlag: '🏳️',
        time: 'Mar 30-Jun, 4:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 79, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo A', homeFlag: '🏳️',
        away: 'Mejor 3.º (C/E/F/H/I)', awayFlag: '🏳️',
        time: 'Mar 30-Jun, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 80, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo L', homeFlag: '🏳️',
        away: 'Mejor 3.º (E/H/I/J/K)', awayFlag: '🏳️',
        time: 'Mié 1-Jul, 11:00 AM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 82, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo G', homeFlag: '🏳️',
        away: 'Mejor 3.º (A/E/H/I/J)', awayFlag: '🏳️',
        time: 'Mié 1-Jul, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 81, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo D', homeFlag: '🏳️',
        away: 'Mejor 3.º (B/E/F/I/J)', awayFlag: '🏳️',
        time: 'Mié 1-Jul, 7:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 84, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo H', homeFlag: '🏳️',
        away: '2.º Grupo J', awayFlag: '🏳️',
        time: 'Jue 2-Jul, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 83, phase: 'Ronda de 32', group: 'nan',
        home: '2.º Grupo K', homeFlag: '🏳️',
        away: '2.º Grupo L', awayFlag: '🏳️',
        time: 'Jue 2-Jul, 6:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 85, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo B', homeFlag: '🏳️',
        away: 'Mejor 3.º (E/F/G/I/J)', awayFlag: '🏳️',
        time: 'Jue 2-Jul, 10:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 88, phase: 'Ronda de 32', group: 'nan',
        home: '2.º Grupo D', homeFlag: '🏳️',
        away: '2.º Grupo G', awayFlag: '🏳️',
        time: 'Vie 3-Jul, 1:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 86, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo J', homeFlag: '🏳️',
        away: '2.º Grupo H', awayFlag: '🏳️',
        time: 'Vie 3-Jul, 5:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 87, phase: 'Ronda de 32', group: 'nan',
        home: '1.º Grupo K', homeFlag: '🏳️',
        away: 'Mejor 3.º (D/E/I/J/L)', awayFlag: '🏳️',
        time: 'Vie 3-Jul, 8:30 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 89, phase: 'Octavos de Final', group: 'nan',
        home: 'Gan. P74', homeFlag: '🏳️',
        away: 'Gan. P77', awayFlag: '🏳️',
        time: 'Sáb 4-Jul, 4:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 90, phase: 'Octavos de Final', group: 'nan',
        home: 'Gan. P73', homeFlag: '🏳️',
        away: 'Gan. P75', awayFlag: '🏳️',
        time: 'Sáb 4-Jul, 12:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 91, phase: 'Octavos de Final', group: 'nan',
        home: 'Gan. P76', homeFlag: '🏳️',
        away: 'Gan. P78', awayFlag: '🏳️',
        time: 'Dom 5-Jul, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 92, phase: 'Octavos de Final', group: 'nan',
        home: 'Gan. P79', homeFlag: '🏳️',
        away: 'Gan. P80', awayFlag: '🏳️',
        time: 'Dom 5-Jul, 7:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 93, phase: 'Octavos de Final', group: 'nan',
        home: 'Gan. P83', homeFlag: '🏳️',
        away: 'Gan. P84', awayFlag: '🏳️',
        time: 'Lun 6-Jul, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 94, phase: 'Octavos de Final', group: 'nan',
        home: 'Gan. P81', homeFlag: '🏳️',
        away: 'Gan. P82', awayFlag: '🏳️',
        time: 'Lun 6-Jul, 7:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 95, phase: 'Octavos de Final', group: 'nan',
        home: 'Gan. P86', homeFlag: '🏳️',
        away: 'Gan. P88', awayFlag: '🏳️',
        time: 'Mar 7-Jul, 11:00 AM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 96, phase: 'Octavos de Final', group: 'nan',
        home: 'Gan. P85', homeFlag: '🏳️',
        away: 'Gan. P87', awayFlag: '🏳️',
        time: 'Mar 7-Jul, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 97, phase: 'Cuartos de Final', group: 'nan',
        home: 'Gan. P89', homeFlag: '🏳️',
        away: 'Gan. P90', awayFlag: '🏳️',
        time: 'Jue 9-Jul, 3:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 98, phase: 'Cuartos de Final', group: 'nan',
        home: 'Gan. P93', homeFlag: '🏳️',
        away: 'Gan. P94', awayFlag: '🏳️',
        time: 'Vie 10-Jul, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 99, phase: 'Cuartos de Final', group: 'nan',
        home: 'Gan. P91', homeFlag: '🏳️',
        away: 'Gan. P92', awayFlag: '🏳️',
        time: 'Sáb 11-Jul, 4:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 100, phase: 'Cuartos de Final', group: 'nan',
        home: 'Gan. P95', homeFlag: '🏳️',
        away: 'Gan. P96', awayFlag: '🏳️',
        time: 'Sáb 11-Jul, 8:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 101, phase: 'Semifinal', group: 'nan',
        home: 'Gan. P97', homeFlag: '🏳️',
        away: 'Gan. P98', awayFlag: '🏳️',
        time: 'Mar 14-Jul, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 102, phase: 'Semifinal', group: 'nan',
        home: 'Gan. P99', homeFlag: '🏳️',
        away: 'Gan. P100', awayFlag: '🏳️',
        time: 'Mié 15-Jul, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 103, phase: 'Tercer Puesto', group: 'nan',
        home: 'Perd. P101', homeFlag: '🏳️',
        away: 'Perd. P102', awayFlag: '🏳️',
        time: 'Sáb 18-Jul, 4:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
    {
        id: 104, phase: 'Final', group: 'nan',
        home: 'Gan. P101', homeFlag: '🏳️',
        away: 'Gan. P102', awayFlag: '🏳️',
        time: 'Dom 19-Jul, 2:00 PM', status: 'scheduled',
        realHome: null, realAway: null, isTBD: true
    },
];

