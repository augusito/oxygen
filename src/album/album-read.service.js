const { omit } = require("@hemjs/util/object");
const { hydrate } = require("../common/hydrator");
const { pageable } = require("../common/pageable");
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

  async getList(page, perPage) {
    const offset = (page - 1) * perPage;
    const limit = perPage;
    const options = {
      include: models.artist,
      limit,
      offset,
    };

    const { count, rows } = await pageable(models.album, options);

    const data = rows.map((row) => {
      return hydrate(row, new AlbumEntity()).toJSON();
    });

    return { data, page, per_page: perPage, total: count };
  }
}

module.exports = AlbumReadService;
