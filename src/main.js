const sequelize = require("./sequelize");
const Application = require("./core/application");
const HttpAdapter = require("./core/http-adapter");
const Logger = require("./logger/logger");
const ConsoleHandler = require("./logger/console-handler");

const port = process.env.PORT || 3001;

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

  const app = new Application(new HttpAdapter());
  await app.listen(port);
  require("./routes")(app.getHttpAdapter());
  app.enableShutdownHooks(["SIGTERM", "SIGINT"]);

  const logger = new Logger(
    Application.name,
    "INFO",
    new ConsoleHandler("INFO")
  );
  logger.info(`Application is running on: ${await app.getUrl()}`);
})();
