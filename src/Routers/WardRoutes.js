const express = require('express');
const router = express.Router()
const wardController = require('../Controllers/WardController');

router.post('/createWard', wardController.createWard),

module.exports = router
