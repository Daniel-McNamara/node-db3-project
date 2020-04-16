const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db
    .select(
      "schemes.scheme_name",
      "steps.id",
      "steps.step_number",
      "steps.instructions"
    )
    .from("steps")
    .join("schemes", "schemes.id", "=", "steps.scheme_id")
    .where("schemes.id", "=", id)
    .orderBy("steps.step_number");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(() => {
      return db("schemes")
        .where({ scheme_name: scheme.scheme_name })
        .first();
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  const scheme = findById(id);
  db("schemes")
    .where({ id })
    .del();
  return scheme;
}