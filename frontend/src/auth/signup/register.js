import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { firebaseConfig } from "../../firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    localStorage.setItem('token', idToken);
    window.location.href = '../complete-info/complete-info.html';
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message || "Error during registration");
  }
});