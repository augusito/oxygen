const { hydrate } = require("../common/hydrator");
const { models } = require("../sequelize");
const AlbumEntity = require("./entity/album.entity");

class AlbumReadService {
  async getById(id) {
    const row = await models.album.findByPk(id, {
      include: models.artist,
    });

    if (!row) {
      throw new Error(`Could not find row ${id}`);
    }

    return hydrate(row, new AlbumEntity()).toJSON();
  }

  async getList() {
    const rows = await models.album.findAll({
      include: models.artist,
    });

    return rows.map((row) => {
      return hydrate(row, new AlbumEntity()).toJSON();
    });
  }
}

module.exports = AlbumReadService;
