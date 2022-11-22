const { models } = require("../sequelize");
const Album = require("./album");
const album = new Album();
class AlbumService {
  async getById(id) {
    const row = await models.album.findByPk(id, {
      include: models.artist,
    });

    if (!row) {
      throw new Error(`Could not find row ${id}`);
    }

    album.fromJSON(row);
    return album.toJSON();
  }

  async getList() {
    const rows = await models.album.findAll({
      include: models.artist,
    });

    return rows.map((row) => {
      album.fromJSON(row);
      return album.toJSON();
    });
  }
}

module.exports = AlbumService;
