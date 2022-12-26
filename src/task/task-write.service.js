const { models } = require("../common/sequelize");
const Hydrator = require("../common/hydrator");
const TaskEntity = require("./entity/task.entity");
const { TASK_STATUS, TASK_PRIORITY } = require("./task.constants");
const { taskQueue } = require("./task.queue");

class TaskWriteService {
  async create(createTaskDto) {
    const task = await models.task.create({
      ...createTaskDto,
      status: TASK_STATUS.open,
    });

    taskQueue.add(Hydrator.extract(Hydrator.hydrate(task, new TaskEntity())));

    return task.id;
  }
}

module.exports = TaskWriteService;
