const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');


const bp = require('body-parser')
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const connection = mysql.createConnection({
  host: '186.155.54.114',
  user: 'pepe',
  password: '1211',
  database: 'lab1'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }

  console.log('Conectado a la base de datos MySQL.');
});


app.get('/', (request, response) => {
  return response.send('OK');
});

app.listen(5000, () => {
  console.log('App is listening on port 5000');
});


// Ruta para insertar datos en la tabla personas
app.post('/personas', (req, res) => {
  // Obtener los datos del cuerpo de la solicitud
  const { nombre, telefono, edad, sexo, cabeza_de_familia } = req.body;

  // Crear la consulta SQL para insertar los datos en la tabla personas
  const sql = `INSERT INTO personas (nombre, telefono, edad, sexo, cabeza_de_familia) VALUES ('${nombre}', '${telefono}', ${edad}, '${sexo}', ${cabeza_de_familia})`;

  // Ejecutar la consulta en la base de datos
  connection.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al insertar datos en la tabla personas');
    } else {
      console.log(result);
      res.status(200).send('Datos insertados correctamente en la tabla personas');
    }
  });
});

// Ruta para actualizar datos en la tabla personas
app.put('/personas/:id', (req, res) => {
  // Obtener el id de la persona de los parámetros de la solicitud
  const id_persona = req.params.id;

  // Obtener los datos del cuerpo de la solicitud
  const { nombre, telefono, edad, sexo, cabeza_de_familia } = req.body;

  // Crear la consulta SQL para actualizar los datos en la tabla personas
  const sql = `UPDATE personas SET nombre='${nombre}', telefono='${telefono}', edad=${edad}, sexo='${sexo}', cabeza_de_familia=${cabeza_de_familia} WHERE id_persona=${id_persona}`;

  // Ejecutar la consulta en la base de datos
  connection.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al actualizar datos en la tabla personas');
    } else {
      console.log(result);
      res.status(200).send('Datos actualizados correctamente en la tabla personas');
    }
  });
});

// Ruta para leer los datos de la tabla personas
app.get('/personas', (req, res) => {
  // Crear la consulta SQL para leer los datos de la tabla personas
  const sql = 'SELECT * FROM personas';

  // Ejecutar la consulta en la base de datos
  connection.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al leer los datos de la tabla personas');
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});

// Ruta para borrar datos de la tabla personas
app.delete('/personas/:id', (req, res) => {
  // Obtener el ID de la persona a borrar desde los parámetros de la URL
  const id = req.params.id;

  // Crear la consulta SQL para borrar los datos de la tabla personas
  const sql = 'DELETE FROM personas WHERE id_persona = ?';

  // Ejecutar la consulta en la base de datos
  connection.query(sql, id, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al borrar los datos de la tabla personas');
    } else if (result.affectedRows === 0) {
      res.status(404).send(`No se encontró ninguna persona con el ID ${id}`);
    } else {
      console.log(result);
      res.status(200).send(`Se borraron ${result.affectedRows} filas de la tabla personas`);
    }
  });
});

// Leer municipios
app.get('/municipios', (req, res) => {
  connection.query('SELECT * FROM municipios', (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al obtener los municipios');
     } else {
        res.send(result);
     }
  });
});


// Escribir municipios
app.post('/municipios', (req, res) => {
  const { nombre, area, presupuesto } = req.body;
  connection.query('INSERT INTO municipios (nombre, area, presupuesto) VALUES (?, ?, ?)', [nombre, area, presupuesto], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al crear el municipio');
     } else {
        res.send('Municipio creado exitosamente');
     }
  });
});

//Acutualizar Municipios
app.put('/municipios/:id_mun', (req, res) => {
  const id = req.params.id_mun;
  const { nombre, area, presupuesto } = req.body;
  connection.query('UPDATE municipios SET nombre = ?, area = ?, presupuesto = ? WHERE id_mun = ?', [nombre, area, presupuesto, id], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al actualizar el municipio');
     } else {
        res.send('Municipio actualizado exitosamente');
     }
  });
});


//Borrar municipios
app.delete('/municipios/:id_mun', (req, res) => {
  const id = req.params.id_mun;
  connection.query('DELETE FROM municipios WHERE id_mun = ?', id, (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al borrar el municipio');
     } else {
        res.send('Municipio borrado exitosamente');
     }
  });
});

//Leer viviendas
app.get('/viviendas', (req, res) => {
  connection.query('SELECT * FROM viviendas', (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al obtener las viviendas');
     } else {
        res.send(result);
     }
  });
});

