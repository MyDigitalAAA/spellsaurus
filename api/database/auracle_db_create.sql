DROP DATABASE IF EXISTS auracle;
CREATE DATABASE auracle CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE auracle;

/* =========== PRIMARY TABLES =========== */

-- ROLES
CREATE TABLE IF NOT EXISTS `role` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

-- PERMISSIONS
CREATE TABLE IF NOT EXISTS `permission` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

-- USERS
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL DEFAULT "Disciple",
    `mail` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255),
    `gender` VARCHAR(255),
    `register_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `password` VARCHAR(255) NOT NULL,
    `role_id` INT UNSIGNED NOT NULL DEFAULT 1,
    `verified` BOOLEAN DEFAULT false,
    `verification_token` VARCHAR(255),
    `banned` BOOLEAN DEFAULT false,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`role_id`) REFERENCES role(`id`)
);

-- SPELLS
CREATE TABLE IF NOT EXISTS `spell` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Nom du sort",
    `description` VARCHAR(1000) NOT NULL DEFAULT "Description du sort",
    `level` INT UNSIGNED DEFAULT 0,
    `charge` INT UNSIGNED DEFAULT 0,
    `cost` VARCHAR(255) DEFAULT 0,
    `is_ritual` BOOLEAN DEFAULT false,
    `published` BOOLEAN DEFAULT true,
    `public` BOOLEAN DEFAULT true,
    `author_id` INT UNSIGNED NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`author_id`) REFERENCES user(`id`)
);

-- META SCHOOLS
CREATE TABLE IF NOT EXISTS `meta_school` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Nom de l'école mère",
    `description` VARCHAR(255) DEFAULT "Description de l'école mère",
    PRIMARY KEY (`id`)
);

-- SCHOOLS
CREATE TABLE IF NOT EXISTS `school` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Nom de l'école",
    `description` VARCHAR(255) DEFAULT "Description de l'école",
    `meta_school_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`meta_school_id`) REFERENCES meta_school(`id`)
);

-- COMMON INGREDIENTS
CREATE TABLE IF NOT EXISTS `ingredient` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Langue de salamandre",
    `description` VARCHAR(255) NOT NULL DEFAULT "Une langue de salamandre de feu encore chaude.",
    PRIMARY KEY (`id`)
);

-- COMMON VARIABLES
CREATE TABLE IF NOT EXISTS `variable` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL DEFAULT "Nombre de créatures affectées",
    PRIMARY KEY (`id`)
);

/* ==== ASSOCIATION TABLES ==== */

-- SPELLS' SCHOOLS
-- One spell can have multiple (up to 3) schools
CREATE TABLE IF NOT EXISTS `spell_school` (
    `spell_id` INT UNSIGNED NOT NULL,
    `school_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`spell_id`, `school_id`),
    FOREIGN KEY(`spell_id`) REFERENCES spell(`id`),
    FOREIGN KEY(`school_id`) REFERENCES school(`id`)
);

-- SPELLS' VARIABLES
-- One spell can have multiple (up to 2) variables of cost
CREATE TABLE IF NOT EXISTS `spell_variable` (
    `spell_id` INT UNSIGNED NOT NULL,
    `variable_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`spell_id`, `variable_id`),
    FOREIGN KEY(`spell_id`) REFERENCES spell(`id`),
    FOREIGN KEY(`variable_id`) REFERENCES variable(`id`)
);

-- SPELLS' VARIABLES
-- One spell can have multiple ingredients
CREATE TABLE IF NOT EXISTS `spell_ingredient` (
    `spell_id` INT UNSIGNED NOT NULL,
    `ingredient_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`spell_id`, `ingredient_id`),
    FOREIGN KEY(`spell_id`) REFERENCES spell(`id`),
    FOREIGN KEY(`ingredient_id`) REFERENCES ingredient(`id`)
);

-- ROLES' PERMISSIONS
-- One role can have any number of permissions, or none at all
CREATE TABLE IF NOT EXISTS `role_permission` (
    `role_id` INT UNSIGNED NOT NULL,
    `permission_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`role_id`, `permission_id`),
    FOREIGN KEY(`role_id`) REFERENCES role(`id`),
    FOREIGN KEY(`permission_id`) REFERENCES permission(`id`)
);

-- Ajout d`une nouvelle ligne avant l`insert de description
DELIMITER $$
CREATE TRIGGER `multiLine` BEFORE INSERT ON `spell` FOR EACH ROW
BEGIN
    SET NEW.description = replace(NEW.description, "<l>", "\n");
