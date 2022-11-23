const express = require("express");
const sequelize = require("./sequelize");
const AlbumService = require("./album/album-read.service");
const ArtistService = require("./artist/artist.service");
const AlbumListHandler = require("./album/album-list.handler");
const ArtistListHandler = require("./artist/artist-list.handler");
const { bindHandler } = require("./common/handler");

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

  app.get("/albums/:id?", bindHandler(new AlbumListHandler()));

  app.get("/artists/:id?", bindHandler(new ArtistListHandler()));

  app.listen(port, () => {
    console.log(`Application is running on: ${port}`);
  });
})();
