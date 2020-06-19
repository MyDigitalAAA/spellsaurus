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

