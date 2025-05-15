import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { firebaseConfig } from '../../firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailElement = document.getElementById('email');
  const email = emailElement?.value || '';
  const passwordElement = document.getElementById('password');
  const password = passwordElement?.value || '';

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    localStorage.setItem('token', idToken);
    window.location.href = '../../../../index.html';
  } catch (error) {
    console.error('Login error:', error);
    alert(error.message || 'Credenciales incorrectas');
  }
});
