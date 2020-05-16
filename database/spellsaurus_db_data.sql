SET NAMES utf8;
USE spellsaurus;

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
INSERT INTO `school` (name, description, id_meta_school) VALUES
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

-- SPELLS
/*
SCHEMA
(id, name, description, level, charge, cost),
*/

-- LIGHT SPELLS
INSERT INTO `spell` (name, description, level, charge, cost, is_ritual) VALUES
('Rayon prismatique I', 'Un petit rayon étincelant est émis de la paume du lanceur. Ce dernier peut rebondir sur les surfaces réfléchissantes. S’il percute une cture, elle subit 6+2D6 dégâts radiants.', 0, 0, '0', false),
('Rayon prismatique II', 'Un rayon étincelant est émis de la paume du lanceur. Ce dernier peut rebondir sur les surfaces réfléchissantes. S’il percute une créature, e subit 15+2D6 dégâts radiants.', 0, 0, '-20', false),
('Rayon prismatique III', 'Un grand rayon étincelant est émis de la paume du lanceur. Ce dernier peut rebondir sur les surfaces réfléchissantes. S’il percute une cture, elle subit 25+2D6 dégâts radiants.', 0, 0, '-40', false),
('Laser prismatique', 'Les mains du lanceur s’illuminent d’une intense aura blanche. Après un tour de canalisation, il projette  un énorme laser blanc de sa paume dans une direction unique, infligeant 30+1D20+2D6  dégâts radiants aux créatures sur sa trajectoire. Le laser peut rebondir sur les surfaces réfléchissantes.', 20, 1, '-60', false),

('Globe lumineux', 'Le lanceur manifeste un petit globe de lumière autour de lui. La lumière dégagée par ce globe éclaire sur une portée initiale de 5m, mais peut être augmentée suivant la puissance du sort. Le lanceur garde un contrôle sur cette sphère, qu’il peut déplacer en conséquence.', 0, 0, '-10x', false),
('Globule de vérité', 'Le lanceur concentre son arcane en un globule de lumière bleue qui flottille autour de lui. Ce dernier, en plus d’être une source de lumière considérable, permet de disperser la magie d’illusion. Le lanceur manifeste un globe de lumière magique éclairant sur 5m autour de lui. Permet de voir les objets et créatures cachés par magie et de percer les illusions.', 10, 0, '-25x', false),

('Vision nocturne', 'Le lanceur octroie à lui-même ou bien à une créature qu’il touche une vision nettement améliorée dans l’obscurité pendant 1D3 tours.', 0, 0, '-20', false),
('Œil de Lystos', 'Le lanceur octroie à lui-même ou bien à une créature qu’il touche le statut «Clairvoyant» pendant 1D3 tours. Elle gagne une vision nettement améliorée dans l’obscurité ainsi qu’un avantage pour percevoir à travers la pénombre magique et les illusions.', 10, 0, '-40', false),
('Illumination', 'Par le toucher, le lanceur octroie à un petit objet une luminosité de faible intensité, semblable à la lumière vacillante d’une bougie.', 0, 0, '+20', false),

('Lumière aveuglante', 'Le lanceur, en claquant des doigts, produit un bref flash de lumière devant une cible, l’aveuglant pendant 1D2 tours.', 0, 0, '0', false),
('Irradiation', 'Le lanceur s’illumine instantanément pendant une fraction de seconde, aveuglant toutes les créatures le regardant dans un rayon de 10m pendant 1D2 tours.', 10, 0, '-25', false),

('Lystos I', 'Le lanceur, en se concentrant sur l’image de Lystos dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D5+5 dégâts radiants ignorant l\'armure en dégageant une aura brûlante. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -15.', 0, 0, '0', false),
('Lystos II', 'Le lanceur, en se concentrant sur l’image de Lystos dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D8+8 dégâts radiants ignorant l\'armure en dégageant une aura brûlante. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -30.', 0, 0, '-20', false),
('Lystos III', 'Le lanceur, en se concentrant sur l’image de Lystos dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D10+10 dégâts radiants ignorant l\'armure en dégageant une aura brûlante. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -45.', 0, 0, '-40', false),
('Paradigme Lystonien', 'Le lanceur s’imprègne de l’image de Lystos, et la concentre dans son esprit. Son sceau, entouré de plusieurs petits sceaux, se manifestent sous un petit groupe de cibles. Ces dernières sont brûlées par la lumière se dégageant des emblèmes, et subissent 2D20+20 dégâts radiants ignorant l\'armure. Une énergie divine mystérieuse pénètre l’esprit des cibles, ralentissant leurs mouvements et drainant leur volonté. Toute tentative d’esquive subit un malus de -60.', 15, 1, '-60', false),

