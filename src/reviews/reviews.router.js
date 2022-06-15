const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsOptions = cors({ methods: ["PUT", "DELETE"] });

router
  .route("/:reviewId")
  .put(corsOptions, controller.update)
  .delete(corsOptions, controller.delete)

  .all(methodNotAllowed);

module.exports = router;
