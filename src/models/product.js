const VALID_CATEGORIES = ["electronics", "clothing", "food", "books", "other"];

function validateProductInput(input) {
  const errors = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return ["Body must be a JSON object"];
  }
  if (!input.name || typeof input.name !== "string" || input.name.trim().length < 2 || input.name.trim().length > 100) {
    errors.push("name must be a string between 2 and 100 characters");
  }
  if (typeof input.price !== "number" || !isFinite(input.price) || input.price <= 0) {
    errors.push("price must be a finite number greater than 0");
  }
  if (input.category !== undefined) {
    if (typeof input.category !== "string" || !VALID_CATEGORIES.includes(input.category)) {
      errors.push(`category must be one of: ${VALID_CATEGORIES.join(", ")}`);
    }
  }
  if (input.description !== undefined) {
    if (typeof input.description !== "string" || input.description.length > 500) {
      errors.push("description must be a string of at most 500 characters");
    }
  }
  return errors;
}

function validatePatch(patch) {
  const errors = [];
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
    return ["Body must be a JSON object"];
  }
  if (patch.name !== undefined) {
    if (typeof patch.name !== "string" || patch.name.trim().length < 2 || patch.name.trim().length > 100) {
      errors.push("name must be a string between 2 and 100 characters");
    }
  }
  if (patch.price !== undefined) {
    if (typeof patch.price !== "number" || !isFinite(patch.price) || patch.price <= 0) {
      errors.push("price must be a finite number greater than 0");
    }
  }
  if (patch.category !== undefined) {
    if (typeof patch.category !== "string" || !VALID_CATEGORIES.includes(patch.category)) {
      errors.push(`category must be one of: ${VALID_CATEGORIES.join(", ")}`);
    }
  }
  if (patch.description !== undefined) {
    if (typeof patch.description !== "string" || patch.description.length > 500) {
      errors.push("description must be a string of at most 500 characters");
    }
  }
  return errors;
}

module.exports = { validateProductInput, validatePatch, VALID_CATEGORIES };
