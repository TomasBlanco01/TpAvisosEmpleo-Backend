const express = require('express');
const { getAvisos, getAvisoById, createAviso, deleteAviso} = require('../controllers/avisosController');

const router = express.Router();

router.get('/', getAvisos);
router.get('/:id', getAvisoById);
router.post('/', createAviso);
router.delete('/:id', deleteAviso);

module.exports = router;
