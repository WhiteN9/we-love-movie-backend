const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//This object below is a configuration to be passed into mapProperties() function
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function update(updatedReview) {
  return knex("reviews AS r")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview)
    .then(() => {
      return knex("reviews AS r")
        .join("critics AS c", "c.critic_id", "=", "r.critic_id")
        .select("*")
        .where({ "r.review_id": updatedReview.review_id });
    })
    .then((updatedRecord) => updatedRecord[0])
    .then((updatedRecord) => addCritic(updatedRecord));
}

function destroy(review_id) {
  return knex("reviews").where({ review_id: review_id }).del();
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}
module.exports = { update, delete: destroy, read };
