const service = require("./movies.service");

async function list(req, res) {
  console.log(req.query.is_showing);
  const movieList = req.query.is_showing
    ? await service.list(req.query.is_showing)
    : await service.list();
  res.json({ data: movieList });
}

module.exports = {
  list,
};
