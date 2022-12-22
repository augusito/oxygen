const AlbumModule = require("./album/album.module");
const ArtistModule = require("./artist/artist.module");
const TaskModule = require("./task/task.module");

module.exports = (app) => {
  // Home route
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });
  // Album routes
  AlbumModule.registerRoutes(app);
  // Artist routes
  ArtistModule.registerRoutes(app);
  //Task routes
  TaskModule.registerRoutes(app);
};
