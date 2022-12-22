const { bindHandler } = require("../common/utils");
const TaskCreateHandler = require("./task-create.handler");
const TaskListHandler = require("./task-list.handler");

class TaskModule {
  static registerRoutes(app) {
    app.get("/tasks/:id?", bindHandler(new TaskListHandler()));
    app.post("/tasks", bindHandler(new TaskCreateHandler()));
  }
}

module.exports = TaskModule;
