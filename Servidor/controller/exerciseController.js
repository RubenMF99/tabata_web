const Exercise = require("../models/Exercise");
const Routine = require("../models/Routine");
const { validationResult } = require("express-validator");

exports.createExercise = async (req, res) => {
  console.log(req.body);
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { routine } = req.body;
    console.log(routine);
    const existsRoutine = await Routine.findById(routine);
    if (!existsRoutine) {
      res.status(404).json({ msg: "routines not found" });
    }

    if (existsRoutine.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not autorized" });
    }

    const exercise = new Exercise(req.body);
    await exercise.save();
    res.json({ exercise });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};

exports.getExercise = async (req, res) => {
  try {
    const { routineId } = req.params;
    const existsRoutine = await Routine.findById(routineId);
    if (!existsRoutine) {
      return res.status(404).json({ msg: "routines not found" });
    }

    if (existsRoutine.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not autorized" });
    }
    const exercises = await Exercise.find({ routine: routineId });
    let totalSeconds = 0;
    exercises.forEach((e) => {
      totalSeconds += e.seconds;
    });

    td =
      ((existsRoutine.break + totalSeconds) * 1 + existsRoutine.preparation) *
      1;
    res.json({ totalDuration: td, exercises: exercises });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const { routine, name, seconds } = req.body;
    console.log(routine);

    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({ msg: "exercise not found" });
    }

    const existsRoutine = await Routine.findById(routine);
    if (existsRoutine.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not autorized" });
    }
    const newExercise = {};
    if (name) newExercise.name = name;
    if (seconds) newExercise.seconds = seconds;

    exercise = await Exercise.findByIdAndUpdate(
      { _id: req.params.id },
      newExercise,
      { new: true }
    );
    res.json({ exercise });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};
