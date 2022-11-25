const { bindHandler } = require("../common/utils");
const ArtistListHandler = require("./artist-list.handler");

class ArtistModule {
  static registerRoutes(app) {
    app.get("/artists/:id?", bindHandler(new ArtistListHandler()));
  }
}

module.exports = ArtistModule;
