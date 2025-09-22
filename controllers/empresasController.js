const pool = require('../db/connection');

const getEmpresas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empresas ORDER BY nombre ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener empresas" });
  }
};

const createEmpresa = async (req, res) => {
  const { nombre, email, descripcion } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO empresas (nombre, email, descripcion) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear empresa" });
  }
};

module.exports = { getEmpresas, createEmpresa };
