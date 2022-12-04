const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Artist extends Model {}

  Artist.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
      modelName: "artist",
    }
  );

  Artist.associate = (models) => {
    models.artist.hasMany(models.album, {
      foreignKey: "artist_id",
    });
  };

  return Artist;
};
