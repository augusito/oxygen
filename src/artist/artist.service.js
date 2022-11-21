const { models } = require("../sequelize");

async function getById(id) {
  const row = await models.artist.findByPk(id, {
    include: models.album,
  });

  if (!row) {
    throw new Error(`Could not find row ${id}`);
  }

  return row;
}

async function getList() {
  return await models.artist.findAll({
    include: models.album,
  });
}

exports.getById = getById;
exports.getList = getList;
