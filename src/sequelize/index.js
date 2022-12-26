const { Sequelize } = require("sequelize");
const AlbumModel = require("../album/model/album.model");
const ArtistModel = require("../artist/model/artist.model");
const LogFactory = require("../common/logging/log-factory");
const TaskModel = require("../task/model/task.model");

const logger = LogFactory.getLog("Sequelize");
const models = [AlbumModel, ArtistModel, TaskModel];

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data/dev.sqlite",
  benchmark: true,
  logging: (sql, duration) => {
    logger.info(`${sql} Elapsed time: ${duration}ms`);
  },
  logQueryParameters: true,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
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
