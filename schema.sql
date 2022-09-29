
DROP DATABASE IF EXISTS moods_app;
CREATE DATABASE moods_app;
USE moods_app;

CREATE TABLE `moods` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `mood` VARCHAR(255) NOT NULL,
  `rating` INT NOT NULL default 0,
  `date` TIMESTAMP NOT NULL default CURRENT_TIMESTAMP());

  