('Corps luminescent', 'Le lanceur transmute une partie plus ou moins grande de son corps en énergie luminescente, lui permettant de s’en servir comme extension ou comme arme. La partie transmutée permet de passer à travers les objets et surfaces peu épaisses.', 0, 0, '?', false),

('Jugement lumineux', 'Le corps du lanceur brille d’une aura blanche tandis qu’il manifeste une guillotine de lumière au niveau du cou d’une cible unique. La lame de lumière passe au travers de sa gorge et lui réduit ses PV de moitié.', 20, 0, '-80', false),

('Étoile de l\'aube', 'Une sphère de lumière initialement pâle, puis très lumineuse, se manifeste à 20m du sol et du lanceur. Au deuxième tour de canalisation, elle s’abat au sol dans une explosion iridescente, soufflant toutes les créatures dans un rayon de 20m, leur infligeant 60+3D12+3D6 dégâts radiants.', 25, 2, '-120', false),

('Lumière pourrie I', 'Le lanceur conjure une orbe lumineuse verdâtre jusqu’à 5m autour de lui. Cette dernière, au rythme de ses palpitations, projette des rayons brûlants dans toutes les directions autour d’elle dans un rayon de 20m. Toutes les créatures à découvert dans un rayon de 20m de la sphère (sauf le lanceur) doivent réussir un jet de DEX. Si elles échouent, elles subissent 2D10 dégâts radiants et 1D10 dégâts nécrotiques. Elles perdent également 1D6 PV max.', 20, 0, '-30', false),
('Lumière pourrie II', 'Le lanceur conjure une orbe lumineuse verdâtre jusqu’à 5m autour de lui. Cette dernière, au rythme de ses palpitations, projette des rayons brûlants dans toutes les directions autour d’elle dans un rayon de 20m. Toutes les créatures à découvert dans un rayon de 30m de la sphère (sauf le lanceur) doivent réussir un jet de DEX. Si elles échouent, elles subissent 2D20 dégâts radiants et 1D20 dégâts nécrotiques. Elles perdent également 1D8 PV max.', 20, 0, '-50', false),
('Lumière pourrie III', 'Le lanceur conjure une orbe lumineuse verdâtre jusqu’à 5m autour de lui. Cette dernière, au rythme de ses palpitations, projette des rayons brûlants dans toutes les directions autour d’elle dans un rayon de 20m. Toutes les créatures à découvert dans un rayon de 50m de la sphère (sauf le lanceur) doivent réussir un jet de DEX. Si elles échouent, elles subissent 2D20 dégâts radiants et 2D20 dégâts nécrotiques. Elles perdent également 1D10 PV max.', 25, 0, '-70', false),
('Soleil pourri', 'Le lanceur projette un petit astre vert jusqu’à 20m autour de lui. L’astre brûle l’air environnant, nécrosant rapidement les formes de vies dans un rayon de 100m. Toutes les créatures dans la portée de l’astre (sauf le lanceur) doivent réussir un jet de CON avec un malus de -30. Si elles échouent, elles subissent 3D20 dégâts radiants et 2D20 dégâts nécrotiques. Elles perdent également 1D10 PV max.', 30, 2, '-90', false),

('Brisaube', 'Le lanceur insufle une arme qu\'il touche d\'une quantité phénoménale de magie lumineuse, de telle sorte à ce qu\'elle brille de milles feux. L\'arme inflige 2D20+1D12 dégâts radiants supplémentaires pendant 3 tours et inflige le statut "Brûlures solaires" pendant 1D4 tours si elle touche une créature.', 50, 0 , '-80', false),

