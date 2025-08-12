const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');

router.get('/', fileController.listFiles);
router.get('/:id', fileController.getFile);

module.exports = router;
