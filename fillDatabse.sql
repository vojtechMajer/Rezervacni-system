-- Add user types
INSERT INTO `user_type` (`id_user_type`, `name`) VALUES ('0', 'admin'), ('1', 'customer');

-- Add users
INSERT INTO `users` (`id_user`, `id_user_type`, `username`, `password`) VALUES ('0', '0', 'Administrator1', '56b1db8133d9eb398aabd376f07bf8ab5fc584ea0b8bd6a1770200cb613ca005'), ('1', '1', 'Franta', '56b1db8133d9eb398aabd376f07bf8ab5fc584ea0b8bd6a1770200cb613ca005');

-- Add lanes
INSERT INTO `lane` (`id_lane`, `gates`) VALUES ('0', '1'), ('1', '0');

-- Add reservation types
INSERT INTO `reservation_type` (`id_reservation_type`, `name`) VALUES ('0', 'Sprava'), ('1', 'Rezervovano');

-- Add reservations
INSERT INTO `reservation` (`id_reservation`, `id_reservation_type`, `id_lane`, `start`, `end`) VALUES ('0', '0', '0', '2024-04-02 16:00:00', '2024-04-02 16:30:00'), ('1', '1', '1', '2024-12-02 14:00:00', '2024-12-02 16:00:00',);
