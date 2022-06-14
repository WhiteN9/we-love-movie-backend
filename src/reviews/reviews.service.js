const knex = require("../db/connection");

function update(review_id) {
  return knex("reviews").select("*");
}

function destroy(review_id) {
  return knex("reviews").select("*");
}

module.exports = { update, delete: [destroy] };
