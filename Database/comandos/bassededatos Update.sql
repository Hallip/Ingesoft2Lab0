UPDATE gobernantes SET id_persona = ?, id_mun = ? WHERE ;
UPDATE municipios SET nombre = ?, area = ?, presupuesto = ? WHERE id_mun = ?;
UPDATE personas SET nombre = ?, telefono = ?, edad = ?, sexo = ?, cabeza_de_familia = ? WHERE id_persona = ?;
UPDATE personas_con_vivienda SET  WHERE personaid_persona = ? AND viviendaid_viv = ?;
UPDATE viviendas SET direccion = ?, capacidad = ?, niveles = ?, municipioid = ? WHERE id_viv = ?;

