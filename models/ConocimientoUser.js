module.exports = (sequelize, type) => {
  return sequelize.define(
    "ConocimientoUser",
    {
      ID_Usuario: {
        type: type.INTEGER,
        primaryKey: true,
        references: {
          model: "Colaborador",
          key: "ID",
        },
      },
      ID_Item: {
        type: type.INTEGER,
        primaryKey: true,
        references: {
          model: "ItemConocimiento",
          key: "ID",
        },
      },
      nivel: type.STRING,
    },
    {
      freezeTableName: true,
    }
  );
};
