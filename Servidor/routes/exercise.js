const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const exerciseController = require ('../controller/exerciseController')

router.post(
  "/",
  auth,
  [check("name", "The name of the routine is required").not().isEmpty()],
  [check("seconds", "seconds are required").not().isEmpty()],
  check("routine", "The routine is mandatory").not().isEmpty(),
  exerciseController.createExercise
);


router.get(
    "/:routineId",
    auth,
    exerciseController.getExercise
)

router.put(
  "/:id",
  auth,
  exerciseController.updateExercise
)


module.exports = router;
