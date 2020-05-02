const router = require("express").Router();
const Workout = require("../models/workout.js");
var path = require("path");

router.post("/api/workouts", ({ body }, res) => {
  //create a workout
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", function(req, res) {
    // adds an exercise to this workout

    if (req.body.name != ""){ //prevents extraneous blank entries
      var new_exercise = {
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        distance: req.body.distance,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets
      }
      Workout.updateOne(
        {_id: req.params.id},
        {$push: {exercises: new_exercise}}
      ).then(function(dbWorkout) {
        res.json(dbWorkout);
      });
    }
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

router.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});



module.exports = router;
