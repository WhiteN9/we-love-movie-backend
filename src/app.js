if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

app.use(express.json());

//App routers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

//Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