('Consécration', 'Le lanceur conjure X sphères runiques dans un rayon de 40m autour de lui. Après un court instant, ces dernières explosent d\'une vive lumière blanche, infligeant 2D8+2D6 dégâts radiants aux créatures se trouvant à au moins 2m autour d\'elles.', 80, 0, '-15x', false),
('Apothéose', 'Un cercle runique apparait derrière le lanceur. Ce dernier manifeste des centaines de petits cristaux de lumière en son bord qui fondent sur les cibles dans le champ de vision du lanceur, infligeant 4D2*4D2 dégâts à chacune d\'entre elles.', 80, 1, '-100', false);

INSERT INTO `spell` (name, description, level, charge, cost, is_ritual) VALUES
('Guérison I', 'Rend 2D4+4 PV, soigne les contusions légères et blessures superficielles.', 0, 0, '0', false),
('Guérison II', 'Rend 2D6+6 PV, soigne les blessures mineures.', 0, 0, '-10', false),
('Guérison III', 'Rend 2D10+10 PV, soigne les blessures profondes.', 0, 0, '-20', false),
('Guérison IV', 'Rend 2D20+20 PV, soigne les blessures graves et stoppe les hémorragies.', 0, 0, '-40', false),
('Thaumaturgie', 'Débordant d’altruisme, le lanceur canalise l’arcane autour de lui afin de panser les blessures d’une créature. La créature ciblée regagne 3D20+30 PV. Ses blessures graves se guérissent instantannément et toute hémorragie cesse. Si la cible se trouvait dans un état de mort imminente, elle est considérée comme stabilisée.', 20, 1, '-60', false),

('Régénération I', 'Rend 1D4+2 PV pendant 3 tours à une créature, soigne les contusions légères et blessures superficielles.', 0, 0, '0', false),
('Régénération II', 'Rend 1D6+3 PV pendant 3 tours à une créatures, soigne les blessures mineures.', 0, 0, '-5', false),
('Régénération III', 'Rend 1D10+5 PV pendant 3 tours à une créature, soigne les blessures profondes.', 0, 0, '-15', false),
('Régénération IV', 'Rend 1D20+10 PV pendant 3 tours à une créature, soigne les blessures graves et stoppe les hémorragies.', 0, 0, '-30', false),
('Argaturgie', 'Le lanceur duplique sa force vitale afin de soigner sur la durée les blessures d\'une créature unique. Elle regagne 3D10+15 PV pendant 3 tours et soigne les blessures et ses hémorragies importantes.', 20, 1, '-50', false),

('Guérison collective I', 'Rend 1D4+4 PV à plusieurs créatures, soigne les contusions légères et blessures superficielles.', 0, 0, '-2x', false),
('Guérison collective II', 'Rend 1D6+6 PV à plusieurs créatures, soigne les blessures mineures.', 0, 0, '-5x', false),
('Guérison collective III', 'Rend 1D10+10 PV à plusieurs créatures, soigne les blessures profondes.', 0, 0, '-10x', false),
('Guérison collective IV', 'Rend 1D20+20 PV à plusieurs créatures, soigne les blessures graves et stoppe les hémorragies.', 0, 0, '-15x', false),
('Polythurgie', 'Le lanceur transmet de l\'énergie vitale pure à plusieurs créatures. Elles regagnent 3D10+30 PV et leurs hémorragies graves s\'estompent. Si les cibles se trouvaient dans un état de mort imminente, elles sont considérées comme stabilisées.', 20, 1, '-20x', false),

('Détoxication I', 'Renforce les défenses immunitaires d\'une créature et permet à son corps de se défendre contre un faible poison. Donne +10 CON au prochain jet contre ce dernier.', 0, 0, '0', false),
('Détoxication II', 'Renforce les défenses immunitaires d\'une créature et permet à son corps de se défendre contre un poison. Donne +20 CON aux 2 prochains jets contre ce dernier.', 0, 0, '-10', false),
('Détoxication III', 'Renforce grandement les défenses immunitaires d\'une créature et permet à son corps de se défendre contre un poison sévère. Donne +30 CON aux 2 prochains jets contre ce dernier.', 0, 0, '-30', false),
('Thératurgie', 'Renforce énormément les défenses immunitaires d\'une créature et permet au corps d\'expulser un poison mortel et puissant.', 20, 1, '-50', false),

