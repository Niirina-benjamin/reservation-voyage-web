const db = require('../config/db');

const User = {
    create: (userData, callback) => {
        const sql = `
            INSERT INTO users
            (nom, prenom, email, telephone, password, role)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                userData.nom,
                userData.prenom,
                userData.email,
                userData.telephone,
                userData.password,
                userData.role || 'client'
            ],
            callback
        );
    },

    findByEmail: (email, callback) => {
        db.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            callback
        );
    }
};

module.exports = User;