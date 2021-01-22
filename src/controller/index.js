const database = require("../database/connection");
const get = async (req, res) => {
  try {
    const datos = await database.awaitQuery("SELECT * FROM libros");
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json(error);
  }
};
const post = async (req, res) => {
  const { autor, titulo, año } = req.body;
  try {
    await database.awaitQuery(
      "INSERT INTO libros (autor, titulo, año) VALUES (?, ? , ?)",
      [autor, titulo, año]
    );
    res.status(201).json("Libro agregado");
  } catch (error) {
    res.status(500).json(error);
  }
};
const put = async (req, res) => {
  const { id } = req.params;
  const { autor, titulo, año } = req.body;
  try {
    await database.awaitQuery(
      "UPDATE libros SET autor = ?, titulo = ?, año = ? WHERE id = ? ",
      [autor, titulo, año, id]
    );
    res.status(201).json("Actualizado");
  } catch (error) {
    res.status(500).json(error);
  }
};
const Delete = async (req, res) => {
  const { id } = req.params;
  try {
    await database.awaitQuery("DELETE FROM libros WHERE id = ?", [id]);
    res.status(200).json("Eliminado");
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  get,
  post,
  put,
  Delete,
};
