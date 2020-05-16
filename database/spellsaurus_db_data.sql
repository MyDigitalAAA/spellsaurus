SET NAMES utf8;
USE spellsaurus;

-- META SCHOOLS
INSERT INTO `meta_school` VALUES
(1, 'Magies blanches', 'Magies disciplinant les arts de soins et de lumières.'),
(2, 'Magies noires', 'Magies disciplinant l\'art de la mort et des secrets.'),
(3, 'Magies élémentaires', 'Magies disciplinant les éléments basiques tels que l\'eau, la foudre et le feu, pour n\'en citer que les plus populaires.'),
(4, 'Magies spirituelles', 'Magies disciplinant l\'esprit, tant pour le défendre que l\'attaquer.'),
(5, 'Magies spatio-temporelles', 'Magies régissant le temps et l\'espace.'),
(6, 'Magies affiliées', 'Magies rattachées à une forme d\'énergie magique particulière.'),
(7, 'Magies autres', 'Magies trop spécifiques et ne rentrant dans aucune autre grande école.');

-- SCHOOLS
INSERT INTO `school` VALUES
(1, 'Lumomancie', 'Discipline arcanique de la lumière.', 1),
(2, 'Vitamancie', 'Discipline arcanique de la guérison et de l\'énergie vitale.', 1),
(3, 'Obstrumancie', 'Discipline arcanique de la protection et des sceaux.', 1),
(4, 'Tenebromancie', 'Discipline arcanique de la lumière.', 2),
(5, 'Necromancie', 'Discipline arcanique de la mort.', 2),
(6, 'Morbomancie', 'Discipline arcanique des maladies et malédictions.', 2),
(7, 'Pyromancie', 'Discipline arcanique du feu.', 3),
(8, 'Hydromancie', 'Discipline arcanique de l\'eau.', 3),
(9, 'Electromancie', 'Discipline arcanique de la foudre.', 3),
(10, 'Terramancie', 'Discipline arcanique de la terre.', 3),
(11, 'Caelomancie', 'Discipline arcanique de l\'air.', 3),
(12, 'Légimancie', 'Discipline arcanique de la lecture et du contrôle spirituel.', 4),
(13, 'Illusiomancie', 'Discipline arcanique des illusions.', 4),
(14, 'Cruciomancie', 'Discipline arcanique de la destruction spirituelle.', 4),
(15, 'Chronomancie', 'Discipline arcanique du temps.', 5),
(16, 'Spatiomancie', 'Discipline arcanique de l\'espace.', 5),
(17, 'Kénomancie', 'Discipline arcanique du néant.', 6),
(18, 'Lutomancie', 'Discipline arcanique des abysses.', 6),
(19, 'Échomancie', 'Discipline arcanique de la résolution animique.', 6),
(20, 'Protomancie', 'Discipline arcanique de la magie pure.', 7),
(21, 'Rebumancie', 'Discipline arcanique de la lumière.', 7),
(22, 'Vocamancie', 'Discipline arcanique de la lumière.', 7),
(23, 'Somamancie', 'Discipline arcanique de la maîtrise corporelle.', 7),
(24, 'Antimancie', 'Discipline arcanique de l\'annulation arcanique.', 7);

-- SPELLS
/*
SCHEMA
(id, name, description, level, charge, cost),
*/

-- LIGHT SPELLS
/* 1 to 99 - Light spells */
INSERT INTO `spell` VALUES
(1, 'Rayon prismatique I', 'Un petit rayon étincelant est émis de la paume du lanceur. Ce dernier peut rebondir sur les surfaces réfléchissantes. S’il percute une créature, elle subit 6+2D6 dégâts radiants.', 0, 0, '0', false),
(2, 'Rayon prismatique II', 'Un rayon étincelant est émis de la paume du lanceur. Ce dernier peut rebondir sur les surfaces réfléchissantes. S’il percute une créature, elle subit 15+2D6 dégâts radiants.', 0, 0, '-20', false),
(3, 'Rayon prismatique III', 'Un grand rayon étincelant est émis de la paume du lanceur. Ce dernier peut rebondir sur les surfaces réfléchissantes. S’il percute une créature, elle subit 25+2D6 dégâts radiants.', 0, 0, '-40', false),
(4, 'Laser prismatique', 'Les mains du lanceur s’illuminent d’une intense aura blanche. Après un tour de canalisation, il projette  un énorme laser blanc de sa paume dans une direction unique, infligeant 30+1D20+2D6  dégâts radiants aux créatures sur sa trajectoire. Le laser peut rebondir sur les surfaces réfléchissantes.', 20, 1, '-60', false),

