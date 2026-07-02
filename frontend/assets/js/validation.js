/**
 * Affiche une erreur
 */
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + "Error");

  input.classList.remove("is-valid");
  input.classList.add("is-invalid");

  if (error) {
    error.textContent = message;
  }
}

/**
 * Champ valide
 */
function showSuccess(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + "Error");

  input.classList.remove("is-invalid");
  input.classList.add("is-valid");

  if (error) {
    error.textContent = "";
  }
}

/**
 * Réinitialise un champ
 */
function clearValidation(inputId) {
  const input = document.getElementById(inputId);

  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  return regex.test(password);
}
function validateRegisterForm() {
  let valid = true;

  // ==========================
  // Récupération des champs
  // ==========================

  const nom = document.getElementById("nom").value.trim();

  const prenom = document.getElementById("prenom").value.trim();

  const telephone = document.getElementById("telephone").value.trim();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  const confirmPassword = document.getElementById("confirmPassword").value;

  const terms = document.getElementById("terms").checked;

  // ==========================
  // Nom
  // ==========================

  if (nom === "") {
    showError("nom", "Le nom est obligatoire.");

    valid = false;
  } else {
    showSuccess("nom");
  }

  // ==========================
  // Prénom
  // ==========================

  if (prenom === "") {
    showError("prenom", "Le prénom est obligatoire.");

    valid = false;
  } else {
    showSuccess("prenom");
  }

  // ==========================
  // Téléphone
  // ==========================

  if (telephone === "") {
    showError("telephone", "Le téléphone est obligatoire.");

    valid = false;
  } else {
    showSuccess("telephone");
  }

  // ==========================
  // Email
  // ==========================

  if (email === "") {
    showError("email", "L'email est obligatoire.");

    valid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Adresse email invalide.");

    valid = false;
  } else {
    showSuccess("email");
  }

  // ==========================
  // Mot de passe
  // ==========================

  if (password === "") {
    showError("password", "Le mot de passe est obligatoire.");

    valid = false;
  } else if (!isValidPassword(password)) {
    showError(
      "password",
      "8 caractères minimum avec une majuscule, une minuscule et un chiffre.",
    );

    valid = false;
  } else {
    showSuccess("password");
  }

  // ==========================
  // Confirmation
  // ==========================

  if (confirmPassword === "") {
    showError("confirmPassword", "Veuillez confirmer votre mot de passe.");

    valid = false;
  } else if (password !== confirmPassword) {
    showError("confirmPassword", "Les mots de passe ne correspondent pas.");

    valid = false;
  } else {
    showSuccess("confirmPassword");
  }

  // ==========================
  // Conditions
  // ==========================

  const termsError = document.getElementById("termsError");

  if (!terms) {
    termsError.textContent = "Vous devez accepter les conditions.";

    valid = false;
  } else {
    termsError.textContent = "";
  }

  return valid;
}

function validateLoginForm() {
  let valid = true;

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  // Email

  if (email === "") {
    showError("email", "L'email est obligatoire.");

    valid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Adresse email invalide.");

    valid = false;
  } else {
    showSuccess("email");
  }

  // Mot de passe

  if (password === "") {
    showError("password", "Le mot de passe est obligatoire.");

    valid = false;
  } else {
    showSuccess("password");
  }

  return valid;
}

function setupRealtimeValidation(inputId, validator) {
  const input = document.getElementById(inputId);

  if (!input) return;

  input.addEventListener("blur", validator);

  input.addEventListener("input", validator);
}
