// Importa desde los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración de Firebase (rellena con la tuya)
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

// Inicializa la app y la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cargar negocios
async function loadBusiness() {
  const container = document.querySelector(".results");
  container.innerHTML = ""; // Limpia

  const querySnapshot = await getDocs(collection(db, "business"));
  querySnapshot.forEach((doc) => {
    const business = doc.data();

    const card = document.createElement("div");
    card.className = "business-card";
    card.innerHTML = `
    <div class="card-content">
        <img src="${business.image}" alt="${business.name}" class="business-img" />
        <div>
        <h2>${business.name}</h2>
        <p>Tipo: ${business.type}</p>
        <p>Ubicación: ${business.location}</p>
        </div>
    </div>
    `;
    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", loadBusiness);