(5, 'Globe lumineux', 'Le lanceur manifeste un petit globe de lumière autour de lui. La lumière dégagée par ce globe éclaire sur une portée initiale de 5m, mais peut être augmentée suivant la puissance du sort. Le lanceur garde un contrôle sur cette sphère, qu’il peut déplacer en conséquence.', 0, 0, '-10x', false),
(6, 'Globule de vérité', 'Le lanceur concentre son arcane en un globule de lumière bleue qui flottille autour de lui. Ce dernier, en plus d’être une source de lumière considérable, permet de disperser la magie d’illusion. Le lanceur manifeste un globe de lumière magique éclairant sur 5m autour de lui. Permet de voir les objets et créatures cachés par magie et de percer les illusions.', 10, 0, '-25x', false),

(7, 'Vision nocturne', 'Le lanceur octroie à lui-même ou bien à une créature qu’il touche une vision nettement améliorée dans l’obscurité pendant 1D3 tours.', 0, 0, '-20', false),
(8, 'Œil de Lystos', 'Le lanceur octroie à lui-même ou bien à une créature qu’il touche le statut «Clairvoyant» pendant 1D3 tours. Elle gagne une vision nettement améliorée dans l’obscurité ainsi qu’un avantage pour percevoir à travers la pénombre magique et les illusions.', 10, 0, '-40', false),
(9, 'Illumination', 'Par le toucher, le lanceur octroie à un petit objet une luminosité de faible intensité, semblable à la lumière vacillante d’une bougie.', 0, 0, '+20', false),

(10, 'Lumière aveuglante', 'Le lanceur, en claquant des doigts, produit un bref flash de lumière devant une cible, l’aveuglant pendant 1D2 tours.', 0, 0, '0', false),
(11, 'Irradiation', 'Le lanceur s’illumine instantanément pendant une fraction de seconde, aveuglant toutes les créatures le regardant dans un rayon de 10m pendant 1D2 tours.', 10, 0, '-25', false),

(12, 'Lystos I', 'Le lanceur, en se concentrant sur l’image de Lystos dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D5+5 dégâts radiants ignorant l\'armure en dégageant une aura brûlante. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -15.', 0, 0, '0', false),
(13, 'Lystos II', 'Le lanceur, en se concentrant sur l’image de Lystos dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D8+8 dégâts radiants ignorant l\'armure en dégageant une aura brûlante. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -30.', 0, 0, '-20', false),
(14, 'Lystos III', 'Le lanceur, en se concentrant sur l’image de Lystos dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D10+10 dégâts radiants ignorant l\'armure en dégageant une aura brûlante. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -45.', 0, 0, '-40', false),
(15, 'Paradigme Lystonien', 'Le lanceur s’imprègne de l’image de Lystos, et la concentre dans son esprit. Son sceau, entouré de plusieurs petits sceaux, se manifestent sous un petit groupe de cibles. Ces dernières sont brûlées par la lumière se dégageant des emblèmes, et subissent 2D20+20 dégâts radiants ignorant l\'armure. Une énergie divine mystérieuse pénètre l’esprit des cibles, ralentissant leurs mouvements et drainant leur volonté. Toute tentative d’esquive subit un malus de -60.', 15, 1, '-60', false),

(16, 'Corps luminescent', 'Le lanceur transmute une partie plus ou moins grande de son corps en énergie luminescente, lui permettant de s’en servir comme extension ou comme arme. La partie transmutée permet de passer à travers les objets et surfaces peu épaisses.', 0, 0, '?', false),

(17, 'Jugement lumineux', 'Le corps du lanceur brille d’une aura blanche tandis qu’il manifeste une guillotine de lumière au niveau du cou d’une cible unique. La lame de lumière passe au travers de sa gorge et lui réduit ses PV de moitié.', 20, 0, '-80', false),

(18, 'Étoile de l\'aube', 'Une sphère de lumière initialement pâle, puis très lumineuse, se manifeste à 20m du sol et du lanceur. Au deuxième tour de canalisation, elle s’abat au sol dans une explosion iridescente, soufflant toutes les créatures dans un rayon de 20m, leur infligeant 60+3D12+3D6 dégâts radiants.', 25, 2, '-120', false),

