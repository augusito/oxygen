const { models } = require("../sequelize");
const Hydrator = require("../common/hydrator");
const TaskEntity = require("./entity/task.entity");
const { TASK_STATUS, TASK_PRIORITY } = require("./task.constants");

class TaskWriteService {
  async create(createTaskDto) {
    const task = await models.task.create({
      ...createTaskDto,
      status: TASK_STATUS.open,
    });

    return task.id;
  }
}

module.exports = TaskWriteService;
