const { validateProductInput, validatePatch } = require("../models/product");

const db = new Map(); // in-memory store
let nextId = 1;

const ALLOWED_FIELDS = ["name", "price", "category", "description"];

function sanitize(input) {
  return Object.fromEntries(
    ALLOWED_FIELDS.filter(k => k in input).map(k => [k, input[k]])
  );
}

function list() {
  return Array.from(db.values());
}

function get(id) {
  return db.get(id);
}

function create(product) {
  const errors = validateProductInput(product);
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const created = { id: String(nextId++), ...sanitize(product) };
  db.set(created.id, created);
  return created;
}

function update(id, patch) {
  const existing = db.get(id);
  if (!existing) return null;

  const errors = validatePatch(patch);
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const updated = { ...existing, ...sanitize(patch) };
  db.set(id, updated);
  return updated;
}

function search(query) {
  const q = query.toLowerCase();
  return Array.from(db.values()).filter(p => p.name.toLowerCase().includes(q));
}

function remove(id) {
  return db.delete(id);
}

module.exports = { list, get, search, create, update, remove };
