const { models } = require("../common/sequelize");
const TaskEntity = require("./entity/task.entity");
const Hydrator = require("../common/hydrator");
const Pageable = require("../common/pageable");

class TaskReadService {
  async getById(id) {
    const row = await models.task.findByPk(id);

    if (!row) {
      throw new Error(`Could not find row ${id}`);
    }

    return Hydrator.extract(Hydrator.hydrate(row, new TaskEntity()));
  }

  async getList(page, perPage) {
    const offset = (page - 1) * perPage;
    const limit = perPage;
    const options = {
      offset,
      limit,
    };

    const pageable = new Pageable(models.task, options);
    const { rows, count } = await pageable.getItems();

    const data = rows.map((row) => {
      return Hydrator.extract(Hydrator.hydrate(row, new TaskEntity()));
    });

    return { data, page, per_page: perPage, total: count };
  }
}

module.exports = TaskReadService;
