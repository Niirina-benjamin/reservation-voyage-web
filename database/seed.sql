INSERT INTO users (
nom,
prenom,
email,
telephone,
password,
role
)
VALUES (
'Admin',
'System',
'admin@gmail.com',
'0340000000',
'admin123',
'admin'
);

INSERT INTO vehicles (
nom,
immatriculation,
nombre_places
)
VALUES (
'Sprinter Mercedes',
'ABC123',
30
);

INSERT INTO trips (
depart,
destination,
date_depart,
heure_depart,
prix,
vehicle_id
)
VALUES (
'Antananarivo',
'Toamasina',
'2026-08-15',
'08:00:00',
50000,
1
);

INSERT INTO seats (numero, vehicle_id)
VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,1),
(8,1),
(9,1),
(10,1);