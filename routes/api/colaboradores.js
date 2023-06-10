const { Router } = require("express");
const {
  Colaborador,
  ConocUser,
  RubroUser,
  ItemRubro,
  sequelize,
} = require("../../db");
const { ItemConocimiento } = require("../../db");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
  const users = await Colaborador.findAll({});

  for (const user of users) {
    const conocimiento = await ConocUser.findAll({
      where: {
        ID_Usuario: user.ID,
      },
    });

    const experiencias = await RubroUser.findAll({
      where: {
        ID_Usuario: user.ID,
      },
    });
    user.dataValues.conocimiento = conocimiento;
    user.dataValues.experiencias = experiencias;
  }

  res.json(users);
});

router.get("/infoextra/:id", async (req, res) => {
  const conocimiento = await ConocUser.findAll({
    where: {
      ID_Usuario: req.params.id,
    },
  });

  const experiencias = await RubroUser.findAll({
    where: {
      ID_Usuario: req.params.id,
    },
  });

  res.json({ conocimiento, experiencias });
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
  const rubros = [];
  await ItemRubro.findAll({
    where: {
      nombre: {
        [Op.or]: req.body.experiencia,
      },
    },
  }).then((respRubros) => {
    respRubros.forEach((rubro) => rubros.push(rubro.get()));
  });

  await Colaborador.create(req.body).then(async (user) => {
    const itemsConUser = items.reduce((dataReturn, item) => {
      dataReturn.push({
        ID_Usuario: user.ID,
        ID_Item: item.ID,
        nivel:
          req.body.lvlconceptos.find(
            (lvlitem) => lvlitem.nombre === item.nombre
          ).nivel || null,
      });
      return dataReturn;
    }, []);
    const rubrosUser = rubros.reduce((dataReturn, item) => {
      dataReturn.push({ ID_Usuario: user.ID, ID_Rubro: item.ID });
      return dataReturn;
    }, []);
    await ConocUser.bulkCreate(itemsConUser);
    await RubroUser.bulkCreate(rubrosUser);
    res.send("ok");
  });
});

router.put("/:userId", async (req, res) => {
  await Colaborador.update(req.body, {
    where: { ID: req.params.userId },
  });
  res.send("ok");
});

router.delete("/:userId", async (req, res) => {
  await Colaborador.destroy({
    where: { id: req.params.userId },
  });
  res.send("ok");
});

module.exports = router;
