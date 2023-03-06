INSERT INTO gobernantes(id_persona, id_mun) VALUES (?, ?);
INSERT INTO municipios(id_mun, nombre, area, presupuesto) VALUES (?, ?, ?, ?);
INSERT INTO personas(id_persona, nombre, telefono, edad, sexo, cabeza_de_familia) VALUES (?, ?, ?, ?, ?, ?);
INSERT INTO personas_con_vivienda(personaid_persona, viviendaid_viv) VALUES (?, ?);
INSERT INTO viviendas(id_viv, direccion, capacidad, niveles, municipioid) VALUES (?, ?, ?, ?, ?);

