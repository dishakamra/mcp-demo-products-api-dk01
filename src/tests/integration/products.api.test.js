const request = require("supertest");
const app = require("../../server")

test("CRUD flow", async () => {
  // Create
  const created = await request(app)
    .post("/products")
    .send({ name: "Mouse", price: 19.99 })
    .expect(201);

  const id = created.body.id;

  // List
  const list = await request(app).get("/products").expect(200);
  expect(list.body.length).toBeGreaterThan(0);

  // Get
  await request(app).get(`/products/${id}`).expect(200);

  // Update
  await request(app).put(`/products/${id}`).send({ name: "Mouse Pro", price: 29.99 }).expect(200);

  // Delete
  await request(app).delete(`/products/${id}`).expect(204);
});

test("validation returns 400", async () => {
  await request(app).post("/products").send({ name: "A", price: 0 }).expect(400);
});

test("search returns matching products", async () => {
  await request(app).post("/products").send({ name: "SearchMouse", price: 19.99 });
  const res = await request(app).get("/products/search?q=SearchMouse").expect(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].name).toBe("SearchMouse");
});

test("search is case-insensitive", async () => {
  await request(app).post("/products").send({ name: "SearchKeyboard", price: 49.99 });
  const res = await request(app).get("/products/search?q=searchkeyboard").expect(200);
  expect(res.body.length).toBeGreaterThan(0);
});

test("search returns empty array when no match", async () => {
  const res = await request(app).get("/products/search?q=zzznomatch").expect(200);
  expect(res.body).toEqual([]);
});

test("search without q returns 400", async () => {
  await request(app).get("/products/search").expect(400);
});

test("search with empty q returns 400", async () => {
  await request(app).get("/products/search?q=").expect(400);
});
