DROP DATABASE IF EXISTS spellsaurus;
CREATE DATABASE spellsaurus CHARACTER SET utf8 COLLATE utf8_bin;
USE spellsaurus;

/* ==== PRIMARY TABLES ==== */

/* SPELLS */
CREATE TABLE IF NOT EXISTS `spell` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `level` INT UNSIGNED,
    `charge` INT UNSIGNED,
    `cost` VARCHAR(255),
    `is_ritual` BOOLEAN,
    PRIMARY KEY (`id`)
);

/* META SCHOOLS */
CREATE TABLE IF NOT EXISTS `meta_school` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),
    PRIMARY KEY (`id`)
);

/* SCHOOLS */
CREATE TABLE IF NOT EXISTS `school` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),
    `id_meta_school` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`id_meta_school`) REFERENCES meta_school(`id`)
);

/* COMMON INGREDIENTS */
CREATE TABLE IF NOT EXISTS `ingredient` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

/* COMMON VARIABLES */
CREATE TABLE IF NOT EXISTS `variable` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);


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
