import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

let negocios = [];

async function loadBusiness() {
  const querySnapshot = await getDocs(collection(db, "business"));
  negocios = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const tiposUnicos = [...new Set(negocios.map(n => n.type))];
  const container = document.getElementById("type-checkboxes");
  container.innerHTML = "";
  tiposUnicos.forEach(tipo => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${tipo}" checked /> ${tipo}`;
    container.appendChild(label);
  });

  applyFilters();
}

function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
}

function getActiveTypes() {
  const checkboxes = document.querySelectorAll('.dropdown-options input[type="checkbox"]');
  return Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
}

function renderBusinesses(data) {
  const container = document.querySelector(".results");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  data.forEach((business) => {
    const card = document.createElement("div");
    card.className = "business-card fade-in";
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

    card.addEventListener("click", () => {
      window.location.href = `../request/request.html?id=${business.id}`;
    });

    container.appendChild(card);
  });
}

function applyFilters() {
  const searchText = normalize(document.getElementById("search-input").value);
  const selectedTypes = getActiveTypes();
  const sort = document.getElementById("sort-select").value;

  let filtered = negocios.filter(b =>
    normalize(b.name).includes(searchText) &&
    selectedTypes.includes(b.type)
  );

  filtered.sort((a, b) => {
    return sort === "az"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  renderBusinesses(filtered);
}

window.addEventListener("DOMContentLoaded", () => {
  loadBusiness();

  document.getElementById("search-input").addEventListener("input", applyFilters);
  document.getElementById("sort-select").addEventListener("change", applyFilters);

  document.addEventListener("change", (e) => {
    if (e.target.matches(".dropdown-options input[type='checkbox']")) {
      applyFilters();
    }
  });

  const dropdown = document.querySelector('.dropdown-multiselect');
  const dropdownHeader = dropdown.querySelector('.dropdown-header');

  dropdownHeader.addEventListener('click', () => {
    dropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
});
