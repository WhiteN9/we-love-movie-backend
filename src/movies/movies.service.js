const knex = require("../db/connection");

function list(status) {
  return knex("movies AS m")
    .join("movies_theater AS mt", "mt.movie_id", "=", "m.movies")
    .select("*");
}

module.exports = {
  list,
};
