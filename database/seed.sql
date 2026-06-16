-- ============================================
-- UTILISATION DE LA BASE
-- ============================================
USE voyage_db;

-- ============================================
-- INSERTION DES VILLES (cities)
-- ============================================
INSERT INTO cities (nom, code_postal, pays) VALUES
('Paris', '75000', 'France'),
('Lyon', '69000', 'France'),
('Marseille', '13000', 'France'),
('Bordeaux', '33000', 'France'),
('Toulouse', '31000', 'France'),
('Nice', '06000', 'France'),
('Nantes', '44000', 'France'),
('Strasbourg', '67000', 'France'),
('Lille', '59000', 'France'),
('Rennes', '35000', 'France');

-- ============================================
-- INSERTION DES UTILISATEURS (users)
-- ============================================
INSERT INTO users (nom, prenom, email, telephone, password, role) VALUES
('Admin', 'System', 'admin@gmail.com', '0340000000', 'admin123', 'admin'),
('Dupont', 'Jean', 'jean.dupont@email.com', '0612345678', 'password123', 'client'),
('Martin', 'Sophie', 'sophie.martin@email.com', '0623456789', 'password123', 'client'),
('Bernard', 'Pierre', 'pierre.bernard@email.com', '0634567890', 'password123', 'client');

-- ============================================
-- INSERTION DES VÉHICULES (vehicles)
-- ============================================
INSERT INTO vehicles (nom, immatriculation, nombre_places) VALUES
('Sprinter Mercedes', 'ABC123', 30),
('Iveco Daily', 'XYZ789', 20),
('Renault Trafic', 'DEF456', 15),
('Mercedes Vito', 'GHI789', 12);

-- ============================================
-- INSERTION DES SIÈGES (seats)
-- ============================================
-- Pour chaque véhicule, on génère des sièges (manuellement pour l'exemple)
-- Vehicle 1 (Sprinter) : 30 sièges
INSERT INTO seats (numero, vehicle_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
(6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
(11, 1), (12, 1), (13, 1), (14, 1), (15, 1),
(16, 1), (17, 1), (18, 1), (19, 1), (20, 1),
(21, 1), (22, 1), (23, 1), (24, 1), (25, 1),
(26, 1), (27, 1), (28, 1), (29, 1), (30, 1);

-- Vehicle 2 (Iveco) : 20 sièges
INSERT INTO seats (numero, vehicle_id) VALUES
(1, 2), (2, 2), (3, 2), (4, 2), (5, 2),
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2),
(11, 2), (12, 2), (13, 2), (14, 2), (15, 2),
(16, 2), (17, 2), (18, 2), (19, 2), (20, 2);

-- Vehicle 3 (Renault) : 15 sièges
INSERT INTO seats (numero, vehicle_id) VALUES
(1, 3), (2, 3), (3, 3), (4, 3), (5, 3),
(6, 3), (7, 3), (8, 3), (9, 3), (10, 3),
(11, 3), (12, 3), (13, 3), (14, 3), (15, 3);

-- Vehicle 4 (Mercedes Vito) : 12 sièges
INSERT INTO seats (numero, vehicle_id) VALUES
(1, 4), (2, 4), (3, 4), (4, 4), (5, 4),
(6, 4), (7, 4), (8, 4), (9, 4), (10, 4),
(11, 4), (12, 4);

-- ============================================
-- INSERTION DES TRAJETS (trips) - AVEC ID DES VILLES
-- ============================================
INSERT INTO trips (depart_id, destination_id, date_depart, heure_depart, prix, vehicle_id) VALUES
(1, 2, '2026-06-20', '08:00:00', 45.00, 1),  -- Paris → Lyon
(2, 3, '2026-06-20', '09:30:00', 55.00, 2),  -- Lyon → Marseille
(1, 4, '2026-06-21', '07:00:00', 65.00, 3),  -- Paris → Bordeaux
(4, 5, '2026-06-21', '10:00:00', 35.00, 1),  -- Bordeaux → Toulouse
(1, 6, '2026-06-22', '06:30:00', 75.00, 4),  -- Paris → Nice
(3, 1, '2026-06-22', '14:00:00', 55.00, 2),  -- Marseille → Paris
(2, 7, '2026-06-23', '08:30:00', 40.00, 3),  -- Lyon → Nantes
(8, 9, '2026-06-23', '09:00:00', 30.00, 1);  -- Strasbourg → Lille

-- ============================================
-- INSERTION DES RÉSERVATIONS (reservations)
-- ============================================
INSERT INTO reservations (user_id, trip_id, statut) VALUES
(2, 1, 'confirmee'),   -- Jean réserve Paris → Lyon
(3, 2, 'en_attente'),  -- Sophie réserve Lyon → Marseille
(4, 3, 'confirmee'),   -- Pierre réserve Paris → Bordeaux
(2, 5, 'annulee');     -- Jean annule Paris → Nice

-- ============================================
-- INSERTION DES SIÈGES RÉSERVÉS (reservation_seats)
-- ============================================
INSERT INTO reservation_seats (reservation_id, seat_id) VALUES
(1, 1),  -- Réservation 1 → Siège 1 (véhicule 1)
(1, 2),  -- Réservation 1 → Siège 2 (véhicule 1)
(1, 3),  -- Réservation 1 → Siège 3 (véhicule 1)
(2, 21), -- Réservation 2 → Siège 1 (véhicule 2)
(3, 46), -- Réservation 3 → Siège 1 (véhicule 3)
(3, 47); -- Réservation 3 → Siège 2 (véhicule 3)

-- ============================================
-- INSERTION DES PAIEMENTS (payments) - NOUVEAU
-- ============================================
INSERT INTO payments (reservation_id, montant, mode_paiement, statut, reference_paiement) VALUES
(1, 45.00, 'carte', 'paye', 'PAY-2026-001'),
(3, 65.00, 'paypal', 'paye', 'PAY-2026-002'),
(2, 55.00, 'virement', 'en_attente', 'PAY-2026-003'),
(4, 75.00, 'carte', 'rembourse', 'PAY-2026-004');