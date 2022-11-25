const { bindHandler } = require("../common/utils");
const AlbumListHandler = require("./album-list.handler");

class AlbumModule {
  static registerRoutes(app) {
    app.get("/albums/:id?", bindHandler(new AlbumListHandler()));
  }
}

module.exports = AlbumModule;
