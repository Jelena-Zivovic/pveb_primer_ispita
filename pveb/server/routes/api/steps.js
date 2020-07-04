const express = require('express');
const router = express.Router();

const controller = require('../../controllers/stepsController');

router.get('/:id', controller.getStepsForGoal);
router.post('/', controller.addStep);

module.exports = router;