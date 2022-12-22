const CreateTaskDto = require("./dto/create-task.dto");
const TaskReadService = require("./task-read.service");
const TaskWriteService = require("./task-write.service");

class TaskCreateHandler {
  taskReadService;
  taskWriteService;

  constructor() {
    this.taskReadService = new TaskReadService();
    this.taskWriteService = new TaskWriteService();
  }

  async handle(req, res) {
    const createTaskDto = new CreateTaskDto(req.body);
    const id = await this.taskWriteService.create(createTaskDto);
    const task = await this.taskReadService.getById(id);
    return res.status(200).json(task);
  }
}

module.exports = TaskCreateHandler;
