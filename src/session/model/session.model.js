const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Session extends Model {}

  Session.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_active_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expire_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      abandoned_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize: sequelize,
      modelName: "session",
    }
  );

  Session.associate = (models) => {
    models.session.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  };

  return Session;
};
