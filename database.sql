CREATE TABLE `user_type` (
  `id_user_type` integer PRIMARY KEY AUTO_INCREMENT, 
  `name` varchar(255) NOT NULL
);

CREATE TABLE `users` (
  `id_user` integer PRIMARY KEY AUTO_INCREMENT,
  `id_user_type` integer NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
);

CREATE TABLE `order` (
  `id_order` integer PRIMARY KEY AUTO_INCREMENT,
  `id_reservation` integer NOT NULL,
  `id_user` integer NOT NULL
);

CREATE TABLE `announcement` (
  `id_announcement` integer PRIMARY KEY AUTO_INCREMENT,
  `id_user` integer NOT NULL,
  `text` varchar(255)
);

-- pozor na zmenu date na datime

CREATE TABLE `reservation` (
  `id_reservation` integer PRIMARY KEY AUTO_INCREMENT,
  `id_reservation_type` integer NOT NULL,
  `id_lane` integer NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL
);

CREATE TABLE `reservation_type` (
  `id_reservation_type` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `lane` (
  `id_lane` integer PRIMARY KEY AUTO_INCREMENT,
  `gates` boolean NOT NULL
);

ALTER TABLE `announcement` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

ALTER TABLE `users` ADD FOREIGN KEY (`id_user_type`) REFERENCES `user_type` (`id_user_type`);

ALTER TABLE `order` ADD FOREIGN KEY (`id_reservation`) REFERENCES `reservation` (`id_reservation`);

ALTER TABLE `reservation` ADD FOREIGN KEY (`id_lane`) REFERENCES `lane` (`id_lane`);

ALTER TABLE `reservation` ADD FOREIGN KEY (`id_reservation_type`) REFERENCES `reservation_type` (`id_reservation_type`);

ALTER TABLE `order` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
