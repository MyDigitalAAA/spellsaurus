/* Insertions de masses */
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

CALL insertIntoSchoolRange(1, 25, 1);
CALL insertIntoSchoolRange(26, 50, 2);
CALL insertIntoSchoolRange(51, 70, 3);
CALL insertIntoSchoolRange(71, 95, 4);
CALL insertIntoSchoolRange(96, 111, 5);
CALL insertIntoSchoolRange(112, 115, 6);
CALL insertIntoSchoolRange(116, 141, 7);
CALL insertIntoSchoolRange(142, 167, 8);
CALL insertIntoSchoolRange(168, 193, 9);
CALL insertIntoSchoolRange(194, 217, 10);
CALL insertIntoSchoolRange(218, 220, 11);
CALL insertIntoSchoolRange(221, 242, 12);
CALL insertIntoSchoolRange(243, 257, 13);
CALL insertIntoSchoolRange(258, 272, 14);
CALL insertIntoSchoolRange(273, 283, 15);
CALL insertIntoSchoolRange(284, 301, 16);
CALL insertIntoSchoolRange(302, 322, 17);
CALL insertIntoSchoolRange(323, 339, 19);
CALL insertIntoSchoolRange(340, 341, 20);
CALL insertIntoSchoolRange(342, 356, 21);
CALL insertIntoSchoolRange(357, 387, 22);
CALL insertIntoSchoolRange(388, 396, 24);
CALL insertIntoSchoolRange(397, 403, 25);
