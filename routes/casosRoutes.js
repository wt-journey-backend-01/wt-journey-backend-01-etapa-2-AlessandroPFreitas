const express = require('express')
const router = express.Router();
const casosController = require('../controllers/casosController');

// define a rota para /casos usando o método GET
router.get('/casos', casosController.getAllCasos)

router.get('/casos/:id', casosController.getIdCasos)

router.post('/casos', casosController.createCaso);

module.exports = router