const mongoose = require('mongoose');
const Step = require('../models/stepModel');

module.exports.getStepsForGoal = async (req, res, next) => {

    try {
        const steps = await Step.find({cilj: req.params.id}).exec();

        res.status(200).json(steps);
    } catch (error) {
        next(error);
    }

};

module.exports.addStep = async (req, res, next) => {

    let newStep = new Step({
        _id: new mongoose.Types.ObjectId(),
        cilj: req.body.cilj,
        redniBroj: req.body.redniBroj,
        opis: req.body.opis
    });

    try {
        const value = await newStep.save();
        if (value) {
            res.status(200).json(value);

        }
        else {
            res.status(400).json({message: "cannot add step"});
        }
    } catch(error) {
        next(error);
    }

};