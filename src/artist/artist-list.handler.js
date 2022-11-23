const ArtistReadService = require("./artist-read.service");

class ArtistListHandler {
  artistReadService;

  constructor() {
    this.artistReadService = new ArtistReadService();
  }

  async handle(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const { per_page: perPage = 5 } = req.query;

    if (id) {
      const artist = await this.artistReadService.getById(id);
      return res.status(200).json(artist);
    }
    const artists = await this.artistReadService.getList(page, perPage);
    return res.status(200).json(artists);
  }
}

module.exports = ArtistListHandler;
