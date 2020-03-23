-- SPELLS
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

-- META SCHOOLS
INSERT INTO `meta_school` VALUES (1, 'Magies blanches', 'Magies disciplinant les arts de soins et de lumières.');
INSERT INTO `meta_school` VALUES (2, 'Magies noires', 'Magies disciplinant l\'art de la mort et des secrets.');
INSERT INTO `meta_school` VALUES (3, 'Magies élémentaires', 'Magies disciplinant les éléments basiques tels que l\'eau, la foudre et le feu, pour n\'en citer que les plus populaires.');
INSERT INTO `meta_school` VALUES (4, 'Magies spirituelles', 'Magies disciplinant l\'esprit, tant pour le défendre que l\'attaquer.');
INSERT INTO `meta_school` VALUES (5, 'Magies spatio-temporelles', 'Magies régissant le temps et l\'espace.');
INSERT INTO `meta_school` VALUES (6, 'Magies affiliées', 'Magies rattachées à une forme d\'énergie magique particulière.');
INSERT INTO `meta_school` VALUES (7, 'Magies autres', 'Magies trop spécifiques et ne rentrant dans aucune autre grande école.');

-- SCHOOLS
INSERT INTO `school` VALUES (1, 'Lumomancie', 'Discipline arcanique de la lumière.', 1);
INSERT INTO `school` VALUES (2, 'Vitamancie', 'Discipline arcanique de la guérison et de l\'énergie vitale.', 1);
INSERT INTO `school` VALUES (3, 'Obstrumancie', 'Discipline arcanique de la protection et des sceaux.', 1);
INSERT INTO `school` VALUES (4, 'Tenebromancie', 'Discipline arcanique de la lumière.', 2);
INSERT INTO `school` VALUES (5, 'Necromancie', 'Discipline arcanique de la mort.', 2);
INSERT INTO `school` VALUES (6, 'Morbomancie', 'Discipline arcanique des maladies et malédictions.', 2);
INSERT INTO `school` VALUES (7, 'Pyromancie', 'Discipline arcanique du feu.', 3);
INSERT INTO `school` VALUES (8, 'Hydromancie', 'Discipline arcanique de l\'eau.', 3);
INSERT INTO `school` VALUES (9, 'Electromancie', 'Discipline arcanique de la foudre.', 3);
INSERT INTO `school` VALUES (10, 'Terramancie', 'Discipline arcanique de la terre.', 3);
INSERT INTO `school` VALUES (11, 'Caelomancie', 'Discipline arcanique de l\'air.', 3);
INSERT INTO `school` VALUES (12, 'Légimancie', 'Discipline arcanique de la lecture et du contrôle spirituel.', 4);
INSERT INTO `school` VALUES (13, 'Illusiomancie', 'Discipline arcanique des illusions.', 4);
INSERT INTO `school` VALUES (14, 'Cruciomancie', 'Discipline arcanique de la destruction spirituelle.', 4);
INSERT INTO `school` VALUES (15, 'Chronomancie', 'Discipline arcanique du temps.', 5);
INSERT INTO `school` VALUES (16, 'Spatiomancie', 'Discipline arcanique de l\'espace.', 5);
INSERT INTO `school` VALUES (17, 'Kénomancie', 'Discipline arcanique du néant.', 6);
INSERT INTO `school` VALUES (18, 'Lutomancie', 'Discipline arcanique des abysses.', 6);
INSERT INTO `school` VALUES (19, 'Échomancie', 'Discipline arcanique de la résolution animique.', 6);
INSERT INTO `school` VALUES (20, 'Protomancie', 'Discipline arcanique de la magie pure.', 7);
INSERT INTO `school` VALUES (21, 'Rebumancie', 'Discipline arcanique de la lumière.', 7);
INSERT INTO `school` VALUES (22, 'Vocamancie', 'Discipline arcanique de la lumière.', 7);
INSERT INTO `school` VALUES (23, 'Somamancie', 'Discipline arcanique de la maîtrise corporelle.', 7);
INSERT INTO `school` VALUES (24, 'Antimancie', 'Discipline arcanique de l\'annulation arcanique.', 7);

-- INGREDIENTS
INSERT INTO `ingredient` VALUES (1, 'Volonté');
INSERT INTO `ingredient` VALUES (2, 'Geste');

-- VARIABLES
INSERT INTO `variable` VALUES (1, 'Nombre de personnes soignées');

-- ASSOCIATIONS - SPELLS / SCHOOLS