('Détection de vie', 'Le lanceur peut déterminer la force vitale restante d\'une créature dans son champ de vision jusqu\'à 15m de distance.', 0, 0, '0', false),
('Œil de Sotana', 'Octroie au lanceur une vision thermique des 5 mètres alentours permettant de voir la force vitale des créatures conscientes environnantes. Plus une forme apparait clairement au lanceur, plus elle est en bonne santé.', 10, 0, '-15x', false),

('Filin de survie', 'Relie le corps du lanceur à celui d\'une autre créature par un filin de lumière blanche intangible. Les dégâts subis par les deux sont divisés et répartis équitablement pendant 3 tours.', 15, 0, '-30', false),

('Contre-mort', 'Le lanceur infuse une force vitale conséquente à une cible. Si elle reçoit une attaque fatale, elle conserve un unique point de vie à la place. L\'effet du sort dure une heure.', 15, 0, '-50', false),

('Sotana', 'En brûlant la moitié de ses PV max, le lanceur concentre sa volonté et son énergie vitale de manière à ramener à 1 PV une créature décédée depuis 2h maximum. Pour que ce sort se conclue, il faut impérativement que l\'âme de la créature ne soit ni détruite ni scellée, et que le lanceur soit en contact avec une partie du corps de la cible, ou une de ses possessions (qui sera consommée par le sort dans les deux cas)', 25, 0, '-80', false),
('Masotana', 'Le lanceur manifeste une zone d\'énergie vitale pure autour de lui sur environ 10m, empêchant à toutes les créatures dans cette zone de mourir pendant 5 tours. Les créatures peuvent toujours être incapacitées et ressentent la douleur, mais ne peuvent pas descendre en dessous de 1 PV.', 30, 1, '-100', false);

INSERT INTO `spell` (name, description, level, charge, cost, is_ritual) VALUES
('Bouclier arcanique I', 'Dresse une épaisse barrière d\'énergie magique autour d\'une ou plusieurs personnes, bloquant 15 points de dégâts.', 0, 0, '-10x', false),
('Bouclier arcanique II', 'Dresse une épaisse barrière d\'énergie magique autour d\'une ou plusieurs personnes, bloquant 30 points de dégâts.', 0, 0, '-20x', false),
('Bouclier arcanique III', 'Dresse une épaisse barrière d\'énergie magique autour d\'une ou plusieurs personnes, bloquant 60 points de dégâts.', 0, 0, '-40x', false),
('Isolation arcanique', 'Dresse une épaisse barrière d\'énergie magique pure autour d\'une ou plusieurs personnes, bloquant 100 points de dégâts.', 20, 0, '-60x', false),

('Bouclier étendu I', 'Conjure une unique barrière magique autour de plusieurs personnes, bloquant 50 points de dégâts avant de se briser.', 10, 0, '-30-10x', false),
('Bouclier étendu II', 'Conjure une unique barrière autour magique de plusieurs personnes, bloquant 90 points de dégâts avant de se briser.', 10, 0, '-50-10x', false),
('Barricades arcaniques', 'Conjure une unique épaisse barrière magique autour de plusieurs personnes, bloquant 120 points de dégâts avant de se briser.', 20, 0, '-70-10x', false),

('Barrière régénératrice I', 'Le lanceur dresse une barrière protectrice autour d\'une ou plusieurs créature(s), les protégeant de 20 points de dégâts. Les créatures affectées par ce sort regagnent 1D6 PV par tour tant que la barrière persiste.', 15, 0, '-20x', false),
('Barrière régénératrice II', 'Le lanceur dresse une barrière protectrice autour d\'une ou plusieurs créature(s), les protégeant de 40 points de dégâts. Les créatures affectées par ce sort regagnent 2D6 PV par tour tant que la barrière persiste.', 15, 0, '-40x', false),
('Cocon guérisseur', 'Le lanceur dresse une épaisse barrière protectrice brilliante autour d\'une ou plusieurs créature(s), les protégeant de 60 points de dégâts. Les créatures affectées par ce sort regagnent 3D8 PV par tour tant que la barrière persiste.', 20, 0, '-60x', false),

