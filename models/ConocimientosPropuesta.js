module.exports = (sequelize, type) => {
  return sequelize.define(
    "ConocimientosPropuesta",
    {
      ID_Propuesta: {
        type: type.INTEGER,
        primaryKey: true,
        references: {
          model: "Propuesta",
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
    },
    {
      freezeTableName: true,
    }
  );
};
