const express = require('express');
const router = express.Router();

const controller = require('../../controllers/goalsController');

router.get('/', controller.getGoals);

router.get('/:id', controller.getGoalById);

router.post('/', controller.addGoal);

module.exports = router;
