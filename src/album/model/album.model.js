const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Album extends Model {}

  Album.init(
    {
      artist_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
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
    models.album.belongsTo(models.artist, {
      onDelete: "SET NULL",
      foreignKey: {
        name: "artist_id",
        allowNull: true,
      },
    });
  };

  return Album;
};
