import { loginUser } from '../auth';

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  try {
    const userCredential = await loginUser(email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem('token', token);
    window.location.href = "/complete-info.html";
  } catch {
    alert("Invalid credentials.");
  }
});
