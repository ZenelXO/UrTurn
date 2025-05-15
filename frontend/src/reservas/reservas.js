import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Redirigir al login si no está autenticado
    window.location.href = "../auth/login/login.html";
    return;
  }

  try {
    const token = await user.getIdToken();

    const res = await fetch(`http://localhost:3000/api/appointments?uid=${user.uid}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    });
    const appointments = await res.json();

    const container = document.querySelector(".cards-container");
    container.innerHTML = "";

    appointments.forEach(app => {
      const card = document.createElement("section");
      card.className = "appointment-card";
      card.innerHTML = `
        <div class="card-info">
          <p class="service">${app.title} <span class="status ${app.status}">${app.status}</span></p>
          <p class="details">${app.description}</p>
          <div class="meta">
            <span>🕒 ${app.time}</span>
            <span>💰 ${app.price}</span>
            <span>👥 ${app.people}</span>
            <span>📅 ${app.date}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="delete-btn">🗑️</button>
        </div>
      `;
      container.appendChild(card);
      const deleteBtn = card.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", async () => {
        const confirmed = confirm("¿Seguro que quieres cancelar esta reserva?");
        if (!confirmed) return;

        const token = await auth.currentUser.getIdToken();

        try {
            const res = await fetch(`http://localhost:3000/api/appointments/${app.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
            });

            if (!res.ok) throw new Error("Error cancelando reserva");

            app.status = 'canceled';
            const statusSpan = card.querySelector(".status");
            statusSpan.className = "status canceled";
            statusSpan.textContent = "canceled";
            //window.location.reload();

        } catch (error) {
            console.error("Error al cancelar la reserva:", error);
            alert("Hubo un error al cancelar la reserva.");
        }
        });

    });
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
  }
});
