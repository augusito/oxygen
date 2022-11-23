const AlbumReadService = require("./album-read.service");

class AlbumListHandler {
  albumService;

  constructor() {
    this.albumReadService = new AlbumReadService();
  }

  async handle(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const { per_page = 5 } = req.query;

    if (id) {
      const album = await this.albumReadService.getById(id);
      return res.status(200).json(album);
    }

    const albums = await this.albumReadService.getList(page, per_page);
    return res.status(200).json(albums);
  }
}

module.exports = AlbumListHandler;
