const express = require('express');
const { getEmpresas, createEmpresa } = require('../controllers/empresasController');

const router = express.Router();

router.get('/', getEmpresas);
router.post('/', createEmpresa);

module.exports = router;
