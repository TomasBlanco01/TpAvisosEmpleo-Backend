import pool from '../db/connection.js';

const getAvisos = async (req, res) => {
  try {
    const { ubicacion, tipo_contrato } = req.query;
    let query = `
      SELECT a.id, a.titulo, a.descripcion, a.ubicacion, a.tipo_contrato,
             a.fecha_publicacion, e.nombre AS empresa
      FROM avisos a
      INNER JOIN empresas e ON a.empresa_id = e.id
      WHERE 1=1
    `;
    const params = [];

    if (ubicacion) {
      query += ` AND a.ubicacion = $${params.length + 1}`;
      params.push(ubicacion);
    }

    if (tipo_contrato) {
      query += ` AND a.tipo_contrato = $${params.length + 1}`;
      params.push(tipo_contrato);
    }

    query += ' ORDER BY a.fecha_publicacion DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener avisos" });
  }
};

const getAvisoById = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, e.nombre AS empresa, e.email, e.descripcion AS empresa_descripcion
      FROM avisos a
      INNER JOIN empresas e ON a.empresa_id = e.id
      WHERE a.id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener aviso" });
  }
};

const createAviso = async (req, res) => {
  const { titulo, descripcion, ubicacion, tipo_contrato, empresa } = req.body;

  try {
    let empresaResult = await pool.query('SELECT id FROM empresas WHERE nombre = $1', [empresa.nombre]);
    let empresaId;

    if (empresaResult.rows.length === 0) {
      const newEmpresa = await pool.query(
        'INSERT INTO empresas (nombre, email, descripcion) VALUES ($1, $2, $3) RETURNING id',
        [empresa.nombre, empresa.email || null, empresa.descripcion || null]
      );
      empresaId = newEmpresa.rows[0].id;
    } else {
      empresaId = empresaResult.rows[0].id;
    }

    const newAviso = await pool.query(
      `INSERT INTO avisos (titulo, descripcion, ubicacion, tipo_contrato, empresa_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [titulo, descripcion, ubicacion, tipo_contrato, empresaId]
    );

    res.status(201).json(newAviso.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear aviso" });
  }
};

const deleteAviso = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM avisos WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    res.status(200).json({ message: "Aviso eliminado", aviso: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar aviso" });
  }
};


export { getAvisos, getAvisoById, createAviso, deleteAviso };
