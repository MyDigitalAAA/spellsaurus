DROP DATABASE IF EXISTS spellsaurus;
CREATE DATABASE spellsaurus CHARACTER SET utf8 COLLATE utf8_bin;
USE spellsaurus;

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
    `id_meta_school` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`id_meta_school`) REFERENCES meta_school(`id`)
);

/* COMMON INGREDIENTS */
CREATE TABLE IF NOT EXISTS `ingredient` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL DEFAULT "Langue de salamandre",
    PRIMARY KEY (`id`)
);

/* COMMON VARIABLES */
CREATE TABLE IF NOT EXISTS `variable` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL DEFAULT "Nombre de créatures affectées",
    PRIMARY KEY (`id`)
);

/* ==== USER TABLES ==== */

-- CREATE TABLE IF NOT EXISTS `user` (
--     `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--     `name` VARCHAR(255) NOT NULL DEFAULT "Disciple",
--     `mail` VARCHAR(255) NOT NULL,
--     `password` VARCHAR(255) NOT NULL,
--     PRIMARY KEY(`id`)
-- )

/* ==== ASSOCIATION TABLES ==== */

/* SPELLS' SCHOOLS */
/* One spell can have multiple (up to 3) schools */
CREATE TABLE IF NOT EXISTS `spells_schools` (
    `id_spell` INT UNSIGNED NOT NULL,
    `id_school` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id_spell`, `id_school`),
    FOREIGN KEY(`id_spell`) REFERENCES spell(`id`),
    FOREIGN KEY(`id_school`) REFERENCES school(`id`)
);

/* SPELLS' VARIABLES */
/* One spell can have multiple (up to 2) variables of cost */
CREATE TABLE IF NOT EXISTS `spells_variables` (
    `id_spell` INT UNSIGNED NOT NULL,
    `id_variable` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id_spell`, `id_variable`),
    FOREIGN KEY(`id_spell`) REFERENCES spell(`id`),
    FOREIGN KEY(`id_variable`) REFERENCES variable(`id`)
);

/* SPELLS' VARIABLES */
/* One spell can have multiple ingredients */
CREATE TABLE IF NOT EXISTS `spells_ingredients` (
    `id_spell` INT UNSIGNED NOT NULL,
    `id_ingredient` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id_spell`, `id_ingredient`),
    FOREIGN KEY(`id_spell`) REFERENCES spell(`id`),
    FOREIGN KEY(`id_ingredient`) REFERENCES ingredient(`id`)
);
