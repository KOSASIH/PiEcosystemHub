// src/main/routes/dAppRoutes.js

const express = require('express');
const { getAllDApps, createDApp } = require('../controllers/dAppController');
const router = express.Router();

router.get('/', getAllDApps);
router.post('/', createDApp);

module.exports = router;