(19, 'Lumière pourrie I', 'Le lanceur conjure une orbe lumineuse verdâtre jusqu’à 5m autour de lui. Cette dernière, au rythme de ses palpitations, projette des rayons brûlants dans toutes les directions autour d’elle dans un rayon de 20m. Toutes les créatures à découvert dans un rayon de 20m de la sphère (sauf le lanceur) doivent réussir un jet de DEX. Si elles échouent, elles subissent 2D10 dégâts radiants et 1D10 dégâts nécrotiques. Elles perdent également 1D6 PV max.', 20, 0, '-30', false),
(20, 'Lumière pourrie II', 'Le lanceur conjure une orbe lumineuse verdâtre jusqu’à 5m autour de lui. Cette dernière, au rythme de ses palpitations, projette des rayons brûlants dans toutes les directions autour d’elle dans un rayon de 20m. Toutes les créatures à découvert dans un rayon de 30m de la sphère (sauf le lanceur) doivent réussir un jet de DEX. Si elles échouent, elles subissent 2D20 dégâts radiants et 1D20 dégâts nécrotiques. Elles perdent également 1D8 PV max.', 20, 0, '-50', false),
(21, 'Lumière pourrie III', 'Le lanceur conjure une orbe lumineuse verdâtre jusqu’à 5m autour de lui. Cette dernière, au rythme de ses palpitations, projette des rayons brûlants dans toutes les directions autour d’elle dans un rayon de 20m. Toutes les créatures à découvert dans un rayon de 50m de la sphère (sauf le lanceur) doivent réussir un jet de DEX. Si elles échouent, elles subissent 2D20 dégâts radiants et 2D20 dégâts nécrotiques. Elles perdent également 1D10 PV max.', 25, 0, '-70', false),
(22, 'Soleil pourri', 'Le lanceur projette un petit astre vert jusqu’à 20m autour de lui. L’astre brûle l’air environnant, nécrosant rapidement les formes de vies dans un rayon de 100m. Toutes les créatures dans la portée de l’astre (sauf le lanceur) doivent réussir un jet de CON avec un malus de -30. Si elles échouent, elles subissent 3D20 dégâts radiants et 2D20 dégâts nécrotiques. Elles perdent également 1D10 PV max.', 30, 2, '-90', false),

(23, 'Brisaube', 'Le lanceur insufle une arme qu\'il touche d\'une quantité phénoménale de magie lumineuse, de telle sorte à ce qu\'elle brille de milles feux. L\'arme inflige 2D20+1D12 dégâts radiants supplémentaires pendant 3 tours et inflige le statut "Brûlures solaires" pendant 1D4 tours si elle touche une créature.', 50, 0 , '-80', false),

(24, 'Consécration', 'Le lanceur conjure X sphères runiques dans un rayon de 40m autour de lui. Après un court instant, ces dernières explosent d\'une vive lumière blanche, infligeant 2D8+2D6 dégâts radiants aux créatures se trouvant à au moins 2m autour d\'elles.', 80, 0, '-15x', false),
(25, 'Apothéose', 'Un cercle runique apparait derrière le lanceur. Ce dernier manifeste des centaines de petits cristaux de lumière en son bord qui fondent sur les cibles dans le champ de vision du lanceur, infligeant 4D2*4D2 dégâts à chacune d\'entre elles.', 80, 1, '-100', false);

/* 100 to 199 - Heal spells */
INSERT INTO `spell` VALUES
(100, 'Guérison I', 'Rend 2D4+4 PV, soigne les contusions légères et blessures superficielles.', 0, 0, '0', false),
(101, 'Guérison II', 'Rend 2D6+6 PV, soigne les blessures mineures.', 0, 0, '-10', false),
(102, 'Guérison III', 'Rend 2D10+10 PV, soigne les blessures profondes.', 0, 0, '-20', false),
(103, 'Guérison IV', 'Rend 2D20+20 PV, soigne les blessures graves et stoppe les hémorragies.', 0, 0, '-40', false),
(104, 'Thaumaturgie', 'Débordant d’altruisme, le lanceur canalise l’arcane autour de lui afin de panser les blessures d’une créature. La créature ciblée regagne 3D20+30 PV. Ses blessures graves se guérissent instantannément et toute hémorragie cesse. Si la cible se trouvait dans un état de mort imminente, elle est considérée comme stabilisée.', 20, 1, '-60', false),

(105, 'Régénération I', 'Rend 1D4+2 PV pendant 3 tours à une créature, soigne les contusions légères et blessures superficielles.', 0, 0, '0', false),
(106, 'Régénération II', 'Rend 1D6+3 PV pendant 3 tours à une créatures, soigne les blessures mineures.', 0, 0, '-5', false),
(107, 'Régénération III', 'Rend 1D10+5 PV pendant 3 tours à une créature, soigne les blessures profondes.', 0, 0, '-15', false),
(108, 'Régénération IV', 'Rend 1D20+10 PV pendant 3 tours à une créature, soigne les blessures graves et stoppe les hémorragies.', 0, 0, '-30', false),
(109, 'Argaturgie', 'Le lanceur duplique sa force vitale afin de soigner sur la durée les blessures d\'une créature unique. Elle regagne 3D10+15 PV pendant 3 tours et soigne les blessures et ses hémorragies importantes.', 20, 1, '-50', false),

