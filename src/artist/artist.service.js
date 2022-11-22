const { models } = require("../sequelize");
const Artist = require("./artist");

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

    return this.hydrate(row, new Artist()).toJSON();
  }

  async getList() {
    const rows = await models.artist.findAll({
      include: models.album,
    });

    return rows.map((row) => {
      return this.hydrate(row, new Artist()).toJSON();
    });
  }

  hydrate(data, object) {
    object.fromJSON(data);
    return object;
  }
}

module.exports = ArtistService;
