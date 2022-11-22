const { models } = require("../sequelize");
const Album = require("./album");

class AlbumService {
  async getById(id) {
    const row = await models.album.findByPk(id, {
      include: models.artist,
    });

    if (!row) {
      throw new Error(`Could not find row ${id}`);
    }

    return this.hydrate(row, new Album()).toJSON();
  }

  async getList() {
    const rows = await models.album.findAll({
      include: models.artist,
    });

    return rows.map((row) => {
      return this.hydrate(row, new Album()).toJSON();
    });
  }

  hydrate(data, object) {
    object.fromJSON(data);
    return object;
  }
}

module.exports = AlbumService;