('Verrou arcanique I', 'Protège de manière magique un objet ouvrable (coffre, livre, etc...). L\'objet est scellé et ne peut plus s\'ouvrir, sauf sur volonté du lanceur. Résiste à 15 points de dégâts magiques. Une personne peut l\'ouvrir si elle inflige assez de dégâts au verrou, ou si elle réussi un jet d\'arcane avec un malus de 20.', 5, 0, '-15', false),
('Verrou arcanique II', 'Protège de manière magique un objet ouvrable (coffre, livre, etc...). L\'objet est scellé et ne peut plus s\'ouvrir, sauf sur volonté du lanceur. Résiste à 30 points de dégâts magiques. Une personne peut l\'ouvrir si elle inflige assez de dégâts au verrou, ou si elle réussi un jet d\'arcane avec un malus de 40.', 10, 0, '-30', false),
('Verrou arcanique III', 'Protège de manière magique un objet ouvrable (coffre, livre, etc...). L\'objet est scellé et ne peut plus s\'ouvrir, sauf sur volonté du lanceur. Résiste à 50 points de dégâts magiques. Une personne peut l\'ouvrir si elle inflige assez de dégâts au verrou, ou si elle réussi un jet d\'arcane avec un malus de 60.', 15, 0, '-50', false),
('Chaînes du souverain', 'Manifeste des chaînes blanches sur un objet (coffre, livre, etc...). L\'objet est scellé et ne peut plus s\'ouvrir, sauf sur volonté du lanceur. Les chaînes se dissipent et ne réapparaissent qu\'avec une tentative d\'effraction.  Résiste à 75 points de dégâts magiques. Une personne peut l\'ouvrir si elle inflige assez de dégâts au verrou, ou si elle réussi un jet d\'arcane avec un malus de 90.', 20, 1, '-75', false),

('Sceau des grands anciens', 'Au court d\'un rituel de canalisation intense et épuisant, le lanceur utilise toute l\'énergie magique de son corps et une partie de sa force vitale afin d\'isoler complètement une chose quelconque de l\'existence, la plaçant effectivement entre les dimensions et du temps. La force et la durabilité du sceau dépend de la force magique du lanceur. Pour un Dieu par exemple, le sceau dure environ 5000 ans. Le sceau n\'est pas indestructible, et est susceptible à l\'usure du temps, des attaques répétées, etc...', 99, 99, '?', true),
('Ascension', 'Réveille la partie de l\'âme scellée d\'une créature, l\'unifiant dans un seul corps, et lui permettant de maitriser l\'échomancie.', 99, 5, '?', false);

-- DARKNESS SPELLS
INSERT INTO `spell` (name, description, level, charge, cost, is_ritual) VALUES
('Onde noire I', 'Projette une petite onde d\'énergie noire sur 5m autour du lanceur, infligeant 6+2D6 points de dégâts obscurs.', 0, 0, '0', false),
('Onde noire II', 'Projette une onde d\'énergie noire sur 10m autour du lanceur, infligeant 15+2D6 points de dégâts obscurs.', 0, 0, '-20', false),
('Onde noire III', 'Projette une vaste onde d\'énergie noire sur 20m autour du lanceur, infligeant 25+2D6 points de dégâts obscurs.', 0, 0, '-40', false),
('Vibrobscur', 'Projette une vague d\'énergie ténébreuse sur 40m autour du lanceur, infligeant 30+1D20+2D6 points de dégâts obscurs.', 20, 1, '-60', false),