(110, 'Guérison collective I', 'Rend 1D4+4 PV à plusieurs créatures, soigne les contusions légères et blessures superficielles.', 0, 0, '-2x', false),
(111, 'Guérison collective II', 'Rend 1D6+6 PV à plusieurs créatures, soigne les blessures mineures.', 0, 0, '-5x', false),
(112, 'Guérison collective III', 'Rend 1D10+10 PV à plusieurs créatures, soigne les blessures profondes.', 0, 0, '-10x', false),
(113, 'Guérison collective IV', 'Rend 1D20+20 PV à plusieurs créatures, soigne les blessures graves et stoppe les hémorragies.', 0, 0, '-15x', false),
(114, 'Polythurgie', 'Le lanceur transmet de l\'énergie vitale pure à plusieurs créatures. Elles regagnent 3D10+30 PV et leurs hémorragies graves s\'estompent. Si les cibles se trouvaient dans un état de mort imminente, elles sont considérées comme stabilisées.', 20, 1, '-20x', false),

(115, 'Détoxication I', 'Renforce les défenses immunitaires d\'une créature et permet à son corps de se défendre contre un faible poison. Donne +10 CON au prochain jet contre ce dernier.', 0, 0, '0', false),
(116, 'Détoxication II', 'Renforce les défenses immunitaires d\'une créature et permet à son corps de se défendre contre un poison. Donne +20 CON aux 2 prochains jets contre ce dernier.', 0, 0, '-10', false),
(117, 'Détoxication III', 'Renforce grandement les défenses immunitaires d\'une créature et permet à son corps de se défendre contre un poison sévère. Donne +30 CON aux 2 prochains jets contre ce dernier.', 0, 0, '-30', false),
(118, 'Thératurgie', 'Renforce énormément les défenses immunitaires d\'une créature et permet au corps d\'expulser un poison mortel et puissant.', 20, 1, '-50', false),

(119, 'Détection de vie', 'Le lanceur peut déterminer la force vitale restante d\'une créature dans son champ de vision jusqu\'à 15m de distance.', 0, 0, '0', false),
(120, 'Œil de Sotana', 'Octroie au lanceur une vision thermique des 5 mètres alentours permettant de voir la force vitale des créatures conscientes environnantes. Plus une forme apparait clairement au lanceur, plus elle est en bonne santé.', 10, 0, '-15x', false),

(121, 'Filin de survie', 'Relie le corps du lanceur à celui d\'une autre créature par un filin de lumière blanche intangible. Les dégâts subis par les deux sont divisés et répartis équitablement pendant 3 tours.', 15, 0, '-30', false),

(122, 'Contre-mort', 'Le lanceur infuse une force vitale conséquente à une cible. Si elle reçoit une attaque fatale, elle conserve un unique point de vie à la place. L\'effet du sort dure une heure.', 15, 0, '-50', false),

(123, 'Sotana', 'En brûlant la moitié de ses PV max, le lanceur concentre sa volonté et son énergie vitale de manière à ramener à 1 PV une créature décédée depuis 2h maximum. Pour que ce sort se conclue, il faut impérativement que l\'âme de la créature ne soit ni détruite ni scellée, et que le lanceur soit en contact avec une partie du corps de la cible, ou une de ses possessions (qui sera consommée par le sort dans les deux cas)', 25, 0, '-80', false),
(124, 'Masotana', 'Le lanceur manifeste une zone d\'énergie vitale pure autour de lui sur environ 10m, empêchant à toutes les créatures dans cette zone de mourir pendant 5 tours. Les créatures peuvent toujours être incapacitées et ressentent la douleur, mais ne peuvent pas descendre en dessous de 1 PV.', 30, 1, '-100', false);

/* 200 to 299 - Protection spells */
INSERT INTO `spell` VALUES
(200, 'Bouclier arcanique I', 'Dresse une épaisse barrière d\'énergie magique autour d\'une ou plusieurs personnes, bloquant 15 points de dégâts.', 0, 0, '-10x', false),
(201, 'Bouclier arcanique II', 'Dresse une épaisse barrière d\'énergie magique autour d\'une ou plusieurs personnes, bloquant 30 points de dégâts.', 0, 0, '-20x', false),
(202, 'Bouclier arcanique III', 'Dresse une épaisse barrière d\'énergie magique autour d\'une ou plusieurs personnes, bloquant 60 points de dégâts.', 0, 0, '-40x', false),
(203, 'Isolation arcanique', 'Dresse une épaisse barrière d\'énergie magique pure autour d\'une ou plusieurs personnes, bloquant 100 points de dégâts.', 20, 0, '-60x', false),

