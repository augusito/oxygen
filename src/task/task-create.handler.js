const CreateTaskDto = require("./dto/create-task.dto");
const TaskService = require("./task.service");

class TaskCreateHandler {
  taskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async handle(req, res) {
    const createTaskDto = new CreateTaskDto(req.body);
    const id = await this.taskService.create(createTaskDto);
    const task = await this.taskService.getById(id);
    return res.status(200).json(task);
  }
}

module.exports = TaskCreateHandler;
