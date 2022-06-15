const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//put the key-value pair properties into one object 
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function list() {
  return knex("movies").select();
}

function listShowingMovies() {
  return (
    knex("movies AS m")
      .join("movies_theaters AS mt", "mt.movie_id", "=", "m.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true })
      .groupBy("m.movie_id")
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
  return (
    knex("movies AS m")
      .join("reviews AS r", "r.movie_id", "=", "m.movie_id")
      .join("critics AS c", "c.critic_id", "=", "r.critic_id")
      .select("r.*", "c.*")
      .where({ "r.movie_id": movie_id })
      .then((datas) => {
        return datas.map((data) => {
          return addCritic(data);
        });
      })
  );
}

module.exports = {
  list,
  listShowingMovies,
  read,
  listTheatersByMovie,
  listReviewsByMovie,
};