(204, 'Bouclier étendu I', 'Conjure une unique barrière magique autour de plusieurs personnes, bloquant 50 points de dégâts avant de se briser.', 10, 0, '-30-10x', false),
(205, 'Bouclier étendu II', 'Conjure une unique barrière autour magique de plusieurs personnes, bloquant 90 points de dégâts avant de se briser.', 10, 0, '-50-10x', false),
(206, 'Barricades arcaniques', 'Conjure une unique épaisse barrière magique autour de plusieurs personnes, bloquant 120 points de dégâts avant de se briser.', 20, 0, '-70-10x', false),

(207, 'Barrière régénératrice I', 'Le lanceur dresse une barrière protectrice autour d\'une ou plusieurs créature(s), les protégeant de 20 points de dégâts. Les créatures affectées par ce sort regagnent 1D6 PV par tour tant que la barrière persiste.', 15, 0, '-20x', false),
(208, 'Barrière régénératrice II', 'Le lanceur dresse une barrière protectrice autour d\'une ou plusieurs créature(s), les protégeant de 40 points de dégâts. Les créatures affectées par ce sort regagnent 2D6 PV par tour tant que la barrière persiste.', 15, 0, '-40x', false),
(209, 'Cocon guérisseur', 'Le lanceur dresse une épaisse barrière protectrice brilliante autour d\'une ou plusieurs créature(s), les protégeant de 60 points de dégâts. Les créatures affectées par ce sort regagnent 3D8 PV par tour tant que la barrière persiste.', 20, 0, '-60x', false),

(210, 'Verrou arcanique I', 'Protège de manière magique un objet ouvrable (coffre, livre, etc...). L\'objet est scellé et ne peut plus s\'ouvrir, sauf sur volonté du lanceur. Résiste à 15 points de dégâts magiques. Une personne peut l\'ouvrir si elle inflige assez de dégâts au verrou, ou si elle réussi un jet d\'arcane avec un malus de 20.', 5, 0, '-15', false),
(211, 'Verrou arcanique II', 'Protège de manière magique un objet ouvrable (coffre, livre, etc...). L\'objet est scellé et ne peut plus s\'ouvrir, sauf sur volonté du lanceur. Résiste à 30 points de dégâts magiques. Une personne peut l\'ouvrir si elle inflige assez de dégâts au verrou, ou si elle réussi un jet d\'arcane avec un malus de 40.', 10, 0, '-30', false),
(212, 'Verrou arcanique III', 'Protège de manière magique un objet ouvrable (coffre, livre, etc...). L\'objet est scellé et ne peut plus s\'ouvrir, sauf sur volonté du lanceur. Résiste à 50 points de dégâts magiques. Une personne peut l\'ouvrir si elle inflige assez de dégâts au verrou, ou si elle réussi un jet d\'arcane avec un malus de 60.', 15, 0, '-50', false),
(213, 'Chaînes du souverain', 'Manifeste des chaînes blanches sur un objet (coffre, livre, etc...). L\'objet est scellé et ne peut plus s\'ouvrir, sauf sur volonté du lanceur. Les chaînes se dissipent et ne réapparaissent qu\'avec une tentative d\'effraction.  Résiste à 75 points de dégâts magiques. Une personne peut l\'ouvrir si elle inflige assez de dégâts au verrou, ou si elle réussi un jet d\'arcane avec un malus de 90.', 20, 1, '-75', false),

(214, 'Sceau des grands anciens', 'Au court d\'un rituel de canalisation intense et épuisant, le lanceur utilise toute l\'énergie magique de son corps et une partie de sa force vitale afin d\'isoler complètement une chose quelconque de l\'existence, la plaçant effectivement entre les dimensions et du temps. La force et la durabilité du sceau dépend de la force magique du lanceur. Pour un Dieu par exemple, le sceau dure environ 5000 ans. Le sceau n\'est pas indestructible, et est susceptible à l\'usure du temps, des attaques répétées, etc...', 99, 99, '?', true),
(215, 'Ascension', 'Réveille la partie de l\'âme scellée d\'une créature, l\'unifiant dans un seul corps, et lui permettant de maitriser l\'échomancie.', 99, 5, '?', false);

-- DARKNESS SPELLS
/* 300 to 399 - Shadow spells */
INSERT INTO `spell` VALUES
(300, 'Onde noire I', 'Projette une petite onde d\'énergie noire sur 5m autour du lanceur, infligeant 6+2D6 points de dégâts obscurs.', 0, 0, '0', false),
(301, 'Onde noire II', 'Projette une onde d\'énergie noire sur 10m autour du lanceur, infligeant 15+2D6 points de dégâts obscurs.', 0, 0, '-20', false),
(302, 'Onde noire III', 'Projette une vaste onde d\'énergie noire sur 20m autour du lanceur, infligeant 25+2D6 points de dégâts obscurs.', 0, 0, '-40', false),
(303, 'Vibrobscur', 'Projette une vague d\'énergie ténébreuse sur 40m autour du lanceur, infligeant 30+1D20+2D6 points de dégâts obscurs.', 20, 1, '-60', false),