//Crear viviendas
app.post('/viviendas', (req, res) => {
  const { direccion, capacidad, niveles, municipioid } = req.body;
  connection.query('INSERT INTO viviendas (direccion, capacidad, niveles, municipioid) VALUES (?, ?, ?, ?)', [direccion, capacidad, niveles, municipioid], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al crear la vivienda');
     } else {
        res.send('Vivienda creada exitosamente');
     }
  });
});

//Acutualizar viviendas
app.put('/viviendas/:id_viv', (req, res) => {
  const id = req.params.id_viv;
  const { direccion, capacidad, niveles, municipioid } = req.body;
  connection.query('UPDATE viviendas SET direccion = ?, capacidad = ?, niveles = ?, municipioid = ? WHERE id_viv = ?', [direccion, capacidad, niveles, municipioid, id], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al actualizar la vivienda');
     } else {
        res.send('Vivienda actualizada exitosamente');
     }
  });
});

//Borrar viviendas
app.delete('/viviendas/:id_viv', (req, res) => {
  const id = req.params.id_viv;
  connection.query('DELETE FROM viviendas WHERE id_viv = ?', id, (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al borrar la vivienda');
     } else {
        res.send('Vivienda borrada exitosamente');
     }
  });
});

// Leer personas con vivienda
app.get('/personas_con_vivienda', (req, res) => {
  connection.query('SELECT * FROM personas_con_vivienda', (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al obtener las personas con vivienda');
     } else {
        res.send(result);
     }
  });
});

//Escribir personas con vivienda
app.post('/personas_con_vivienda', (req, res) => {
  const { personaid_persona, viviendaid_vivienda } = req.body;
  connection.query('INSERT INTO personas_con_vivienda (personaid_persona, viviendaid_vivienda) VALUES (?, ?)', [personaid_persona, viviendaid_vivienda], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al crear la relación entre persona y vivienda');
     } else {
        res.send('Relación creada exitosamente');
     }
  });
});

// Actualizar personas con vivienda
app.put('/personas_con_vivienda/:id_persona/:id_vivienda', (req, res) => {
  const personaid = req.params.id_persona;
  const viviendaid = req.params.id_vivienda;
  const { personaid_persona, viviendaid_vivienda } = req.body;
  connection.query('UPDATE personas_con_vivienda SET personaid_persona = ?, viviendaid_vivienda = ? WHERE personaid_persona = ? AND viviendaid_vivienda = ?', [personaid_persona, viviendaid_vivienda, personaid, viviendaid], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al actualizar la relación entre persona y vivienda');
     } else {
        res.send('Relación actualizada exitosamente');
     }
  });
});

// Borrar personas con vivienda
app.delete('/personas_con_vivienda/:id_persona/:id_vivienda', (req, res) => {
  const personaid = req.params.id_persona;
  const viviendaid = req.params.id_vivienda;
  connection.query('DELETE FROM personas_con_vivienda WHERE personaid_persona = ? AND viviendaid_vivienda = ?', [personaid, viviendaid], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al borrar la relación entre persona y vivienda');
     } else {
        res.send('Relación borrada exitosamente');
     }
  });
});

// Leer Gobernates
app.get('/gobernantes', (req, res) => {
  connection.query('SELECT * FROM gobernantes', (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al obtener los gobernantes');
     } else {
        res.send(result);
     }
  });
});

// Crear Gobernantes
app.post('/gobernantes', (req, res) => {
  const { id_persona, id_mun } = req.body;
  connection.query('INSERT INTO gobernantes (id_persona, id_mun) VALUES (?, ?)', [id_persona, id_mun], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send('Error al agregar un nuevo gobernante');
     } else {
        res.send('Nuevo gobernante agregado exitosamente');
     }
  });
});

// Actualizar Gobernates
app.put('/gobernantes/:id', (req, res) => {
  const id = req.params.id;
  const { id_persona, id_mun } = req.body;
  connection.query('UPDATE gobernantes SET id_persona = ?, id_mun = ? WHERE id = ?', [id_persona, id_mun, id], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send(`Error al actualizar el gobernante con id ${id}`);
     } else if (result.affectedRows === 0) {
        res.status(404).send(`No se encontró ningún gobernante con id ${id}`);
     } else {
        res.send('Gobernante actualizado exitosamente');
     }
  });
});

// Borrar gobernates
app.delete('/gobernantes/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM gobernantes WHERE id = ?', id, (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send(`Error al borrar el gobernante con id ${id}`);
     } else if (result.affectedRows === 0) {
        res.status(404).send(`No se encontró ningún gobernante con id ${id}`);
     } else {
        res.send('Gobernante borrado exitosamente');
     }
  });
});
