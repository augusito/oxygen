const { Sequelize } = require("sequelize");
const AlbumModel = require("../album/model/album.model");
const ArtistModel = require("../artist/model/artist.model");

const models = [AlbumModel, ArtistModel];
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data/dev.sqlite",
  logQueryParameters: true,
  benchmark: true,
  define: {
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
});

for (const model of models) {
  model(sequelize);
}

Object.keys(sequelize.models).forEach((model) => {
  if (sequelize.models[model].associate) {
    sequelize.models[model].associate(sequelize.models);
  }
});

module.exports = sequelize;
