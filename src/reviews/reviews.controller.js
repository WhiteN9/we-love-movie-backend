const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//update a review, and then return the updated record with the critic's information
async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };
  const data = await service.update(updatedReview);
  res.status(201).json({ data: data });
}

//delete a review by its id
async function destroy(req, res) {
  await service.delete(res.locals.review.review_id);
  res.status(204).json({ data: {} });
}

/////// MIDDLEWARE //////////
//check if the review exists by the review id
async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
