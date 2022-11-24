const { omit } = require("@hemjs/util/object");
const { hydrate } = require("../common/hydrator");
const Pageable = require("../common/pageable");
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
    const options = {
      include: models.album,
      offset,
      limit,
    };

    const pageable = new Pageable(models.artist, options);
    const { rows, count } = await pageable.getItems();

    const data = rows.map((row) => {
      return hydrate(row, new ArtistEntity()).toJSON();
    });

    return { data, page, per_page: perPage, total: count };
  }
}

module.exports = ArtistReadService;
