const knex = require("../db/connection");

function list() {
  return knex("movies AS m").select("*");
}

function listShowingMovies() {
  return (
    knex("movies AS m")
      .join("movies_theaters AS mt", "mt.movie_id", "=", "m.movie_id")
      //might need to select matching column with groupBy depend on PostgreSQL
      .select("*")
      .where({ "mt.is_showing": true })
      .groupBy("mt.movie_id")
  );
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

function listTheatersByMovie(movie_id) {
  return knex("movies AS m")
    .join("movies_theaters AS mt", "mt.movie_id", "=", "m.movie_id")
    .join("theaters AS t", "t.theater_id", "=", "mt.theater_id")
    .select("*")
    .where({ "mt.movie_id": movie_id });
}

function listReviewsByMovie(movie_id) {
  return knex("movies AS m")
    .join("reviews AS r", "r.movie_id", "=", "m.movie_id")
    .join("critics AS c", "c.critic_id", "=", "r.critic_id")
    .select("r.*", "c.organization_name", "c.preferred_name", "c.surname")
    .where({ "r.movie_id": movie_id });
}

module.exports = {
  list,
  listShowingMovies,
  read,
  listTheatersByMovie,
  listReviewsByMovie,
};
