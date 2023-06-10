module.exports = (sequelize, type) => {
  return sequelize.define(
    "RubroUser",
    {
      ID_Usuario: {
        type: type.INTEGER,
        primaryKey: true,
        references: {
          model: "Colaborador",
          key: "ID",
        },
      },
      ID_Rubro: {
        type: type.INTEGER,
        primaryKey: true,
        references: {
          model: "ItemRubro",
          key: "ID",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
};
