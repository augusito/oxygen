const { omit } = require("@hemjs/util/object");
const { models } = require("../sequelize");
const ArtistEntity = require("./entity/artist.entity");
const Hydrator = require("../common/hydrator");
const Pageable = require("../common/pageable");

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

    return Hydrator.extract(Hydrator.hydrate(row, new ArtistEntity()));
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
      return Hydrator.extract(Hydrator.hydrate(row, new ArtistEntity()));
    });

    return { data, page, per_page: perPage, total: count };
  }
}

module.exports = ArtistReadService;
