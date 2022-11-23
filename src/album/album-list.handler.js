const AlbumReadService = require("./album-read.service");

class AlbumListHandler {
  albumService;

  constructor() {
    this.albumReadService = new AlbumReadService();
  }

  async handle(req, res) {
    const { id } = req.params;

    if (id) {
      const album = await this.albumReadService.getById(id);
      return res.status(200).json(album);
    }

    const albums = await this.albumReadService.getList();
    return res.status(200).json(albums);
  }
}

module.exports = AlbumListHandler;
