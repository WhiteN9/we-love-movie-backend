const knex = require("../db/connection");

function list() {
  return knex("movies AS m").select("*");
}

function listShowingMovies() {
  return knex("movies AS m")
    .join("movies_theaters AS mt", "mt.movie_id", "=", "m.movie_id")

    .select("*")
    .where({ is_showing: true });
}

module.exports = {
  list,
  listShowingMovies,
};
