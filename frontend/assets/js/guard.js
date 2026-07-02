/**
 * ==========================================
 * DÉCONNEXION
 * ==========================================
 */

function logout() {

    // Supprimer les informations de session
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem(CONFIG.USER_KEY);

    // Nettoyer toute autre donnée locale si nécessaire
    sessionStorage.clear();

    // Empêcher le retour à la page précédente
    window.location.replace("login.html");

}