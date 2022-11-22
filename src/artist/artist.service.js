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

    return row;
  }

  async getList() {
    return await models.artist.findAll({
      include: models.album,
    });
  }
}

module.exports = ArtistService;
