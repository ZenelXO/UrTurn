import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB2g7mIbWa8WNPKHwU1G0Dj4PrT9T3Rh-0",
    authDomain: "urturn-9ff90.firebaseapp.com",
    databaseURL: "https://urturn-9ff90-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "urturn-9ff90",
    storageBucket: "urturn-9ff90.firebasestorage.app",
    messagingSenderId: "585989531529",
    appId: "1:585989531529:web:e9258cee259eb084816358",
    measurementId: "G-C5NG3RB71E"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