('Ményl I', 'Le lanceur, en se concentrant sur la forme de Ményl dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D5+5 dégâts obscurs ignorant l\'armure en dégageant une aura glaciale. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -15.', 0, 0, '0', false),
('Ményl II', 'Le lanceur, en se concentrant sur la forme de Ményl dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D8+8 dégâts obscurs ignorant l\'armure en dégageant une aura glaciale. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -30.', 0, 0, '-20', false),
('Ményl III', 'Le lanceur, en se concentrant sur la forme de Ményl dans son esprit, manifeste son sceau sous une cible unique, qui lui inflige 2D10+10 dégâts obscurs ignorant l\'armure en dégageant une aura glaciale. Des énergies divines mystérieuses facilitent la canalisation du sort et sa rapidité. Si la cible tente d’esquiver, son action subit un malus de -45.', 0, 0, '-40', false),
('Vision Ménélienne', 'Le lanceur s’imprègne de l\'énergie de Ményl, et la concentre dans son esprit. Son sceau, entouré de plusieurs petits sceaux, se manifestent sous un petit groupe de cibles. Ces dernières sont brûlées de froid par les ténèbres se dégageant des emblèmes, et subissent 2D20+20 dégâts obscurs ignorant l\'armure. Une énergie divine mystérieuse pénètre l’esprit des cibles, ralentissant leurs mouvements et drainant leur volonté. Toute tentative d’esquive subit un malus de -60.', 15, 1, '-60', false),

('Corps sombre', 'Le lanceur transmute une partie plus ou moins grande de son corps en énergie ténébreuse, lui permettant de s’en servir comme extension ou comme arme. La partie transmutée permet de passer à travers les objets et surfaces peu épaisses.', 0, 0, '?', false),

('Sangsue I', 'Une dizaine de petites sphères violacées fusent vers la cible, infligeant 2D8 dégats obscurs. Le lanceur récupère les dégâts subis.', 5, 0, '-10', false),
('Sangsue II', 'Une dizaine de sphères violacées fusent vers la cible, infligeant 4D8 dégats perçants. Le lanceur récupère les dégâts subis.', 5, 0, '-25', false),
('Sangsue III', 'Une dizaine de grandes sphères violacées fusent vers la cible, infligeant 6D8 dégats obscurs. Le lanceur récupère les dégâts subis.', 5, 0, '-50', false),
('Exsangue', 'Une vingtaine de sphères et d\'éclairs noirs frappent la cible, infligeant 8D8 dégâts obscurs. Le lanceur récupère les dégâts subis. La cible doit également faire un jet de CON. En cas d\'échec, elle subit le statut "Fatigue II".', 20, 1, '-75', false),

('Zona I', 'Le lanceur projette une ombre circulaire au sol qui s\'étend sur 2m de diamètre. Des tentacules noirs se manifestent à sa surface et infligent (1D4)D3 aux entités à maximum 2m de l\'ombre chaque tour. L\'ombre persiste pendant 1D3 tours.', 5, 0, '-20', false),
('Zona II', 'Le lanceur projette une large ombre circulaire au sol qui s\'étend sur 2m de diamètre. Des tentacules noirs se manifestent à sa surface et infligent (1D6)D3 aux entités à maximum 2m de l\'ombre chaque tour. L\'ombre persiste pendant 1D3 tours.', 5, 0, '-40', false),
('Zoness', 'Le lanceur projette un duo d\'ombres circulaires au sol qui s\'étendent sur 4m de diamètre. Des tentacules noirs se manifestent à sa surface et infligent (1D10)D3 aux entités à maximum 3m de l\'ombre chaque tour. L\'ombre persiste pendant 1D4 tours.', 15, 0, '-60', false),

('Pénombres I', 'Englobe une zone de 5m autour du lanceur dans les ténèbres, diminuant la visibilité.', 0, 0, '-10-20x', false),
('Pénombres II', 'Englobe une zone de 5m autour du lanceur dans les ténèbres, diminuant grandement la visibilité.', 0, 0, '-20-20x', false),
('Pénombres III', 'Englobe une zone de 7m autour du lanceur dans les ténèbres, diminuant énormément la visibilité.', 0, 0, '-30-20x', false),
('Enclave abyssale', 'Englobe une zone de 7m autour du lanceur dans les ténèbres, rendant la visibilité quasi-nulle. Des tentacules d\'énergie noire transpercent les ennemis présents dans la zone, infligeant 2D8 dégâts obscurs par tour.', 15, 0, '-40-20x', false),

