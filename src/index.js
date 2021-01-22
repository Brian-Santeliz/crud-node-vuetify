const express = require("express");
const path = require("path");
const morgan = require("morgan");
const database = require("./database/connection");
const router = require("./router/index");
const server = express();

server.set("puerto", 3000);
server.use(morgan("dev"));
server.use(express.static(path.join(__dirname, "/public")));
server.use(express.json());
server.use("/api", router);

server.listen(server.get("puerto"), async function () {
  console.log("Servidor corriendo en el puerto:", server.get("puerto"));
  try {
    await database.awaitConnect();
    console.log("Base de datos conectada");
  } catch (error) {
    console.log("Error en la conexión", error);
  }
});
