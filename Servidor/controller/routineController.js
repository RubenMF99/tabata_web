const Routine = require("../models/Routine");
const Exercise = require("../models/Exercise");
const { validationResult } = require("express-validator");

exports.createRoutine = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  
  try {
    const routine = new Routine(req.body);
    routine.creator = req.user.id;
    routine.save();
    res.json(routine);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};

exports.getRoutine = async (req, res) => {
  try {
    const routine = await Routine.find({ creator: req.user.id }).sort({
      date: -1,
    });
    
    res.json({ routine });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};

exports.updateRoutine = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { name } = req.body;
  const newRoutine = {};
  if (name) {
    newRoutine.name = name;
  }

  try {
    let routine = await Routine.findById(req.params.id);

    if (!routine) {
      return res.status(404).json({ msg: "Routines not found" });
    }

    if (routine.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    routine = await Routine.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newRoutine },
      { new: true }
    );
    res.json({ routine });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};

exports.deleteRoutines = async (req, res) => {
  try {
    let routines = await Routine.findById(req.params.id);

    if (!routines) {
      return res.status(404).json({ msg: "Rotines not found" });
    }

    if (routines.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not autorized" });
    }

    await Routine.findOneAndRemove({_id: req.params.id});
    res.json({ msg: "Routines delete" });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a mistake");
  }
};
