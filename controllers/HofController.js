const db = require("../models/index.js");
const sequelize = require("sequelize");

class HofController {

    getMaxWorkouts(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS workouts, firstName FROM Workouts GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(max => {
                res.json(max);
            });
    }

    getLongestRun(req, res) {
        db.sequelize.query("SELECT MAX(distance) AS distance, firstName FROM workouts WHERE workoutType = 'run'", { type: sequelize.QueryTypes.SELECT })
            .then(run => {
                res.json(run);
            });
    }

    getMaxClimb(req, res) {
        db.sequelize.query("SELECT MAX(climb) AS climb, firstName FROM workouts", { type: sequelize.QueryTypes.SELECT })
            .then(climb => {
                res.json(climb);
            });
    }

    getMaxPushups(req, res) {
        db.sequelize.query("SELECT MAX(pushups) AS pushups, firstName FROM workouts", { type: sequelize.QueryTypes.SELECT })
            .then(pushups => {
                res.json(pushups);
            });
    }

    getMaxPullups(req, res) {
        db.sequelize.query("SELECT MAX(pullups) AS pullups, firstName FROM workouts", { type: sequelize.QueryTypes.SELECT })
            .then(pullups => {
                res.json(pullups);
            });
    }

    getMaxGoggins(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS goggins, firstName FROM workouts WHERE generator = 'Goggins'", { type: sequelize.QueryTypes.SELECT })
            .then(goggins => {
                res.json(goggins);
            });
    }

    getMaxRaces(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS race, firstName FROM workouts WHERE runType = 'Race' GROUP BY firstName", { type: sequelize.QueryTypes.SELECT })
            .then(races => {
                res.json(races);
            });
    }

    getTotalTime(req, res) {
        db.sequelize.query("", { type: sequelize.QueryTypes.SELECT })
            .then(time => {
                res.json(time);
            });
    }

    getRainyDays(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS days, firstName FROM workouts WHERE weather = 'Heavy Rain'", { type: sequelize.QueryTypes.SELECT })
            .then(days => {
                res.json(days);
            });
    }

    getSwims(req, res) {
        db.sequelize.query("SELECT COUNT(id) AS swims, firstName FROM workouts WHERE workoutType = 'swim'", { type: sequelize.QueryTypes.SELECT })
            .then(swims => {
                res.json(swims);
            });
    }
}

module.exports = HofController;