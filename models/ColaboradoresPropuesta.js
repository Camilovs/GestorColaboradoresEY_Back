module.exports = (sequelize, type) => {
  return sequelize.define(
    "ColaboradoresPropuesta",
    {
      ID_Usuario: {
        type: type.INTEGER,
        primaryKey: true,
        references: {
          model: "Colaborador",
          key: "ID",
        },
      },
      ID_Propuesta: {
        type: type.INTEGER,
        primaryKey: true,
        references: {
          model: "Propuesta",
          key: "ID",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
};
