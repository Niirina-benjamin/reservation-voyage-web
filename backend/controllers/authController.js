const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Fonction register
exports.register = async (req, res) => {

    const {
        nom,
        prenom,
        email,
        telephone,
        password
    } = req.body;

    try {

        User.findByEmail(email, async (err, results) => {

            if (results.length > 0) {
                return res.status(400).json({
                    message: 'Email déjà utilisé'
                });
            }

            const hashedPassword =
                await bcrypt.hash(password, 10);

            User.create({
                nom,
                prenom,
                email,
                telephone,
                password: hashedPassword
            }, (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    message: 'Utilisateur créé'
                });
            });
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

// Fonction login
exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findByEmail(email, async (err, results) => {

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        const user = results[0];

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Mot de passe incorrect'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.json({
            token,
            user: {
                id: user.id,
                nom: user.nom,
                email: user.email,
                role: user.role
            }
        });
    });
};