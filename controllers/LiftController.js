const db = require("../models/index.js");

class LiftController {

    getLiftById(req, res) {
        db.Lifts.findOne({
            where: {
                userId: req.body.userId,
            }
        })
        .then((lift) => {
            res.json(lift);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getLiftsByUser(req, res) {
        db.Lifts.findAll({
            where: {
                userId: req.params.userId,
            }
        })
        .then((lifts) => {
            res.json(lifts);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    createLift(req, res) {
        db.Lifts.create(req.body.liftData)
        .then((lift) => {
            res.json(lift);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    updateLiftById(req, res) {
        db.Lifts.update(
            req.body,
            { where: {
                id: req.body.id,
                userId: req.body.userId,
            }}
        )
        .then((lift) => {
            res.json(lift);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteLiftById(req, res) {
        db.Lifts.destroy(
            { where: {
                id: req.query.liftId,
                userId: req.query.userId,
            }}
        )
        .then((lift) => {
            res.json(lift);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

module.exports = LiftController;