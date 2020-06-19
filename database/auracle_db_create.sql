DROP DATABASE IF EXISTS auracle;
CREATE DATABASE auracle CHARACTER SET utf8 COLLATE utf8_bin;
USE auracle;

/* =========== PRIMARY TABLES =========== */

/* PERMISSIONS */
CREATE TABLE IF NOT EXISTS `role` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

/* USERS */
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Disciple",
    `mail` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role_id` INT UNSIGNED NOT NULL DEFAULT 1,
    `verified` BOOLEAN DEFAULT false,
    `banned` BOOLEAN DEFAULT false,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`role_id`) REFERENCES role(`id`)
);

/* SPELLS */
CREATE TABLE IF NOT EXISTS `spell` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Nom du sort",
    `description` VARCHAR(1000) NOT NULL DEFAULT "Description du sort",
    `level` INT UNSIGNED DEFAULT 0,
    `charge` INT UNSIGNED DEFAULT 0,
    `cost` VARCHAR(255) DEFAULT "0",
    `is_ritual` BOOLEAN DEFAULT false,
    `published` BOOLEAN DEFAULT true,
    `public` BOOLEAN DEFAULT true,
    `author_id` INT UNSIGNED NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`author_id`) REFERENCES user(`id`)
);

/* META SCHOOLS */
CREATE TABLE IF NOT EXISTS `meta_school` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Nom de l'école mère",
    `description` VARCHAR(255) DEFAULT "Description de l'école mère",
    PRIMARY KEY (`id`)
);

/* SCHOOLS */
CREATE TABLE IF NOT EXISTS `school` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Nom de l'école",
    `description` VARCHAR(255) DEFAULT "Description de l'école",
    `meta_school_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`meta_school_id`) REFERENCES meta_school(`id`)
);

/* COMMON INGREDIENTS */
CREATE TABLE IF NOT EXISTS `ingredient` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Langue de salamandre",
    `description` VARCHAR(255) NOT NULL DEFAULT "Une langue de salamandre de feu encore chaude.",
    PRIMARY KEY (`id`)
);

/* COMMON VARIABLES */
CREATE TABLE IF NOT EXISTS `variable` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL DEFAULT "Nombre de créatures affectées",
    PRIMARY KEY (`id`)
);

/* ==== ASSOCIATION TABLES ==== */

/* SPELLS' SCHOOLS */
/* One spell can have multiple (up to 3) schools */
CREATE TABLE IF NOT EXISTS `spell_school` (
    `spell_id` INT UNSIGNED NOT NULL,
    `school_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`spell_id`, `school_id`),
    FOREIGN KEY(`spell_id`) REFERENCES spell(`id`),
    FOREIGN KEY(`school_id`) REFERENCES school(`id`)
);

/* SPELLS' VARIABLES */
/* One spell can have multiple (up to 2) variables of cost */
CREATE TABLE IF NOT EXISTS `spell_variable` (
    `spell_id` INT UNSIGNED NOT NULL,
    `variable_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`spell_id`, `variable_id`),
    FOREIGN KEY(`spell_id`) REFERENCES spell(`id`),
    FOREIGN KEY(`variable_id`) REFERENCES variable(`id`)
);