(304, 'Ményl I', 'Le lanceur, en se concentrant sur la forme de Ményl dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D5+5 dégâts obscurs ignorant l\'armure en dégageant une aura glaciale. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -15.', 0, 0, '0', false),
(305, 'Ményl II', 'Le lanceur, en se concentrant sur la forme de Ményl dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D8+8 dégâts obscurs ignorant l\'armure en dégageant une aura glaciale. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -30.', 0, 0, '-20', false),
(306, 'Ményl III', 'Le lanceur, en se concentrant sur la forme de Ményl dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D10+10 dégâts obscurs ignorant l\'armure en dégageant une aura glaciale. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -45.', 0, 0, '-40', false),
(307, 'Vision Ménélienne', 'Le lanceur s’imprègne de l\'énergie de Ményl, et la concentre dans son esprit. Son sceau, entouré de plusieurs petits sceaux, se manifestent sous un petit groupe de cibles. Ces dernières sont brûlées de froid par les ténèbres se dégageant des emblèmes, et subissent 2D20+20 dégâts obscurs ignorant l\'armure. Une énergie divine mystérieuse pénètre l’esprit des cibles, ralentissant leurs mouvements et drainant leur volonté. Toute tentative d’esquive subit un malus de -60.', 15, 1, '-60', false),

(308, 'Corps sombre', 'Le lanceur transmute une partie plus ou moins grande de son corps en énergie ténébreuse, lui permettant de s’en servir comme extension ou comme arme. La partie transmutée permet de passer à travers les objets et surfaces peu épaisses.', 0, 0, '?', false),

(309, 'Sangsue I', 'Une dizaine de petites sphères violacées fusent vers la cible, infligeant 2D8 dégats obscurs. Le lanceur récupère les dégâts subis.', 5, 0, '-10', false),
(310, 'Sangsue II', 'Une dizaine de sphères violacées fusent vers la cible, infligeant 4D8 dégats perçants. Le lanceur récupère les dégâts subis.', 5, 0, '-25', false),
(311, 'Sangsue III', 'Une dizaine de grandes sphères violacées fusent vers la cible, infligeant 6D8 dégats obscurs. Le lanceur récupère les dégâts subis.', 5, 0, '-50', false),
(312, 'Exsangue', 'Une vingtaine de sphères et d\'éclairs noirs frappent la cible, infligeant 8D8 dégâts obscurs. Le lanceur récupère les dégâts subis. La cible doit également faire un jet de CON. En cas d\'échec, elle subit le statut "Fatigue II".', 20, 1, '-75', false),

(313, 'Zona I', 'Le lanceur projette une ombre circulaire au sol qui s\'étend sur 2m de diamètre. Des tentacules noirs se manifestent à sa surface et infligent (1D4)D3 aux entités à maximum 2m de l\'ombre chaque tour. L\'ombre persiste pendant 1D3 tours.', 5, 0, '-20', false),
(314, 'Zona II', 'Le lanceur projette une large ombre circulaire au sol qui s\'étend sur 2m de diamètre. Des tentacules noirs se manifestent à sa surface et infligent (1D6)D3 aux entités à maximum 2m de l\'ombre chaque tour. L\'ombre persiste pendant 1D3 tours.', 5, 0, '-40', false),
(315, 'Zoness', 'Le lanceur projette un duo d\'ombres circulaires au sol qui s\'étendent sur 4m de diamètre. Des tentacules noirs se manifestent à sa surface et infligent (1D10)D3 aux entités à maximum 3m de l\'ombre chaque tour. L\'ombre persiste pendant 1D4 tours.', 15, 0, '-60', false),

(316, 'Pénombres I', 'Englobe une zone de 5m autour du lanceur dans les ténèbres, diminuant la visibilité.', 0, 0, '-10-20x', false),
(317, 'Pénombres II', 'Englobe une zone de 5m autour du lanceur dans les ténèbres, diminuant grandement la visibilité.', 0, 0, '-20-20x', false),
(318, 'Pénombres III', 'Englobe une zone de 7m autour du lanceur dans les ténèbres, diminuant énormément la visibilité.', 0, 0, '-30-20x', false),
(319, 'Enclave abyssale', 'Englobe une zone de 7m autour du lanceur dans les ténèbres, rendant la visibilité quasi-nulle. Des tentacules d\'énergie noire transpercent les ennemis présents dans la zone, infligeant 2D8 dégâts obscurs par tour.', 15, 0, '-40-20x', false),

