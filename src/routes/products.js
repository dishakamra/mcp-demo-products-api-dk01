const express = require("express");
const productService = require("../services/productService");

const router = express.Router();
 
router.get("/", (req, res) => {
  if (req.query.limit !== undefined) {
    const limit = Number(req.query.limit);
    if (!Number.isInteger(limit) || limit < 0) {
      return res.status(400).json({ error: "limit must be a non-negative integer" });
    }
  }
  const limit = Number(req.query.limit || 0);
  const all = productService.list();
  const result = limit > 0 ? all.slice(0, limit) : all;
  res.json(result);
});


router.get("/search", (req, res) => {
  const q = req.query.q;
  if (!q || typeof q !== "string" || q.trim().length === 0) {
    return res.status(400).json({ error: "q must be a non-empty string" });
  }
  const results = productService.search(q.trim());
  res.json(results);
});

router.get("/:id", (req, res) => {
  const product = productService.get(req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

router.post("/", (req, res) => {
  if (!req.is("application/json")) {
    return res.status(415).json({ error: "Content-Type must be application/json" });
  }
  try {
    const created = productService.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    if (e.status === 400) return res.status(400).json({ error: e.message, details: e.details });
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.put("/:id", (req, res) => {
  if (!req.is("application/json")) {
    return res.status(415).json({ error: "Content-Type must be application/json" });
  }
  try {
    const updated = productService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (e) {
    if (e.status === 400) return res.status(400).json({ error: e.message, details: e.details });
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.delete("/:id", (req, res) => {
  const ok = productService.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});

module.exports = router;
