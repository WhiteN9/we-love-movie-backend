const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsOptions = cors({ methods: "GET" });

router
  .route("/")
  .get(corsOptions, controller.list)
  .options(corsOptions)
  .all(methodNotAllowed);

router.route("/:movieId").get(cors(), controller.read).all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(controller.listTheatersByMovie)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviewsByMovie)
  .all(methodNotAllowed);

module.exports = router;
