const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//This object below is a configuration to be passed into mapProperties() function
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function update(updatedReview) {
  return knex("reviews AS r")
    .join("critics AS c", "c.critic_id", "=", "r.critic_id")
    .select("*")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview)
    .returning("*")

    .then((updatedRecord) => updatedRecord[0])
    .then((updatedRecord) => addCritic(updatedRecord));
  // .then((updatedReview) => {
  //   return { data: updatedReview };
  // })
  // .then((updatedRecord) => addCritic(updatedRecord))
}

function destroy(review_id) {
  return knex("reviews").where({ review_id: review_id }).del();
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}
module.exports = { update, delete: destroy, read };
