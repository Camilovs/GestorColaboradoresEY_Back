module.exports = (sequelize, type) => {
  return sequelize.define(
    "ItemConocimiento",
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
