module.exports = (sequelize, type) => {
  return sequelize.define(
    "Propuesta",
    {
      ID: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: type.STRING,
      cliente: type.STRING,
      linea_servicio: type.STRING,
      area: type.STRING,
      ID_Rubro: {
        type: type.INTEGER,
        references: {
          model: "ItemRubro",
          key: "ID",
        },
      },
      privada: type.BOOLEAN,
    },
    {
      freezeTableName: true,
    }
  );
};
