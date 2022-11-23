const { omit } = require("@hemjs/util/object");
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

  async getList(page, perPage) {
    const offset = (page - 1) * perPage;
    const limit = perPage;

    const { count, rows } = await this.findAndCountAll({
      include: models.artist,
      limit,
      offset,
    });

    const data = rows.map((row) => {
      return hydrate(row, new AlbumEntity()).toJSON();
    });

    return { data, page, per_page: perPage, total: count };
  }

  async findAndCountAll(options) {
    const countOptions = omit(options, [
      "limit",
      "offset",
      "order",
      "attributes",
      "include",
    ]);

    const [count, rows] = await Promise.all([
      models.album.count(countOptions),
      models.album.findAll(options),
    ]);

    return {
      count,
      rows: count === 0 ? [] : rows,
    };
  }
}

module.exports = AlbumReadService;
