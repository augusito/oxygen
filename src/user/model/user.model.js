const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: sequelize,
      modelName: "user",
    }
  );

  User.associate = (models) => {
    models.user.hasMany(models.session, {
      foreignKey: "user_id",
    });
  };

  return User;
};