(320, 'Aiguillons de l\'ombre', 'Le lanceur manifeste X flèchettes noires qu\'il projette sur une cible, infligeant 1DX+X de dégâts obscurs ignorant l\'armure. La cible doit effectuer un jet de CON avec un malus de X. Si elle échoue, elle gagne le statut "Brisé" pendant 2 tours.', 0, 0, '-2x', false),
(321, 'Morsures de la nuit', 'Le lanceur façonne l\'obscurité autour d\'une cible en forme de machoîres noires, qui se referment brutalement sur cette dernière, lui infligeant 2D12+2D8 dégâts obscurs ignorant l\'armure.', 0, 0, '-15', false),
(322, 'Un avec les ombres', 'Le lanceur, tapi dans une ombre distincte, se fond en elle. Il surgit ensuite d\'une ombre adjacente de cette dernière dans une portée de 5m. Le lanceur est invulnérable pendant qu\'il se téléporte d\'une ombre à une autre.', 10, 0, '-20', false),

(323, 'Décret de l\'ombre', 'Le corps du lanceur brille d\'une aura sombre et froide tandis qu\'il manifeste une faux noire derrière une cible unique. La lame le fauche et lui réduit ses PV de moitié.', 20, 0, '-80', false),
(324, 'Étoile du crépuscule', 'Une sphère noire d\'encre se manifeste dans les airs au dessus du lanceur. Au deuxième tour après canalisation, elle se fracasse au sol, soufflant les créatures dans un rayon de 20m, leur infligeant 60+3D12+3D6 dégâts obscurs.', 25, 0, '-100', false);

/* 400 to 499 - Necromancy spells */
INSERT INTO `spell` VALUES
(400, 'Projection spectrale I', 'Le lanceur canalise sa magie pour manifester les émotions négatives d\'un défunt à partir du Voile et les projeter sur une cible, infligeant 8D3+8 de dégâts.', 5, 0, '-20', false),
(401, 'Projection spectrale II', 'Le lanceur canalise sa magie pour manifester les émotions négatives de deux défunts à partir du Voile et les projeter sur une cible, infligeant 8D3+3D8+8 de dégâts.', 5, 0, '-40', false),
(402, 'Projection spectrale III', 'Le lanceur manifeste un esprit haineux à partir du Voile se jetant sur la cible, infligeant 8D8 de dégâts.', 5, 0, '-60', false),
(403, 'Force spectrale', 'Le lanceur ouvre un portail vers le Voile qui déverse un torrent d\'émotions négatives et de regrets sur une cible, lui infligeant 10D10 de dégâts. La cible doit également effectuer 3 jets de VOL. Pour chaque échec, elle est tétanisée et incapable d\'agir pendant un tour.', 20, 0, '-80', false),

(404, 'Œil de Sergalée', 'Le lanceur utilise la mémoire magique afin de revivre les dernières secondes d\'une créature consciente décédée. Il doit cependant connaître le nom et le visage de la créature. L\'âme de la créature doit également être intacte pour que le sort se conclue.', 0, 0, '-15x', false),

(405, 'Kerato I', 'Le lanceur ramine un cadavre à l\'aide de sa force magique pendant 2D2 tours, obéissant à sa volonté. Les stats du cadavre sont égales à celles qu\'il possédait de son vivant, avec un malus global de -20. Le cadavre est faible à la magie blanche et immunisé contre la magie noire. Le cadavre ne peut pas lancer de sorts.', 15, 0, '-x', false),
(406, 'Kerato II', 'Le lanceur ramine un cadavre à l\'aide de sa force magique pendant 2D3 tours, obéissant à sa volonté. Les stats du cadavre sont égales à celles qu\'il possédait de son vivant, avec un malus global de -10. Le cadavre est faible à la magie blanche et immunisé contre la magie noire. Le cadavre ne peut pas lancer de sorts.', 15, 0, '-x', false),
(407, 'Kerato III', 'Le lanceur ramine un cadavre à l\'aide de sa force magique pendant 2D4 tours, obéissant à sa volonté. Les stats du cadavre sont égales à celles qu\'il possédait de son vivant. Le cadavre est faible à la magie blanche et immunisé contre la magie noire. Le cadavre ne peut pas lancer de sorts.', 20, 0, '-x', false),
(408, 'Sang pourri', 'Le lanceur ramine un cadavre à l\'aide de sa force magique pendant 2D5 tours, obéissant à sa volonté. Les stats du cadavre sont égales à celles qu\'il possédait de son vivant, avec un bonus global de 10. Le cadavre est faible à la magie blanche et immunisé contre la magie noire. Le cadavre ne peut pas lancer de sorts.', 25, 0, '-x', false),

