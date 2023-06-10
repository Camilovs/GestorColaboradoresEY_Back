const { Router } = require("express");
const { ItemConocimiento } = require("../../db");

const router = Router();

router.get("/", async (req, res) => {
  const item = await ItemConocimiento.findAll();
  res.json(item);
});
router.post("/", async (req, res) => {
  const item = await ItemConocimiento.create(req.body);
  res.json(item);
});
router.put("/:itemId", async (req, res) => {
  const item = await ItemConocimiento.update(req.body, {
    where: { ID: req.params.itemId },
  });
  res.json(item);
});
router.delete("/:itemId", async (req, res) => {
  await ItemConocimiento.destroy({
    where: { id: req.params.itemId },
  });
  res.send("ok");
});

router.post("/examples", async (req, res) => {
  const items = [
    { nombre: "Inteligencia de Negocios" },
    { nombre: "Integracion de datos" },
    { nombre: "Big Data" },
    { nombre: "Data Lakes" },
    { nombre: "Data Factory" },
    { nombre: "Data Sciencie" },
    { nombre: "Data Engineering" },
    { nombre: "Full Stack" },
    { nombre: "Python" },
    { nombre: "Machine Learning" },
    { nombre: "R" },
    { nombre: "Salud" },
  ];

  await ItemConocimiento.bulkCreate(items);
  res.send("ok");
});

module.exports = router;
