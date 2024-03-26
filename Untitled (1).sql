CREATE TABLE `user_type` (
  `id_user_type` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `users` (
  `id_user` integer PRIMARY KEY,
  `id_user_type` integer,
  `username` varchar(255),
  `role` varchar(255)
);

CREATE TABLE `order` (
  `id_order` integer PRIMARY KEY,
  `id_reservation` integer,
  `id_user` integer,
  `price` integer
);

CREATE TABLE `announcement` (
  `id_announcement` integer PRIMARY KEY,
  `id_user` integer,
  `text` varchar(255)
);

CREATE TABLE `reservation` (
  `id_reservation` integer PRIMARY KEY,
  `id_reservation_type` integer,
  `id_lane` integer,
  `start` time,
  `end` time,
  `date` date
);

CREATE TABLE `reservation_type` (
  `id_reservation_type` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `lane` (
  `id_lane` integer PRIMARY KEY,
  `type` varchar(255)
);

ALTER TABLE `announcement` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

ALTER TABLE `users` ADD FOREIGN KEY (`id_user_type`) REFERENCES `user_type` (`id_user_type`);

ALTER TABLE `order` ADD FOREIGN KEY (`id_reservation`) REFERENCES `reservation` (`id_reservation`);

ALTER TABLE `reservation` ADD FOREIGN KEY (`id_lane`) REFERENCES `lane` (`id_lane`);

ALTER TABLE `reservation` ADD FOREIGN KEY (`id_reservation_type`) REFERENCES `reservation_type` (`id_reservation_type`);

ALTER TABLE `order` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
