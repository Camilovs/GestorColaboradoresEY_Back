module.exports = (sequelize, type) => {
  return sequelize.define(
    "Colaborador",
    {
      ID: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: type.STRING,
      apellido: type.STRING,
      correo: type.STRING,
      rol: type.STRING,
      linea_servicio: type.STRING,
      area: type.STRING,
      activo: type.BOOLEAN,
      canAsk: type.STRING,
      canHelp: type.STRING,
    },
    {
      freezeTableName: true,
    }
  );
};
