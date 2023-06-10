const Sequelize = require("sequelize");
const ColaboradorModel = require("./models/Colaborador");
const PropuestaModel = require("./models/Propuesta");
const ColabPropModel = require("./models/ColaboradoresPropuesta");
const ConocPropModel = require("./models/ConocimientosPropuesta");
const ConocUserModel = require("./models/ConocimientoUser");
const ItemConocModel = require("./models/ItemConocimiento");
const ItemRubroModel = require("./models/ItemRubro");
const RubroUserModel = require("./models/RubroUser");

const db_user = "admin";
const db_name = "DB_ColaboradoresAppEY";
const db_pass = "1234";
const db_host = "localhost";

const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: db_host,
  dialect: "mssql",
});

const Colaborador = ColaboradorModel(sequelize, Sequelize);
const ItemRubro = ItemRubroModel(sequelize, Sequelize);
const Propuesta = PropuestaModel(sequelize, Sequelize);
const ItemConocimiento = ItemConocModel(sequelize, Sequelize);
const ColabProp = ColabPropModel(sequelize, Sequelize);
const ConocProp = ConocPropModel(sequelize, Sequelize);
const ConocUser = ConocUserModel(sequelize, Sequelize);
const RubroUser = RubroUserModel(sequelize, Sequelize);

// Colaborador.belongsToMany(ItemConocimiento, {
//   through: ConocUser,
// });
// ItemConocimiento.belongsToMany(Colaborador, {
//   through: ConocUser,
// });

// Colaborador.belongsToMany(ItemRubro, {
//   through: RubroUser,
// });
// ItemRubro.belongsToMany(Colaborador, {
//   through: RubroUser,
// });

// ItemRubro.hasMany(Propuesta, {
//   foreignKey: "ID_Rubro",
// });

// Propuesta.belongsTo(ItemRubro);

sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("DB Tables sync");
});

module.exports = {
  Colaborador,
  ItemRubro,
  Propuesta,
  ItemConocimiento,
  ColabProp,
  ConocProp,
  ConocUser,
  RubroUser,
  sequelize,
};
