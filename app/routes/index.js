const express = require('express');

const bmiRouter = require('./api/bmi');

const router = new express.Router();

router.use('/v1/bmi',bmiRouter);

module.exports = router;
