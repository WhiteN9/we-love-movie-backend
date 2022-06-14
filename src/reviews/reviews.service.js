const knex = require("../db/connection");

function update(review_id) {
  return knex("reviews").select("*");
}

function destroy(review_id) {
  return knex("reviews").where({ review_id: review_id }).del();
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}
module.exports = { update, delete: destroy, read };
