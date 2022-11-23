const { hydrate } = require("../common/hydrator");
const { models } = require("../sequelize");
const ArtistEntity = require("./entity/artist.entity");

class ArtistService {
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

  async getList() {
    const rows = await models.artist.findAll({
      include: models.album,
    });

    return rows.map((row) => {
      return hydrate(row, new ArtistEntity()).toJSON();
    });
  }
}

module.exports = ArtistService;
