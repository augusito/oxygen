const Hydrator = require("../common/hydrator");
const TaskEntity = require("./entity/task.entity");
const { TASK_STATUS, TASK_PRIORITY } = require("./task.constants");

class TaskService {
  tasks = [
    {
      id: 1,
      subject: "Meet James",
      description: "Meet James in the office",
      due_date: new Date(),
      priority: TASK_PRIORITY.normal,
      status: TASK_STATUS.open,
    },
    {
      id: 2,
      subject: "Check email",
      description: "",
      due_date: new Date(),
      priority: TASK_PRIORITY.low,
      status: TASK_STATUS.open,
    },
    {
      id: 3,
      subject: "Open new bank account",
      description: "Go to the bank and open new bank account",
      due_date: new Date(),
      priority: TASK_PRIORITY.high,
      status: TASK_STATUS.open,
    },
  ];

  async getById(id) {
    const row = this.tasks.find((task) => task.id === id);

    if (!row) {
      throw new Error(`Could not find row ${id}`);
    }

    return Hydrator.extract(Hydrator.hydrate(row, new TaskEntity()));
  }

  async getList() {
    return this.tasks;
  }

  async create(createTaskDto) {
    const task = {
      ...createTaskDto,
      id: this.tasks.length + 1,
      status: TASK_STATUS.open,
    };

    this.tasks.push(task);

    return task.id;
  }
}

module.exports = TaskService;
