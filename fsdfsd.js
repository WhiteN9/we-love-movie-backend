const mapProperties = require("../utils/map-properties");

const addCategory = mapProperties({
  category_id: "category.category_id",
  category_name: "category.category_name",
  category_description: "category.category_description",
});

function read(product_id) {
  return knex("products as p")
    .join("products_categories as pc", "p.product_id", "pc.product_id")
    .join("categories as c", "pc.category_id", "c.category_id")
    .select("p.*", "c.*")
    .where({ "p.product_id": product_id })
    .first()
    .then((category) => addCategory(category));
}
