import { initializeApp, getApps } from 'firebase/app'; // SDK de cliente
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore'; // Firestore para cliente

const firebaseConfig = require('C:/Users/RUTH/node-proyects/InternshipsDB/rsef-c0e6d-firebase-adminsdk-zxp7c-269a3d0ec6.json');

if (!getApps().length) {
  initializeApp(firebaseConfig);  // Solo inicializamos si no hay apps activas
}

const db = getFirestore(); // Usamos getFirestore() del SDK cliente

export default db;