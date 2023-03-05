CREATE TABLE gobernantes (id_persona int(11) NOT NULL, id_mun int(11) NOT NULL);
CREATE TABLE municipios (id_mun int(11) NOT NULL AUTO_INCREMENT, nombre varchar(45) NOT NULL, area double NOT NULL, presupuesto int(10) NOT NULL, PRIMARY KEY (id_mun));
CREATE TABLE personas (id_persona int(11) NOT NULL AUTO_INCREMENT, nombre varchar(45) NOT NULL, telefono int(11) NOT NULL, edad int(10) NOT NULL, sexo varchar(45) NOT NULL, cabeza_de_familia tinyint(3) NOT NULL, PRIMARY KEY (id_persona));
CREATE TABLE personas_con_vivienda (personaid_persona int(11) NOT NULL, viviendaid_viv int(10) NOT NULL, PRIMARY KEY (personaid_persona, viviendaid_viv));
CREATE TABLE viviendas (id_viv int(10) NOT NULL AUTO_INCREMENT, direccion varchar(45) NOT NULL UNIQUE, capacidad int(10) NOT NULL, niveles int(10) NOT NULL, municipioid int(11) NOT NULL, PRIMARY KEY (id_viv));
ALTER TABLE personas_con_vivienda ADD CONSTRAINT FKpersonas_c220875 FOREIGN KEY (personaid_persona) REFERENCES personas (id_persona);
ALTER TABLE personas_con_vivienda ADD CONSTRAINT FKpersonas_c92016 FOREIGN KEY (viviendaid_viv) REFERENCES viviendas (id_viv);
ALTER TABLE viviendas ADD CONSTRAINT FKviviendas381832 FOREIGN KEY (municipioid) REFERENCES municipios (id_mun);
ALTER TABLE gobernantes ADD CONSTRAINT FKgobernante906811 FOREIGN KEY (id_persona) REFERENCES personas (id_persona);
ALTER TABLE gobernantes ADD CONSTRAINT FKgobernante869423 FOREIGN KEY (id_mun) REFERENCES municipios (id_mun);

