const { Router } = require("express");
const { get, post, put, Delete } = require("../controller/");
const router = Router();
router.get("/libros", get);
router.post("/libros", post);
router.put("/libros/:id", put);
router.delete("/libros/:id", Delete);

module.exports = router;