END$$
DELIMITER ;

/* =========== PRIMARY INSERTS =========== */
SET NAMES utf8;
USE auracle;

-- ROLES
INSERT INTO `role` (name, description) VALUES
("Visiteur", "Utilisateur normal, peut consulter les sorts."),
("Scribe", "Gardiens des écrits, les scribes sont capables de soumettre des sortilèges."),
("Arcanologue", "Maîtres de l'arcane, ils ont le pouvoir et la responsabilité de juger les sortilèges récents et de les supprimer, ou valider."),
("Augure", "Régents des grimoires, ils ont droit d'accès à l'intégralité des informations connues, et pouvoir absolu sur le savoir arcanique.");

-- PERMISSIONS
INSERT INTO `permission` (slug) VALUES
("SUBMIT_SPELLS"),
("APPROVE_SPELLS"),
("MODIFY_SPELLS"),
("DELETE_SPELLS"),
("WARN_USERS"),
("BAN_USERS");

INSERT INTO `role_permission` (role_id, permission_id) VALUES
(2, 1),
(3, 1),
(3, 2),
(3, 3),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6);

-- USERS
INSERT INTO `user` (uuid, name, mail, avatar, gender, register_date, password, role_id, verified, banned) VALUES
("08e5d2cf-3f0b-454f-b03f-504350d6be85", "Izàc", "tymos@ambrose.edu", null, null, "2020-12-27 17:47:02", "$2b$10$8KWGfRmdQ/ya32fROZNrWugXIEOciDaZwLz.3.GzQa5xrJaGF9RP2", 4, 1, 0);

-- META SCHOOLS
INSERT INTO `meta_school` (name, description) VALUES
("Magies blanches", "Magies disciplinant les arts de soins et de lumières."),
("Magies noires", "Magies disciplinant l'art de la mort et des secrets."),
("Magies élémentaires", "Magies disciplinant les éléments basiques tels que l'eau, la foudre et le feu, pour n'en citer que les plus populaires."),
("Magies spirituelles", "Magies disciplinant l'esprit, tant pour le défendre que l'attaquer."),
("Magies spatio-temporelles", "Magies régissant le temps et l'espace."),
("Magies affiliées", "Magies rattachées à une forme d'énergie magique particulière."),
("Magies autres", "Magies trop spécifiques et ne rentrant dans aucune autre grande école.");

-- Insertions de masses
DELIMITER $$
CREATE PROCEDURE insertIntoSchoolRange(IN delimiter_start INT, IN delimiter_end INT, IN id_school INT)
BEGIN
    SET @i = delimiter_start;
    WHILE @i <= delimiter_end DO
        INSERT INTO spell_school (spell_id, school_id) VALUES (@i, id_school);
        SET @i = @i + 1;
    END WHILE;
END$$
DELIMITER ;

CALL insertIntoSchoolRange(1, 33, 1);
CALL insertIntoSchoolRange(34, 67, 2);
CALL insertIntoSchoolRange(68, 90, 3);
CALL insertIntoSchoolRange(91, 119, 4);
CALL insertIntoSchoolRange(120, 135, 5);
CALL insertIntoSchoolRange(136, 139, 6);
CALL insertIntoSchoolRange(140, 165, 7);
CALL insertIntoSchoolRange(166, 195, 8);
CALL insertIntoSchoolRange(196, 222, 9);
CALL insertIntoSchoolRange(223, 247, 10);
CALL insertIntoSchoolRange(248, 252, 11);
CALL insertIntoSchoolRange(253, 274, 12);
CALL insertIntoSchoolRange(275, 292, 13);
CALL insertIntoSchoolRange(293, 312, 14);
CALL insertIntoSchoolRange(313, 323, 15);
CALL insertIntoSchoolRange(324, 343, 16);
CALL insertIntoSchoolRange(344, 364, 17);
CALL insertIntoSchoolRange(365, 366, 18);
CALL insertIntoSchoolRange(367, 383, 19);
CALL insertIntoSchoolRange(384, 385, 20);
CALL insertIntoSchoolRange(386, 403, 21);
CALL insertIntoSchoolRange(404, 435, 22);
CALL insertIntoSchoolRange(436, 438, 23);
CALL insertIntoSchoolRange(439, 443, 24);
CALL insertIntoSchoolRange(444, 455, 25);
CALL insertIntoSchoolRange(456, 462, 26);
