import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2g7mIbWa8WNPKHwU1G0Dj4PrT9T3Rh-0",
  authDomain: "urturn-9ff90.firebaseapp.com",
  databaseURL: "https://urturn-9ff90-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "urturn-9ff90",
  storageBucket: "urturn-9ff90.appspot.com",
  messagingSenderId: "585989531529",
  appId: "1:585989531529:web:e9258cee259eb084816358",
  measurementId: "G-C5NG3RB71E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Debes iniciar sesi\u00f3n para reservar.");
    window.location.href = "../auth/login/login.html";
    return;
  }
  currentUser = user;
});

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Negocio no especificado");
    return;
  }

  const ref = doc(db, "business", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("Negocio no encontrado");
    return;
  }

  const data = snap.data();

  document.getElementById("business-name").textContent = data.name;
  const img = document.getElementById("business-image");
  const loader = document.getElementById("image-loader");

  img.onload = () => {
    img.classList.add("loaded");
    loader.style.display = "none";
  };
  img.src = data.image;


  document.getElementById("business-type").textContent = data.type;
  document.getElementById("business-location").textContent = data.location;
  document.getElementById("business-description").textContent = data.description || "Sin descripci\u00f3n.";
  document.getElementById("business-hours").textContent = `\ud83d\udd52 ${data.hours || 'No especificado'}`;
  document.getElementById("business-contact").innerHTML = `
    \ud83d\udcde <a href="tel:${data.phone}">${data.phone}</a><br>
    \u2709\ufe0f <a href="mailto:${data.email}">${data.email}</a>
  `;
  document.getElementById("business-rating").textContent = `\u2b50 ${data.rating || 0} · ${data.reviews || 0} valoraciones`;

  // Bot\u00f3n volver atr\u00e1s
  document.querySelector(".back-button").addEventListener("click", () => {
    history.back();
  });

  // Mostrar formulario
 document.getElementById("toggle-form").addEventListener("click", () => {
  const form = document.getElementById("form-container");
  form.classList.toggle("visible");
});
  // Enviar formulario
  document.getElementById("reserve-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const appointment = {
      uid: currentUser.uid,
      businessId: id,
      title: `Reserva en ${data.name}`,
      description: document.getElementById("description").value,
      time: document.getElementById("time").value,
      date: document.getElementById("date").value,
      people: parseInt(document.getElementById("people").value),
      price: "-",
      status: "pending"
    };

    const token = await currentUser.getIdToken();

    try {
      const res = await fetch("http://localhost:3000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(appointment)
      });

      if (!res.ok) throw new Error("Error al crear la reserva");

      alert("Reserva enviada correctamente ✅");
      document.getElementById("reserve-form").reset();
      document.getElementById("form-container").classList.add("hidden");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al crear la reserva.");
    }
  });
});