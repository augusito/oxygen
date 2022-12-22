const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Task extends Model {}

  Task.init(
    {
      subject: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      due_date: {
        type: DataTypes.DATE,
      },
      priority: {
        type: DataTypes.STRING(32),
      },
      status: {
        type: DataTypes.STRING(32),
      },
    },
    {
      sequelize: sequelize,
      modelName: "task",
    },
  );

  return Task;
};
