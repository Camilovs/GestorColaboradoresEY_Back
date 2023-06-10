module.exports = (sequelize, type) => {
  return sequelize.define(
    "ItemRubro",
    {
      ID: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: type.STRING,
    },
    {
      freezeTableName: true,
    }
  );
};
