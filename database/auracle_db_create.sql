DROP DATABASE IF EXISTS auracle;
CREATE DATABASE auracle CHARACTER SET utf8 COLLATE utf8_bin;
USE auracle;

/* ==== PRIMARY TABLES ==== */

/* SPELLS */
CREATE TABLE IF NOT EXISTS `spell` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT 'Nom du sort',
    `description` VARCHAR(1000) NOT NULL DEFAULT "Description du sort",
    `level` INT UNSIGNED DEFAULT 0,
    `charge` INT UNSIGNED DEFAULT 0,
    `cost` VARCHAR(255) DEFAULT "0",
    `is_ritual` BOOLEAN DEFAULT false,
    PRIMARY KEY (`id`)
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
    `description` VARCHAR(255) NOT NULL DEFAULT "Une langue de salamandre de feu qui bouge encore un peu.",
    PRIMARY KEY (`id`)
);

/* COMMON VARIABLES */
CREATE TABLE IF NOT EXISTS `variable` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL DEFAULT "Nombre de créatures affectées",
    PRIMARY KEY (`id`)
);

/* ==== USER TABLES ==== */

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Disciple",
    `mail` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `banned` BOOLEAN DEFAULT false,
    PRIMARY KEY(`id`)
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
