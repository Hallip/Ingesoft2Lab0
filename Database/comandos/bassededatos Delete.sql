DELETE FROM gobernantes WHERE ;
DELETE FROM municipios WHERE id_mun = ?;
DELETE FROM personas WHERE id_persona = ?;
DELETE FROM personas_con_vivienda WHERE personaid_persona = ? AND viviendaid_viv = ?;
DELETE FROM viviendas WHERE id_viv = ?;

