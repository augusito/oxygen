const { omit } = require("@hemjs/util/object");
const { models } = require("../sequelize");
const AlbumEntity = require("./entity/album.entity");
const Hydrator = require("../common/hydrator");
const Pageable = require("../common/pageable");

class AlbumReadService {
  async getById(id) {
    const row = await models.album.findByPk(id, {
      include: models.artist,
    });

    if (!row) {
      throw new Error(`Could not find row ${id}`);
    }

    return Hydrator.extract(Hydrator.hydrate(row, new AlbumEntity()));
  }

  async getList(page, perPage) {
    const offset = (page - 1) * perPage;
    const limit = perPage;
    const options = {
      include: models.artist,
      limit,
      offset,
    };

    const pageable = new Pageable(models.album, options);
    const { count, rows } = await pageable.getItems();

    const data = rows.map((row) => {
      return Hydrator.extract(Hydrator.hydrate(row, new AlbumEntity()));
    });

    return { data, page, per_page: perPage, total: count };
  }
}

module.exports = AlbumReadService;