('Aiguillons de l\'ombre', 'Le lanceur manifeste X flèchettes noires qu\'il projette sur une cible, infligeant 1DX+X de dégâts obscurs ignorant l\'armure. La cible doit effectuer un jet de CON avec un malus de X. Si elle échoue, elle gagne le statut "Brisé" pendant 2 tours.', 0, 0, '-2x', false),
('Morsures de la nuit', 'Le lanceur façonne l\'obscurité autour d\'une cible en forme de machoîres noires, qui se referment brutalement sur cette dernière, lui infligeant 2D12+2D8 dégâts obscurs ignorant l\'armure.', 0, 0, '-15', false),
('Un avec les ombres', 'Le lanceur, tapi dans une ombre distincte, se fond en elle. Il surgit ensuite d\'une ombre adjacente de cette dernière dans une portée de 5m. Le lanceur est invulnérable pendant qu\'il se téléporte d\'une ombre à une autre.', 10, 0, '-20', false),

('Décret de l\'ombre', 'Le corps du lanceur brille d\'une aura sombre et froide tandis qu\'il manifeste une faux noire derrière une cible unique. La lame le fauche et lui réduit ses PV de moitié.', 20, 0, '-80', false),
('Étoile du crépuscule', 'Une sphère noire d\'encre se manifeste dans les airs au dessus du lanceur. Au deuxième tour après canalisation, elle se fracasse au sol, soufflant les créatures dans un rayon de 20m, leur infligeant 60+3D12+3D6 dégâts obscurs.', 25, 0, '-100', false);

INSERT INTO `spell` (name, description, level, charge, cost, is_ritual) VALUES
('Projection spectrale I', 'Le lanceur canalise sa magie pour manifester les émotions négatives d\'un défunt à partir du Voile et les projeter sur une cible, infligeant 8D3+8 de dégâts.', 5, 0, '-20', false),
('Projection spectrale II', 'Le lanceur canalise sa magie pour manifester les émotions négatives de deux défunts à partir du Voile et les projeter sur une cible, infligeant 8D3+3D8+8 de dégâts.', 5, 0, '-40', false),
('Projection spectrale III', 'Le lanceur manifeste un esprit haineux à partir du Voile se jetant sur la cible, infligeant 8D8 de dégâts.', 5, 0, '-60', false),
('Force spectrale', 'Le lanceur ouvre un portail vers le Voile qui déverse un torrent d\'émotions négatives et de regrets sur une cible, lui infligeant 10D10 de dégâts. La cible doit également effectuer 3 jets de VOL. Pour chaque échec, elle est tétanisée et incapable d\'agir pendant un tour.', 20, 0, '-80', false),

('Œil de Sergalée', 'Le lanceur utilise la mémoire magique afin de revivre les dernières secondes d\'une créature consciente décédée. Il doit cependant connaître le nom et le visage de la créature. L\'âme de la créature doit également être intacte pour que le sort se conclue.', 0, 0, '-15x', false),

('Kerato I', 'Le lanceur ramine un cadavre à l\'aide de sa force magique pendant 2D2 tours, obéissant à sa volonté. Les stats du cadavre sont égales à celles qu\'il possédait de son vivant, avec un malus global de -20. Le cadavre est faible à la magie blanche et immunisé contre la magie noire. Le cadavre ne peut pas lancer de sorts.', 15, 0, '-x', false),
('Kerato II', 'Le lanceur ramine un cadavre à l\'aide de sa force magique pendant 2D3 tours, obéissant à sa volonté. Les stats du cadavre sont égales à celles qu\'il possédait de son vivant, avec un malus global de -10. Le cadavre est faible à la magie blanche et immunisé contre la magie noire. Le cadavre ne peut pas lancer de sorts.', 15, 0, '-x', false),
('Kerato III', 'Le lanceur ramine un cadavre à l\'aide de sa force magique pendant 2D4 tours, obéissant à sa volonté. Les stats du cadavre sont égales à celles qu\'il possédait de son vivant. Le cadavre est faible à la magie blanche et immunisé contre la magie noire. Le cadavre ne peut pas lancer de sorts.', 20, 0, '-x', false),
('Sang pourri', 'Le lanceur ramine un cadavre à l\'aide de sa force magique pendant 2D5 tours, obéissant à sa volonté. Les stats du cadavre sont égales à celles qu\'il possédait de son vivant, avec un bonus global de 10. Le cadavre est faible à la magie blanche et immunisé contre la magie noire. Le cadavre ne peut pas lancer de sorts.', 25, 0, '-x', false),

