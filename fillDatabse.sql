-- Add user types pes
INSERT INTO `user_type` (`name`) VALUES ('admin'), ('customer');
-- Add users
INSERT INTO `users` (`id_user_type`, `username`, `password`) VALUES ('1', 'Administrator1', '56b1db8133d9eb398aabd376f07bf8ab5fc584ea0b8bd6a1770200cb613ca005'), ('2', 'Franta', '56b1db8133d9eb398aabd376f07bf8ab5fc584ea0b8bd6a1770200cb613ca005');

-- Add lanes
INSERT INTO `lane` (`gates`) VALUES ('0'), ('1');

-- Add reservation types
INSERT INTO `reservation_type` (`name`) VALUES ('Sprava'), ('Rezervovano');

-- Add reservations
INSERT INTO `reservation` (`id_reservation_type`, `id_lane`, `start`, `end`) VALUES ('1', '1', '2024-04-02 16:00:00', '2024-04-02 16:30:00'), ('2', '2', '2024-12-02 14:00:00', '2024-12-02 16:00:00');