/* SPELLS' VARIABLES */
/* One spell can have multiple ingredients */
CREATE TABLE IF NOT EXISTS `spell_ingredient` (
    `spell_id` INT UNSIGNED NOT NULL,
    `ingredient_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`spell_id`, `ingredient_id`),
    FOREIGN KEY(`spell_id`) REFERENCES spell(`id`),
    FOREIGN KEY(`ingredient_id`) REFERENCES ingredient(`id`)
);

/* Ajout d'une nouvelle ligne avant l'insert de description */
DELIMITER $$
CREATE TRIGGER `multiLine` BEFORE INSERT ON `spell` FOR EACH ROW
BEGIN
    SET NEW.description = replace(NEW.description, '<l>', '\n');
END$$
DELIMITER ;



/* =========== PRIMARY INSERTS =========== */
SET NAMES utf8;
USE auracle;

-- PERMISSIONS
INSERT INTO `role` (name, description) VALUES
('Visiteur', "Utilisateur normal, peut consulter les sorts."),
('Scribe', "Gardiens des écrits, est capable de modifier et d'ajouter des sorts."),
('Arcanologue', "Maîtres de l'arcane, ils ont le pouvoir et la responsabilité de juger les sortilèges récents et de les supprimer, ou valider."),
('Augure', "Régents des grimoires, ils ont droit d'accès à l'intégralité des informations connues, et pouvoir absolu sur le savoir arcanique.");

-- USERS
INSERT INTO `user` (name, mail, password, role_id) VALUES
('Izàc Tymos', 'tymos@ambrose.edu', 'root', 4);

-- META SCHOOLS
INSERT INTO `meta_school` (name, description) VALUES
('Magies blanches', 'Magies disciplinant les arts de soins et de lumières.'),
('Magies noires', 'Magies disciplinant l\'art de la mort et des secrets.'),
('Magies élémentaires', 'Magies disciplinant les éléments basiques tels que l\'eau, la foudre et le feu, pour n\'en citer que les plus populaires.'),
('Magies spirituelles', 'Magies disciplinant l\'esprit, tant pour le défendre que l\'attaquer.'),
('Magies spatio-temporelles', 'Magies régissant le temps et l\'espace.'),
('Magies affiliées', 'Magies rattachées à une forme d\'énergie magique particulière.'),
('Magies autres', 'Magies trop spécifiques et ne rentrant dans aucune autre grande école.');

-- SCHOOLS
INSERT INTO `school` (name, description, meta_school_id) VALUES
('Lumomancie', 'Discipline arcanique de la lumière.', 1),
('Vitamancie', 'Discipline arcanique de la guérison et de l\'énergie vitale.', 1),
('Obstrumancie', 'Discipline arcanique de la protection et des sceaux.', 1),
('Tenebromancie', 'Discipline arcanique de la lumière.', 2),
('Necromancie', 'Discipline arcanique de la mort.', 2),
('Morbomancie', 'Discipline arcanique des maladies et malédictions.', 2),
('Pyromancie', 'Discipline arcanique du feu.', 3),
('Hydromancie', 'Discipline arcanique de l\'eau.', 3),
('Electromancie', 'Discipline arcanique de la foudre.', 3),
('Terramancie', 'Discipline arcanique de la terre.', 3),
('Sidéromancie', 'Discipline arcanique des métaux rares et précieux.', 3),
('Caelomancie', 'Discipline arcanique de l\'air.', 3),
('Légimancie', 'Discipline arcanique de la lecture et du contrôle spirituel.', 4),
('Illusiomancie', 'Discipline arcanique des illusions.', 4),
('Cruciomancie', 'Discipline arcanique de la destruction spirituelle.', 4),
('Chronomancie', 'Discipline arcanique du temps.', 5),
('Spatiomancie', 'Discipline arcanique de l\'espace.', 5),
('Kénomancie', 'Discipline arcanique du néant.', 6),
('Lutomancie', 'Discipline arcanique des abysses.', 6),
('Échomancie', 'Discipline arcanique de la résolution animique.', 6),
('Protomancie', 'Discipline arcanique de la magie pure.', 7),
('Rebumancie', 'Discipline arcanique de la lumière.', 7),
('Vocamancie', 'Discipline arcanique de la lumière.', 7),
('Somamancie', 'Discipline arcanique de la maîtrise corporelle.', 7),
('Antimancie', 'Discipline arcanique de l\'annulation arcanique.', 7);

-- INGREDIENTS
INSERT INTO `ingredient` (name, description) VALUES
('Volonté', 'La force de volonté du lanceur, concentrée sur un objectif'),
('Geste', 'Un geste précis facilitant la canalisation magique');

-- VARIABLES
INSERT INTO `variable` (description) VALUES
('Nombre de personnes soignées');