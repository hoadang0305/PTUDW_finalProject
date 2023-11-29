const express = require('express');
const router = express.Router()
const posController = require('../Controllers/position.controllers');

router.post('/createTypePos', posController.createTypePos),

module.exports = router
