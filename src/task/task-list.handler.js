const TaskService = require("./task.service");

class TaskListHandler {
  taskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async handle(req, res) {
    const { id } = req.params;

    if (id) {
      const task = await this.taskService.getById(+id);
      return res.status(200).json(task);
    }

    const tasks = await this.taskService.getList();
    return res.status(200).json(tasks);
  }
}

module.exports = TaskListHandler;
