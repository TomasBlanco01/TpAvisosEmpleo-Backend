const express = require('express');
const { getAvisos, getAvisoById, createAviso } = require('../controllers/avisosController');

const router = express.Router();

router.get('/', getAvisos);
router.get('/:id', getAvisoById);
router.post('/', createAviso);

module.exports = router;
