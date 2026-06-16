CREATE DATABASE IF NOT EXISTS voyage_db;
USE voyage_db;

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

CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    immatriculation VARCHAR(50) UNIQUE NOT NULL,
    nombre_places INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    depart VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    date_depart DATE NOT NULL,
    heure_depart TIME NOT NULL,
    prix DECIMAL(10,2) NOT NULL,

    vehicle_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (vehicle_id)
    REFERENCES vehicles(id)
    ON DELETE CASCADE
);

CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,

    numero INT NOT NULL,

    vehicle_id INT NOT NULL,

    FOREIGN KEY (vehicle_id)
    REFERENCES vehicles(id)
    ON DELETE CASCADE
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    trip_id INT NOT NULL,

    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    statut ENUM(
        'en_attente',
        'confirmee',
        'annulee'
    ) DEFAULT 'en_attente',

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (trip_id)
    REFERENCES trips(id)
    ON DELETE CASCADE
);

CREATE TABLE reservation_seats (
    id INT AUTO_INCREMENT PRIMARY KEY,

    reservation_id INT NOT NULL,

    seat_id INT NOT NULL,

    FOREIGN KEY (reservation_id)
    REFERENCES reservations(id)
    ON DELETE CASCADE,

    FOREIGN KEY (seat_id)
    REFERENCES seats(id)
    ON DELETE CASCADE
);