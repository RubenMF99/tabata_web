const express = require("express");
const router = express.Router();
const routineController = require("../controller/routineController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/",
  auth,
  [check("name", "The name of the routine is required").not().isEmpty()],
  [check("break", "rest time is mandatory").not().isEmpty()],
  [check("preparation", "preparation time is mandatory").not().isEmpty()],
  routineController.createRoutine
);

router.get("/", auth, routineController.getRoutine);

router.put(
  "/:id",
  auth,
  [check("name", "The name of the routine is required").not().isEmpty()],
  routineController.updateRoutine
);

router.delete(
    "/:id",
    auth,
    routineController.deleteRoutines
)




module.exports = router;
