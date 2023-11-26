const express = require('express');
const router = express.Router()
const pointController = require('../Controllers/cityzen.controllers');

router.post('/uploadPoint', pointController.createPoint),
router.get('/getAllPoint', pointController.getAllPoint)
router.delete('/deletePoint/:id', pointController.deletePoint),

module.exports = router
