const { validateProductInput, validatePatch, VALID_CATEGORIES } = require("../../models/product");

// --- validateProductInput ---

test("valid product returns no errors", () => {
  expect(validateProductInput({ name: "Keyboard", price: 49.99 })).toEqual([]);
});

test("valid product with optional fields returns no errors", () => {
  expect(validateProductInput({ name: "Keyboard", price: 49.99, category: "electronics", description: "A great keyboard" })).toEqual([]);
});

test("invalid product returns errors", () => {
  const errors = validateProductInput({ name: "K", price: -1 });
  expect(errors.length).toBeGreaterThan(0);
});

test("null input returns error", () => {
  expect(validateProductInput(null)).toEqual(["Body must be a JSON object"]);
});

test("array input returns error", () => {
  expect(validateProductInput([])).toEqual(["Body must be a JSON object"]);
});

test("name too short returns error", () => {
  const errors = validateProductInput({ name: "a", price: 10 });
  expect(errors).toContain("name must be a string between 2 and 100 characters");
});

test("name too long returns error", () => {
  const errors = validateProductInput({ name: "a".repeat(101), price: 10 });
  expect(errors).toContain("name must be a string between 2 and 100 characters");
});

test("whitespace-only name returns error", () => {
  const errors = validateProductInput({ name: "   ", price: 10 });
  expect(errors).toContain("name must be a string between 2 and 100 characters");
});

test("price of NaN returns error", () => {
  const errors = validateProductInput({ name: "Keyboard", price: NaN });
  expect(errors).toContain("price must be a finite number greater than 0");
});

test("price of Infinity returns error", () => {
  const errors = validateProductInput({ name: "Keyboard", price: Infinity });
  expect(errors).toContain("price must be a finite number greater than 0");
});

test("price as numeric string returns error", () => {
  const errors = validateProductInput({ name: "Keyboard", price: "19.99" });
  expect(errors).toContain("price must be a finite number greater than 0");
});

test("invalid category returns error", () => {
  const errors = validateProductInput({ name: "Keyboard", price: 10, category: "invalid" });
  expect(errors.length).toBeGreaterThan(0);
});

test("valid category returns no errors", () => {
  expect(validateProductInput({ name: "Keyboard", price: 10, category: "electronics" })).toEqual([]);
});

test("description too long returns error", () => {
  const errors = validateProductInput({ name: "Keyboard", price: 10, description: "x".repeat(501) });
  expect(errors).toContain("description must be a string of at most 500 characters");
});

test("non-string description returns error", () => {
  const errors = validateProductInput({ name: "Keyboard", price: 10, description: 123 });
  expect(errors).toContain("description must be a string of at most 500 characters");
});

// --- validatePatch ---

test("empty patch returns no errors", () => {
  expect(validatePatch({})).toEqual([]);
});

test("patch with valid price only returns no errors", () => {
  expect(validatePatch({ price: 25 })).toEqual([]);
});

test("patch with invalid price returns error", () => {
  const errors = validatePatch({ price: -1 });
  expect(errors).toContain("price must be a finite number greater than 0");
});

test("patch with invalid name returns error", () => {
  const errors = validatePatch({ name: "a" });
  expect(errors).toContain("name must be a string between 2 and 100 characters");
});

test("patch with valid name only returns no errors", () => {
  expect(validatePatch({ name: "Mouse Pro" })).toEqual([]);
});

// --- VALID_CATEGORIES export ---

test("VALID_CATEGORIES is exported and non-empty", () => {
  expect(Array.isArray(VALID_CATEGORIES)).toBe(true);
  expect(VALID_CATEGORIES.length).toBeGreaterThan(0);
});
