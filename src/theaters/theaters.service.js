const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

function list() {
  return knex("theaters AS t")
    .join("movies_theaters AS mt", "mt.theater_id", "=", "t.theater_id")
    .join("movies AS m", "m.movie_id", "=", "mt.movie_id")
    .select("*");
}

module.exports = { list };
