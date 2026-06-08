// firebase-config.js - Configuración de Firebase para Polla Mundialista 2026
const firebaseConfig = {
    apiKey: "AIzaSyCydr90W-UNBpFgFVrKc3FmFXTeFSkztzI",
    authDomain: "polla-mundial-2026-3d1bd.firebaseapp.com",
    projectId: "polla-mundial-2026-3d1bd",
    storageBucket: "polla-mundial-2026-3d1bd.firebasestorage.app",
    messagingSenderId: "355832039260",
    appId: "1:355832039260:web:2f564872e77aa73a0b2399"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
