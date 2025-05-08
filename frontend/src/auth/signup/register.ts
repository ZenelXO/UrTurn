import { registerUser } from '../auth';

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  try {
    const userCredential = await registerUser(email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem('token', token);
    window.location.href = "/complete-info.html";
  } catch (error) {
    alert("Error creating account: " + error);
  }
});
