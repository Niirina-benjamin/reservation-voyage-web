document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard chargé.");
});
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem(CONFIG.USER_KEY));
  if (user) {
    const currentUserName = document.getElementById("currentUserName");
    currentUserName.textContent = `${user.prenom} ${user.nom}`;
  }
});
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
      logout();
    }
  });
}
const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("sidebarToggle");
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});
const logoutSidebar = document.getElementById("logoutSidebar");
if (logoutSidebar) {
  logoutSidebar.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
      logout();
    }
  });
}
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".sidebar-menu a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem(CONFIG.USER_KEY));
  if (user) {
    document.getElementById("welcomeMessage").textContent =
      `Bonjour ${user.prenom} 👋`;
  }
});
document.getElementById("totalUsers").textContent = 125;
document.getElementById("totalTrips").textContent = 42;
document.getElementById("totalBookings").textContent = 580;
document.getElementById("totalPayments").textContent = 420;
/*=========================================
    GRAPHIQUE DES RÉSERVATIONS
=========================================*/
const ctx = document.getElementById("reservationChart");
if (ctx) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"],
      datasets: [
        {
          label: "Réservations",
          data: [18, 35, 28, 50, 70, 65, 95],
          borderWidth: 3,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });
}
/*=========================================
    DERNIÈRES RÉSERVATIONS
=========================================*/
const reservations = [
  {
    reference: "RES-001",
    client: "Jean Dupont",
    depart: "Antananarivo",
    destination: "Toamasina",
    date: "12/06/2026",
    statut: "Confirmée",
  },
  {
    reference: "RES-002",
    client: "Marie Rakoto",
    depart: "Fianarantsoa",
    destination: "Toliara",
    date: "13/06/2026",
    statut: "En attente",
  },
  {
    reference: "RES-003",
    client: "Paul Rabe",
    depart: "Mahajanga",
    destination: "Antsirabe",
    date: "14/06/2026",
    statut: "Annulée",
  },
];
const table = document.getElementById("reservationTable");
if (table) {
  reservations.forEach((reservation) => {
    let badge = "";
    switch (reservation.statut) {
      case "Confirmée":
        badge = "success";
        break;
      case "En attente":
        badge = "warning";
        break;
      case "Annulée":
        badge = "danger";
        break;
      default:
        badge = "secondary";
    }
    table.innerHTML += `
            <tr>
                <td>${reservation.reference}</td>
                <td>${reservation.client}</td>
                <td>${reservation.depart}</td>
                <td>${reservation.destination}</td>
                <td>${reservation.date}</td>
                <td>
                    <span class="badge bg-${badge}">
                        ${reservation.statut}
                    </span>
                </td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
  });
}
async function loadStatistics(){
    try{
        const token =
        localStorage.getItem(CONFIG.TOKEN_KEY);
        const response = await fetch(
            `${CONFIG.API_BASE_URL}/dashboard/statistics`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        const data = await response.json();
        document.getElementById("totalUsers").textContent =
        data.totalUsers;
        document.getElementById("totalTrips").textContent =
        data.totalTrips;
        document.getElementById("totalBookings").textContent =
        data.totalReservations;
        document.getElementById("totalPayments").textContent =
        data.totalPayments;
    }
    catch(error){
        console.error(error);
    }
}
document.addEventListener(
    "DOMContentLoaded",
    ()=>{
        loadStatistics();
    }
);