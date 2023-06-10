const { Router } = require("express");
const { ItemRubro } = require("../../db");

const router = Router();

router.get("/", async (req, res) => {
  const rubros = await ItemRubro.findAll();
  res.json(rubros);
});
router.post("/", async (req, res) => {
  const rubro = await ItemRubro.create(req.body);
  res.json(rubro);
});
router.put("/:rubroId", async (req, res) => {
  const rubro = await ItemRubro.update(req.body, {
    where: { ID: req.params.rubroId },
  });
  res.json(rubro);
});
router.post("/examples", async (req, res) => {
  const rubros = [
    { nombre: "Mineria" },
    { nombre: "Retail" },
    { nombre: "Bancaria" },
    { nombre: "Agricola" },
    { nombre: "Industrial" },
    { nombre: "Financiera" },
    { nombre: "Publica" },
    { nombre: "Gobierno" },
    { nombre: "Educacion" },
    { nombre: "Tecnologia" },
    { nombre: "Automotriz" },
    { nombre: "Salud" },
  ];

  await ItemRubro.bulkCreate(rubros);
  res.send("ok");
});
router.get("/", async (req, res) => {
  const rubro = await ItemRubro.findAll();
  res.json(rubro);
});

module.exports = router;