(409, 'Mémoire de chair', 'Un cadavre animé sous le contrôle du lanceur regagne un aspect de son esprit, comme sa personnalité ou ses souvenirs, et s\'émancipe de la volonté du lanceur. Confère la capacité au cadavre de lancer des sorts. L\'âme de la créature doit également être intacte pour que le sort se conclue.', 15, 0, '?', false),

(410, 'Putréfaction I', 'Le lanceur, au toucher d\'une créature, utilise sa magie pour accélérer temporairement le vieillissement de ses cellules, lui infligeant 1D6 dégâts nécrotiques et lui faisant perdre 1D8 PV max. La créature souffre également du statut "Fatigue I".', 10, 0, '-15', false),
(411, 'Putréfaction II', 'Le lanceur, au toucher d\'une créature, utilise sa magie pour accélérer temporairement le vieillissement de ses cellules, lui infligeant 1D8 dégâts nécrotiques et lui faisant perdre 1D10 PV max. La créature souffre également du statut "Fatigue II".', 15, 0, '-30', false),
(412, 'Putréfaction III', 'Le lanceur, au toucher d\'une créature, utilise sa magie pour accélérer temporairement le vieillissement de ses cellules, lui infligeant 1D10 dégâts nécrotiques et lui faisant perdre 1D12 PV max. La créature souffre également du statut "Fatigue III".', 15, 0, '-45', false),
(413, 'À travers les âges', 'Le lanceur, au toucher d\'une créature, utilise sa magie pour accélérer exponentiellement le vieillissement de ses cellules, lui infligeant 1D12 dégâts nécrotiques et lui faisant perdre 1D20 PV max. La créature souffre également du statut "Fatigue V".', 20, 1, '-60', false),

(414, 'Évocation', 'Au cours d\'un rituel, le lanceur utilise son corps comme un réceptacle pour accueillir l\'âme d\'un défunt. Le lanceur est considéré comme sous l\'influence d\'un contrôle mental, et peut, s\'il le souhaite, effectuer un jet de VOL pour reprendre le contrôle de son corps. L\'esprit du défunt est alors renvoyé dans le Voile. L\'âme de la créature doit également être intacte pour que le sort se conclue. Le lanceur doit également connaître le nom et le visage de la personne.', 10, 0, -60, true),
(415, 'Dévocation', 'Le lanceur renvoit un esprit possèdant le corps d\'une créature dans le Voile.', 10, 0, '-x', false);

/* 500 to 599 - Curses and diseases spells */
INSERT INTO `spell` VALUES
(500, 'Globules corrosives I', 'Une aura verte sombre se dégage des mains du lanceur. Une nuée de petites globules se manifestent de cette aura et fondent sur une cible unique, infligeant 1D10 de dégats de corrosion pendant 3 tours. Le sort ne peut se manifester dans un liquide.', 0, 0, '-10', false),
(501, 'Globules corrosives II', 'Une aura verte sombre se dégage des mains du lanceur. Une nuée de globules se manifestent de cette aura et fondent sur une cible unique, infligeant 2D10 de dégats de corrosion pendant 3 tours. Le sort ne peut se manifester dans un liquide.', 0, 0, '-30', false),
(502, 'Globules corrosives III', 'Une aura verte sombre se dégage des mains du lanceur. Une énorme nuée de globules se manifeste de cette aura et fond sur une cible unique, infligeant 3D10 de dégats de corrosion pendant 3 tours. Le sort ne peut se manifester dans un liquide.', 0, 0, '-50', false),
(503, 'Vent toxique', 'Le lanceur manifeste un courant d\'air mordant et nocif sur un petit groupe de cibles, infligeant 4D10 dégâts de corrosion pendant 3 tours à ces dernières.', 20, 1, '-70', false);


-- INGREDIENTS
INSERT INTO `ingredient` VALUES
(1, 'Volonté'),
(2, 'Geste');

-- VARIABLES
INSERT INTO `variable` VALUES
(1, 'Nombre de personnes soignées');

-- ASSOCIATIONS - SPELLS / SCHOOLS
/*
SCHEMA
(id_spell, id_school),
*/

DELIMITER $$
CREATE PROCEDURE insertIntoSchoolRange(IN delimiter_start INT, IN delimiter_end INT, IN school_id INT)
BEGIN
    SET @i = delimiter_start;
    WHILE @i <= delimiter_end DO
        INSERT INTO spells_schools (id_spell, id_school) VALUES (@i, school_id);
        SET @i = @i + 1;
    END WHILE;
END$$
DELIMITER ;

CALL insertIntoSchoolRange(1, 25, 1);
CALL insertIntoSchoolRange(100, 124, 2);
CALL insertIntoSchoolRange(200, 215, 3);
CALL insertIntoSchoolRange(300, 324, 4);
CALL insertIntoSchoolRange(400, 415, 5);
CALL insertIntoSchoolRange(500, 503, 6);
