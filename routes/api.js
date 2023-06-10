const router = require("express").Router();

const apiPropuestasRouter = require("./api/propuestas");
const apiColaboradoresRouter = require("./api/colaboradores");
const apiRubrosRouter = require("./api/rubros");
const apiConocimientosRouter = require("./api/conocimientos");

router.use("/propuestas", apiPropuestasRouter);
router.use("/colaborador", apiColaboradoresRouter);
router.use("/rubros", apiRubrosRouter);
router.use("/conocimientos", apiConocimientosRouter);

module.exports = router;
