ALTER TABLE personas_con_vivienda DROP FOREIGN KEY FKpersonas_c220875;
ALTER TABLE personas_con_vivienda DROP FOREIGN KEY FKpersonas_c92016;
ALTER TABLE viviendas DROP FOREIGN KEY FKviviendas381832;
ALTER TABLE gobernantes DROP FOREIGN KEY FKgobernante906811;
ALTER TABLE gobernantes DROP FOREIGN KEY FKgobernante869423;
DROP TABLE IF EXISTS gobernantes;
DROP TABLE IF EXISTS municipios;
DROP TABLE IF EXISTS personas;
DROP TABLE IF EXISTS personas_con_vivienda;
DROP TABLE IF EXISTS viviendas;

