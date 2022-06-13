const service = require("./movies.service");

async function list(req, res) {
  //   console.log(req.query.is_showing);
  const is_showing = req.query.is_showing;
  if (is_showing) {
    const moviesList = await service.listShowingMovies();
    // console.log(movieList);
    res.json({ data: moviesList });
  } else {
    const moviesList = await service.list();
    res.json({ data: moviesList });
  }
}

async function read(req, res) {
  // console.log(res.locals.movie)
  res.json({ data: res.locals.movie });
}

async function listTheatersByMovie(req, res) {
  const theatersList = await service.listTheatersByMovie(req.params.movieId);
  // console.log(theatersList);
  res.json({ data: theatersList });
}

async function listReviewsByMovie(req, res) {
  const reviewsList = await service.listReviewsByMovie(req.params.movieId);
  // console.log(reviewsList);
  res.json({ data: reviewsList });
}

/////// MIDDLEWARE //////////

async function movieExists(req, res, next) {
  // console.log(req.params.movieId);
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

module.exports = {
  list,
  read: [movieExists, read],
  listTheatersByMovie: [movieExists, listTheatersByMovie],
  listReviewsByMovie: [movieExists, listReviewsByMovie],
};
