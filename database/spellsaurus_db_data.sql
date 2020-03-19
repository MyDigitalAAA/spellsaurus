INSERT INTO `spell` VALUES (1, 'Soleil Pourri', 'Le lanceur projette un petit astre vert jusqu’à 20m autour de lui. L’astre brûle l’air environnant, nécrosant rapidement les formes de vies dans un rayon de 100m. Toutes les créatures dans la portée de l’astre (sauf le lanceur) doivent réussir un jet de CON avec un malus de -30. Si elles échouent, elles subissent 3D20 dégâts radiants et 2D20 dégâts nécrotiques. Elles perdent également 1D10 PV max.', 30, 2, "-90");
INSERT INTO `spell` VALUES (2, 'Œil de Sotana', 'Donne au lanceur une vision thermique des 5 mètres alentours permettant de voir la force vitale des créatures conscientes environnantes. Plus une forme apparait clairement au lanceur, plus elle est en bonne santé.', 10, 0, "-15x");

INSERT INTO `spell` VALUES (3, 'Guérison I', 'Rend 2D4+4 PV, soigne les contusions légères et blessures superficielles.', 0, 0, "0");
INSERT INTO `spell` VALUES (4, 'Guérison II', 'Rend 2D6+6 PV, soigne les blessures mineures.', 0, 0, "-10");
INSERT INTO `spell` VALUES (5, 'Guérison III', 'Rend 2D10+10 PV, soigne les blessures profondes.', 0, 0, "-20");
INSERT INTO `spell` VALUES (6, 'Guérison IV', 'Rend 2D20+20 PV, soigne les blessures graves et stoppe les hémorragies.', 0, 0, "-40");
INSERT INTO `spell` VALUES (7, 'Thaumaturgie', 'Débordant d’altruisme, le lanceur canalise l’arcane autour de lui afin de panser les blessures d’une créature. La créature ciblée regagne 3D20+30 PV. Ses blessures graves se guérissent instantannément et toute hémorragie cesse. Si la cible se trouvait dans un état de mort imminente, elle est considérée comme stabilisée.', 20, 1, "-60");

INSERT INTO `spell` VALUES (8, 'Guérison collective I', 'Rend 1D4+4 PV à plusieurs créatures, soigne les contusions légères et blessures superficielles.', 0, 0, "-2x");
INSERT INTO `spell` VALUES (9, 'Guérison collective II', 'Rend 1D6+6 PV à plusieurs créatures, soigne les blessures mineures.', 0, 0, "-10");
INSERT INTO `spell` VALUES (10, 'Guérison collective III', 'Rend 1D10+10 PV à plusieurs créatures, soigne les blessures profondes.', 0, 0, "-20");
INSERT INTO `spell` VALUES (11, 'Guérison collective IV', 'Rend 1D20+20 PV à plusieurs créatures, soigne les blessures graves et stoppe les hémorragies.', 0, 0, "-40");
INSERT INTO `spell` VALUES (12, 'Polythurgie', 'Le lanceur transmet de l\'énergie vitale pure à plusieurs créatures. Elles regagnent 3D10+30 PV et leurs hémorragies graves s\'estompent. Si les cibles se trouvaient dans un état de mort imminente, elles sont considérées comme stabilisées.', 20, 1, "-60");

INSERT INTO `spell` VALUES (13, 'Fanisy', 'Déplace le lanceur à travers le temps, lui permettant d`\'accéder à des époques passées ou futures. Il est plus difficile d\'accéder au passé qu\'au futur. Si le lanceur modifie un point temporel fixe qui se répercute de manière significative sur le reste de la ligne temporelle, il subit 5D10 dégâts bruts ignorants l\'armure inesquivables par tour où le point fixe temporel à été altéré.', 60, 2, "?");

/* INGREDIENTS */
INSERT INTO `ingredient` VALUES (1, 'Volonté');
INSERT INTO `ingredient` VALUES (2, 'Geste');

/* VARIABLES */
INSERT INTO `variable` VALUES (1, 'Nombre de personnes soignées');
