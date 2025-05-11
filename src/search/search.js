// Importa desde los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración de Firebase
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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Variable global para guardar los negocios cargados
let negocios = [];

// Cargar negocios desde Firestore
async function loadBusiness() {
  const container = document.querySelector(".results");
  container.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "business"));
  negocios = querySnapshot.docs.map(doc => doc.data());

  renderBusinesses(negocios);
}

// Renderizar tarjetas de negocios
function renderBusinesses(data) {
  const container = document.querySelector(".results");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  data.forEach((business) => {
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

// Filtrar por texto y tipo
function filterBusinesses() {
  const searchText = document.getElementById("search-input").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
  const selectedType = document.getElementById("type-filter").value;

  const filtered = negocios.filter(b =>
    b.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').includes(searchText) &&
    (selectedType === "" || b.type === selectedType)
  );

  renderBusinesses(filtered);
}

// Ejecutar al cargar
window.addEventListener("DOMContentLoaded", () => {
  loadBusiness();

  document.getElementById("search-input").addEventListener("input", filterBusinesses);
  document.getElementById("type-filter").addEventListener("change", filterBusinesses);
});
