const ArtistService = require("./artist.service");

class ArtistListHandler {
  artistService;

  constructor() {
    this.artistService = new ArtistService();
  }

  async handle(req, res) {
    const { id } = req.params;
    if (id) {
      const artist = await this.artistService.getById(id);
      return res.status(200).json(artist);
    }
    const artists = await this.artistService.getList();
    return res.status(200).json(artists);
  }
}

module.exports = ArtistListHandler;
