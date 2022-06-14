const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsDelete = cors({ methods: "DELETE" });

router
  .route("/:reviewId")
  .put(controller.update)
  .delete(corsDelete, controller.delete)
  .options(corsDelete)
  .all(methodNotAllowed);

module.exports = router;
