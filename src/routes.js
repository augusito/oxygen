const AlbumModule = require("./album/album.module");
const ArtistModule = require("./artist/artist.module");

module.exports = (app) => {
  // Home route
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });
  // Album routes
  AlbumModule.registerRoutes(app);
  // Artist routes
  ArtistModule.registerRoutes(app);
};
