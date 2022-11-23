const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Album extends Model {}

  Album.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
      modelName: "album",
    }
  );

  Album.associate = (models) => {
    models.album.belongsTo(models.artist);
  };

  return Album;
};
