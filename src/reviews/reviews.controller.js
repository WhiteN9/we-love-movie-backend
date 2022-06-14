const service = require("./reviews.service");

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };
  // console.log(updatedReview);
  const data = await service.update(updatedReview);
  console.log(data);
  res.json({ data: data });
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
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
