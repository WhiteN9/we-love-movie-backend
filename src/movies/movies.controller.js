const service = require("./movies.service");

async function list(req, res) {
  //   console.log(req.query.is_showing);
  const is_showing = req.query.is_showing;
  if (is_showing) {
    const movieList = await service.listShowingMovies();
    // console.log(movieList);
    res.json({ data: movieList });
  } else {
    const movieList = await service.list();
    res.json({ data: movieList });
  }
}
module.exports = {
  list,
};
