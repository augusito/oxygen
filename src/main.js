const express = require("express");
const sequelize = require("./sequelize");

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync({ force: true });
  const { models } = sequelize;

  await models.artist.bulkCreate([
    { name: "Adela" },
    { name: "Bruce Springsteen" },
    { name: "Bruno Mars" },
    { name: "Gotye" },
    { name: "David Bowie" },
    { name: "Cody Simpson" },
    { name: "One Direction" },
  ]);

  await models.album.bulkCreate([
    { title: "21", artistId: 1 },
    { title: "Wrecking Ball (Deluxe)", artistId: 2 },
    { title: "Unorthodox Jukebox", artistId: 3 },
    { title: "Doo-Wops & Hooligans", artistId: 3 },
    { title: "Making Mirrors", artistId: 4 },
    { title: "The Next Day (Deluxe Version)", artistId: 5 },
    { title: "Hunky Dory (Remastered)", artistId: 5 },
    { title: "Take Me Home", artistId: 7 },
    { title: "Up All Night", artistId: 7 },
  ]);

  require("./routes")(app);

  app.listen(port, () => {
    console.log(`Application is running on: ${port}`);
  });
})();
