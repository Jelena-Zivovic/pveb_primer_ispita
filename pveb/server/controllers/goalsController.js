const mongoose = require('mongoose');
const Goal = require('../models/goalModel');

module.exports.getGoals = async (req, res, next) => {
    try {
        const goals = await Goal.find({}).exec();

        res.status(200).json(goals);
    }
    catch(error) {
        next(error);
    }
};

module.exports.getGoalById = async (req, res, next) => {
    try {
        const goal = await Goal.find({_id: req.params.id}).exec();
        if (goal) {
            res.status(200).json(goal);
        }
        else {
            res.status(500).json({message: "cannot find goal"});
        }
    } catch(error) {
        next(error)
    }
};

module.exports.addGoal = async (req, res, next) => {

    let newGoal = new Goal({
        _id: new mongoose.Types.ObjectId(),
        naziv: req.body.naziv,
        opis: req.body.opis,
        vaznost: req.body.vaznost
    });

    try {
        let retValue = await newGoal.save();

        if (retValue) {
            res.status(200).json(newGoal);
        }
        else {
            res.status(400).json({message: "cannot add goal"});
        }
    } catch(error) {
        next(error);
    }

};