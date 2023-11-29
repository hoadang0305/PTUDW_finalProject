const express = require('express');
const router = express.Router()
const formController = require('../Controllers/form.controllers');

router.post('/createForm', formController.createForm),

module.exports = router