('Mémoire de chair', 'Un cadavre animé sous le contrôle du lanceur regagne un aspect de son esprit, comme sa personnalité ou ses souvenirs, et s\'émancipe de la volonté du lanceur. Confère la capacité au cadavre de lancer des sorts. L\'âme de la créature doit également être intacte pour que le sort se conclue.', 15, 0, '?', false),

('Putréfaction I', 'Le lanceur, au toucher d\'une créature, utilise sa magie pour accélérer temporairement le vieillissement de ses cellules, lui infligeant 1D6 dégâts nécrotiques et lui faisant perdre 1D8 PV max. La créature souffre également du statut "Fatigue I".', 10, 0, '-15', false),
('Putréfaction II', 'Le lanceur, au toucher d\'une créature, utilise sa magie pour accélérer temporairement le vieillissement de ses cellules, lui infligeant 1D8 dégâts nécrotiques et lui faisant perdre 1D10 PV max. La créature souffre également du statut "Fatigue II".', 15, 0, '-30', false),
('Putréfaction III', 'Le lanceur, au toucher d\'une créature, utilise sa magie pour accélérer temporairement le vieillissement de ses cellules, lui infligeant 1D10 dégâts nécrotiques et lui faisant perdre 1D12 PV max. La créature souffre également du statut "Fatigue III".', 15, 0, '-45', false),
('À travers les âges', 'Le lanceur, au toucher d\'une créature, utilise sa magie pour accélérer exponentiellement le vieillissement de ses cellules, lui infligeant 1D12 dégâts nécrotiques et lui faisant perdre 1D20 PV max. La créature souffre également du statut "Fatigue V".', 20, 1, '-60', false),

('Évocation', 'Au cours d\'un rituel, le lanceur utilise son corps comme un réceptacle pour accueillir l\'âme d\'un défunt. Le lanceur est considéré comme sous l\'influence d\'un contrôle mental, et peut, s\'il le souhaite, effectuer un jet de VOL pour reprendre le contrôle de son corps. L\'esprit du défunt est alors renvoyé dans le Voile. L\'âme de la créature doit également être intacte pour que le sort se conclue. Le lanceur doit également connaître le nom et le visage de la personne.', 10, 0, -60, true),
('Dévocation', 'Le lanceur renvoit un esprit possèdant le corps d\'une créature dans le Voile.', 10, 0, '-x', false);

INSERT INTO `spell` (name, description, level, charge, cost, is_ritual) VALUES
('Globules corrosives I', 'Une aura verte sombre se dégage des mains du lanceur. Une nuée de petites globules se manifestent de cette aura et fondent sur une cible unique, infligeant 1D10 de dégats de corrosion pendant 3 tours. Le sort ne peut se manifester dans un liquide.', 0, 0, '-10', false),
('Globules corrosives II', 'Une aura verte sombre se dégage des mains du lanceur. Une nuée de globules se manifestent de cette aura et fondent sur une cible unique, infligeant 2D10 de dégats de corrosion pendant 3 tours. Le sort ne peut se manifester dans un liquide.', 0, 0, '-30', false),
('Globules corrosives III', 'Une aura verte sombre se dégage des mains du lanceur. Une énorme nuée de globules se manifeste de cette aura et fond sur une cible unique, infligeant 3D10 de dégats de corrosion pendant 3 tours. Le sort ne peut se manifester dans un liquide.', 0, 0, '-50', false),
('Vent toxique', 'Le lanceur manifeste un courant d\'air mordant et nocif sur un petit groupe de cibles, infligeant 4D10 dégâts de corrosion pendant 3 tours à ces dernières.', 20, 1, '-70', false);

-- INGREDIENTS
INSERT INTO `ingredient` (name) VALUES
('Volonté'),
('Geste');

-- VARIABLES
INSERT INTO `variable` (description) VALUES
('Nombre de personnes soignées');

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
CALL insertIntoSchoolRange(26, 50, 2);
CALL insertIntoSchoolRange(51, 66, 3);
CALL insertIntoSchoolRange(67, 91, 4);
CALL insertIntoSchoolRange(92, 107, 5);
CALL insertIntoSchoolRange(108, 111, 6);
