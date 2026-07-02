/**
 * ==========================================
 * AFFICHER / MASQUER LE MOT DE PASSE
 * ==========================================
 */

function setupPasswordToggle(buttonId, inputId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(inputId);

  if (!button || !input) return;

  button.addEventListener("click", () => {
    const hidden = input.type === "password";

    input.type = hidden ? "text" : "password";

    button.innerHTML = hidden
      ? '<i class="bi bi-eye-slash"></i>'
      : '<i class="bi bi-eye"></i>';
  });
}

setupPasswordToggle("togglePassword", "password");
setupPasswordToggle("toggleConfirmPassword", "confirmPassword");
/**
 * ==========================================
 * ALERTES
 * ==========================================
 */

function showAlert(containerId, message, type = "danger") {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
}

function clearAlert(containerId) {
  const container = document.getElementById(containerId);

  if (container) {
    container.innerHTML = "";
  }
}
/**
 * ==========================================
 * INSCRIPTION
 * ==========================================
 */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", register);
}

async function register(event) {
  event.preventDefault();

  clearAlert("registerMessage");

  if (!validateRegisterForm()) return;

  const submitButton = registerForm.querySelector("button[type='submit']");

  submitButton.disabled = true;

  submitButton.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Création...
    `;

  const userData = {
    nom: document.getElementById("nom").value.trim(),

    prenom: document.getElementById("prenom").value.trim(),

    telephone: document.getElementById("telephone").value.trim(),

    email: document.getElementById("email").value.trim(),

    password: document.getElementById("password").value,
  };

  try {
    const response = await apiRequest(
      "/auth/register",

      "POST",

      userData,
    );

    if (!response.ok) {
      showAlert(
        "registerMessage",

        response.data.message || "Erreur lors de l'inscription.",
      );

      return;
    }

    showAlert(
      "registerMessage",

      "Compte créé avec succès.",

      "success",
    );

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  } catch (error) {
    showAlert(
      "registerMessage",

      "Impossible de contacter le serveur.",
    );
  } finally {
    submitButton.disabled = false;

    submitButton.innerHTML = `
            <i class="bi bi-person-plus-fill me-2"></i>
            Créer mon compte
        `;
  }
}
/**
 * ==========================================
 * CONNEXION
 * ==========================================
 */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", login);
}

async function login(event) {
  event.preventDefault();

  clearAlert("loginMessage");

  if (!validateLoginForm()) return;

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  const submitButton = loginForm.querySelector("button[type='submit']");

  submitButton.disabled = true;

  submitButton.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Connexion...
    `;

  try {
    const response = await apiRequest(
      "/auth/login",

      "POST",

      {
        email,

        password,
      },
    );

    if (!response.ok) {
      showAlert(
        "loginMessage",

        response.data.message || "Email ou mot de passe incorrect.",
      );

      return;
    }

    const {
      token,

      user,
    } = response.data;

    localStorage.setItem(
      CONFIG.TOKEN_KEY,

      token,
    );

    localStorage.setItem(
      CONFIG.USER_KEY,

      JSON.stringify(user),
    );

    showAlert(
      "loginMessage",

      "Connexion réussie.",

      "success",
    );

    setTimeout(() => {
      window.location.href = "dashboard/dashboard.html";
    }, 1000);
  } catch (error) {
    console.error(error);

    showAlert(
      "loginMessage",

      "Impossible de contacter le serveur.",
    );
  } finally {
    submitButton.disabled = false;

    submitButton.innerHTML = `
            <i class="bi bi-box-arrow-in-right me-2"></i>
            Se connecter
        `;
  }
}
/**
 * ==========================================
 * DECONNEXION
 * ==========================================
 */

function logout() {
  localStorage.removeItem(CONFIG.TOKEN_KEY);

  localStorage.removeItem(CONFIG.USER_KEY);

  window.location.href = "../login.html";
}
/**
 * ==========================================
 * UTILISATEUR CONNECTE ?
 * ==========================================
 */

function isAuthenticated() {
  return localStorage.getItem(CONFIG.TOKEN_KEY) !== null;
}
