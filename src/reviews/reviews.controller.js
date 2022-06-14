const service = require("./reviews.service");

async function update(req, res) {
  res.json({ data: data });
}

async function destroy(req, res) {
  res.json({ data: data });
}

module.exports = { update, delete: [destroy] };
