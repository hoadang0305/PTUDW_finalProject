const express = require('express');
const router = express.Router()
const districtController = require('../Controllers/DistrictController');

router.post('/createDistrict', districtController.createDistrict),

module.exports = router
