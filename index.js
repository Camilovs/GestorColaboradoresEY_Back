const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const apiRouter = require("./routes/api");
require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.listen(8080, () => {
  console.log("Servidor corriendo en puerto 3000");
});
