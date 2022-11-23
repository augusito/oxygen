const { omit } = require("@hemjs/util/object");
const { hydrate } = require("../common/hydrator");
const { models } = require("../sequelize");
const ArtistEntity = require("./entity/artist.entity");

class ArtistReadService {
  async getById(id) {
    const row = await models.artist.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        model: models.album,
        attributes: ["id", "title"],
      },
    });

    if (!row) {
      throw new Error(`Could not find row ${id}`);
    }

    return hydrate(row, new ArtistEntity()).toJSON();
  }

  async getList(page, perPage) {
    const offset = (page - 1) * perPage;
    const limit = perPage;

    const { rows, count } = await this.findAndCountAll({
      include: models.album,
      offset,
      limit,
    });

    const data = rows.map((row) => {
      return hydrate(row, new ArtistEntity()).toJSON();
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
      models.artist.count(countOptions),
      models.artist.findAll(options),
    ]);

    return {
      count,
      rows: count === 0 ? [] : rows,
    };
  }
}

module.exports = ArtistReadService;
