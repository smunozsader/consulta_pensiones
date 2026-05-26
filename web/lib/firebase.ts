import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBaX5fInDmAraBUaTOw-dlmTOoWuFqTA9I',
  authDomain: 'mi-consultor-de-pensiones.firebaseapp.com',
  projectId: 'mi-consultor-de-pensiones',
  storageBucket: 'mi-consultor-de-pensiones.firebasestorage.app',
  messagingSenderId: '535306327170',
  appId: '1:535306327170:web:ca2e8d4f67ba23070f109b',
  measurementId: 'G-PKW6G39YE1',
  databaseURL: 'https://mi-consultor-de-pensiones-default-rtdb.firebaseio.com',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
