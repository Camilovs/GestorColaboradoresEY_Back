const { Router } = require("express");
const {
  Propuesta,
  ColabProp,
  Colaborador,
  sequelize,
  RubroUser,
  ConocUser,
  ItemConocimiento,
  ItemRubro,
  ConocProp,
} = require("../../db");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
  const propuestas = await Propuesta.findAll();
  res.json(propuestas);
});
router.get("/:propuestaId", async (req, res) => {
  const propuesta = await Propuesta.findOne({
    where: { ID: req.params.propuestaId },
  });
  const [results, metadata] = await sequelize.query(
    `SELECT ID,nombre,apellido,correo,rol from ColaboradoresPropuesta INNER JOIN Colaborador ON ColaboradoresPropuesta.ID_Usuario = Colaborador.ID
    where ColaboradoresPropuesta.ID_Propuesta = '${req.params.propuestaId}'
    `
  );
  const conceptos = await ConocProp.findAll({
    where: {
      ID_Propuesta: req.params.propuestaId,
    },
  });
  if (conceptos) {
    propuesta.dataValues.conceptos = conceptos;
  }
  if (results) {
    propuesta.dataValues.colaboradores = results;
  }
  res.json(propuesta);
});

router.post("/", async (req, res) => {
  const items = [];
  await ItemConocimiento.findAll({
    where: {
      nombre: {
        [Op.or]: req.body.conceptos,
      },
    },
  }).then((respItems) => {
    respItems.forEach((item) => items.push(item.get()));
  });

  await Propuesta.create(req.body).then(async (propuesta) => {
    const itemsMaped = items.reduce((dataReturn, item) => {
      dataReturn.push({
        ID_Propuesta: propuesta.ID,
        ID_Item: item.ID,
      });
      return dataReturn;
    }, []);
    await ConocProp.bulkCreate(itemsMaped);
    res.send("ok");
  });
});
router.post("/addColaboradores", async (req, res) => {
  const data = [];
  await Colaborador.findAll({
    where: {
      correo: {
        [Op.or]: req.body.usuarios,
      },
    },
  }).then((respItems) => {
    respItems.forEach((item) => {
      data.push({
        ID_Usuario: item.get().ID,
        ID_Propuesta: req.body.idpropuesta,
      });
    });
  });
  await ColabProp.bulkCreate(data);
  res.send("ok");
});
router.put("/:propuestaId", async (req, res) => {
  const propuesta = await Propuesta.update(req.body, {
    where: { ID: req.params.propuestaId },
  });
  res.json(propuesta);
});
router.delete("/:propuestaId", async (req, res) => {
  await Propuesta.destroy({
    where: { id: req.params.propuestaId },
  });
  res.send("ok");
});

module.exports = router;
