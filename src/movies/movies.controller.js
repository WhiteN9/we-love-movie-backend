const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//displays all movies or only movies that are showing depending on the query
async function list(req, res) {
  const is_showing = req.query.is_showing;
  if (req.query.is_showing) {
    const moviesList = await service.listShowingMovies();
    res.json({ data: moviesList });
  } else {
    const moviesList = await service.list();
    res.json({ data: moviesList });
  }
}

//displays the individual movie information
async function read(req, res) {
  res.json({ data: res.locals.movie });
}

//displays a list of theaters by the movie id
async function listTheatersByMovie(req, res) {
  const theatersList = await service.listTheatersByMovie(req.params.movieId);
  res.json({ data: theatersList });
}

//displays a list of reviews by the movie id,
//including the critic's details as a subcategory to each review
async function listReviewsByMovie(req, res) {
  const reviewsList = await service.listReviewsByMovie(req.params.movieId);
  res.json({ data: reviewsList });
}

/////// MIDDLEWARE //////////
//check if the movie exists by the movie id
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersByMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheatersByMovie),
  ],
  listReviewsByMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviewsByMovie),
  ],
};
