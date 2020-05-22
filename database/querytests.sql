USE spellsaurus;

/* Fetches a specific spell's school(s) */
SELECT school.name
FROM spells_schools AS sc
INNER JOIN school AS school ON sc.id_school = school.id
WHERE sc.id_spell = 1;