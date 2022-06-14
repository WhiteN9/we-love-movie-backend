const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const hasProperties = require("../errors/hasProperties");
// const hasRequiredProperties = hasProperties(
//   "review_score",
//   "review_content",
//   "review_critic_id",
//   "review_movie_id",
//   "review_created_at",
//   "review_updated_at"
// );

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };
  // console.log(updatedReview);
  const data = await service.update(updatedReview);
  console.log("Real return Data", data);
  res.status(201).json({ data: data });
}

async function destroy(req, res) {
  await service.delete(res.locals.review.review_id);
  res.status(204).json({ data: {} });
}

async function reviewExists(req, res, next) {
  // console.log(req.params.reviewId);
  const review = await service.read(req.params.reviewId);
  // console.log(review);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

module.exports = {
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
