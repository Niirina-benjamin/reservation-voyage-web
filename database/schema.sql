-- ============================================
-- CRÉATION DE LA BASE DE DONNÉES
-- ============================================
CREATE DATABASE IF NOT EXISTS voyage_db;
USE voyage_db;

-- ============================================
-- TABLE : users (déjà existante)
-- ============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('client','admin') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE : vehicles (déjà existante)
-- ============================================
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    immatriculation VARCHAR(50) UNIQUE NOT NULL,
    nombre_places INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE : cities (NOUVELLE TABLE)
-- ============================================
CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    code_postal VARCHAR(10),
    pays VARCHAR(50) DEFAULT 'France',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE : trips (MODIFIÉE)
-- ============================================
CREATE TABLE trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    depart_id INT NOT NULL,              -- ← Changé : plus de texte
    destination_id INT NOT NULL,         -- ← Changé : plus de texte
    date_depart DATE NOT NULL,
    heure_depart TIME NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    vehicle_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Clés étrangères vers cities
    FOREIGN KEY (depart_id) 
        REFERENCES cities(id) 
        ON DELETE RESTRICT,              -- On ne peut pas supprimer une ville utilisée

    FOREIGN KEY (destination_id) 
        REFERENCES cities(id) 
        ON DELETE RESTRICT,

    FOREIGN KEY (vehicle_id) 
        REFERENCES vehicles(id) 
        ON DELETE CASCADE
);

-- ============================================
-- TABLE : seats (déjà existante)
-- ============================================
CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    vehicle_id INT NOT NULL,

    FOREIGN KEY (vehicle_id) 
        REFERENCES vehicles(id) 
        ON DELETE CASCADE,

    -- Pour éviter les doublons de numéros de siège dans un même véhicule
    UNIQUE KEY unique_seat_per_vehicle (vehicle_id, numero)
);

-- ============================================
-- TABLE : reservations (déjà existante)
-- ============================================
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trip_id INT NOT NULL,
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'confirmee', 'annulee') DEFAULT 'en_attente',

    FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,

    FOREIGN KEY (trip_id) 
        REFERENCES trips(id) 
        ON DELETE CASCADE
);

-- ============================================
-- TABLE : reservation_seats (déjà existante)
-- ============================================
CREATE TABLE reservation_seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT NOT NULL,
    seat_id INT NOT NULL,

    FOREIGN KEY (reservation_id) 
        REFERENCES reservations(id) 
        ON DELETE CASCADE,

    FOREIGN KEY (seat_id) 
        REFERENCES seats(id) 
        ON DELETE CASCADE,

    -- Évite qu'un même siège soit réservé deux fois pour la même réservation
    UNIQUE KEY unique_reservation_seat (reservation_id, seat_id)
);

-- ============================================
-- TABLE : payments (NOUVELLE TABLE)
-- ============================================
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    mode_paiement ENUM('carte', 'paypal', 'virement', 'especes') NOT NULL,
    statut ENUM('en_attente', 'paye', 'echoue', 'rembourse') DEFAULT 'en_attente',
    date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reference_paiement VARCHAR(100) UNIQUE,  -- Pour suivre les transactions

    FOREIGN KEY (reservation_id) 
        REFERENCES reservations(id) 
        ON DELETE CASCADE
);