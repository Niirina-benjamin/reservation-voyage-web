const db = require("../config/db");
const Dashboard = {
    getStatistics(callback) {
        const sql = `
            SELECT
                (SELECT COUNT(*) FROM users) AS totalUsers,
                (SELECT COUNT(*) FROM trajets) AS totalTrips,
                (SELECT COUNT(*) FROM reservations) AS totalReservations,
                (SELECT COUNT(*) FROM paiements) AS totalPayments
        `;
        db.query(sql, callback);
    }
};
module.exports = Dashboard;