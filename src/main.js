const sequelize = require("./sequelize");
const appFactory = require("./core/app-factory");
const LogFactory = require("./common/logging/log-factory");
const { TASK_PRIORITY, TASK_STATUS } = require("./task/task.constants");

const port = process.env.PORT || 3000;

(async () => {
  const logger = LogFactory.getLog("Application");

  const app = appFactory.create();
  await app.listen(port);
  require("./middleware")(app.getHttpAdapter());
  require("./routes")(app.getHttpAdapter());
  app.enableShutdownHooks(["SIGTERM", "SIGINT"]);
  logger.info(`Application is running on: ${await app.getUrl()}`);

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
    { title: "21", artist_id: 1 },
    { title: "Wrecking Ball (Deluxe)", artist_id: 2 },
    { title: "Unorthodox Jukebox", artist_id: 3 },
    { title: "Doo-Wops & Hooligans", artist_id: 3 },
    { title: "Making Mirrors", artist_id: 4 },
    { title: "The Next Day (Deluxe Version)", artist_id: 5 },
    { title: "Hunky Dory (Remastered)", artist_id: 5 },
    { title: "Take Me Home", artist_id: 7 },
    { title: "Up All Night", artist_id: 7 },
  ]);

  await models.task.bulkCreate([
    {
      name: "Meet James",
      description: "Meet James in the office",
      due_date: new Date(),
      priority: TASK_PRIORITY.normal,
      status: TASK_STATUS.open,
    },
    {
      name: "Check email",
      description: "",
      due_date: new Date(),
      priority: TASK_PRIORITY.low,
      status: TASK_STATUS.open,
    },
    {
      name: "Open new bank account",
      description: "Go to the bank and open new bank account",
      due_date: new Date(),
      priority: TASK_PRIORITY.high,
      status: TASK_STATUS.open,
    },
  ]);
})();
