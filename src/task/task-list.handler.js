const TaskReadService = require("./task-read.service");

class TaskListHandler {
  taskReadService;

  constructor() {
    this.taskReadService = new TaskReadService();
  }

  async handle(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const { per_page: perPage = 5 } = req.query;

    if (id) {
      const task = await this.taskReadService.getById(+id);
      return res.status(200).json(task);
    }

    const tasks = await this.taskReadService.getList(page, perPage);
    return res.status(200).json(tasks);
  }
}

module.exports = TaskListHandler;
