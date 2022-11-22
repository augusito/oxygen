const express = require("express");
const sequelize = require("./sequelize");
const AlbumService = require("./album/album.service");
const ArtistService = require("./artist/artist.service");

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync({ force: true });
  const { models } = sequelize;
  await models.artist.bulkCreate([
    { name: "The Military Wives" },
    { name: "Adela" },
    { name: "Bruce Springsteen" },
    { name: "Bruno Mars" },
    { name: "Gotye" },
    { name: "David Bowie" },
    { name: "Cody Simpson" },
    { name: "One Direction" },
  ]);
  await models.album.bulkCreate([
    { title: "In My Dreams", artistId: 1 },
    { title: "21", artistId: 2 },
    { title: "Wrecking Ball (Deluxe)", artistId: 3 },
    { title: "Unorthodox Jukebox", artistId: 4 },
    { title: "Doo-Wops & Hooligans", artistId: 4 },
    { title: "Making Mirrors", artistId: 5 },
    { title: "The Next Day (Deluxe Version)", artistId: 6 },
    { title: "Hunky Dory (Remastered)", artistId: 6 },
    { title: "Take Me Home", artistId: 8 },
    { title: "Up All Night", artistId: 8 },
  ]);

  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

  app.get("/albums/:id?", async (req, res) => {
    const { id } = req.params;
    const albumService = new AlbumService();
    if (id) {
      const album = await albumService.getById(id);
      return res.status(200).json(album);
    }
    const albums = await albumService.getList();
    return res.status(200).json(albums);
  });

  app.get("/artists/:id?", async (req, res) => {
    const { id } = req.params;
    const artistService = new ArtistService();
    if (id) {
      const artist = await artistService.getById(id);
      return res.status(200).json(artist);
    }
    const artists = await artistService.getList();
    return res.status(200).json(artists);
  });

  app.listen(port, () => {
    console.log(`Application is running on: ${port}`);
  });
})();
