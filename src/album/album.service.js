const { models } = require("../sequelize");

async function getById(id) {
  const row = await models.album.findByPk(id, {
    include: models.artist,
  });

  if (!row) {
    throw new Error(`Could not find row ${id}`);
  }

  return row;
}

async function getList() {
  return await models.album.findAll({
    include: models.artist,
  });
}

exports.getById = getById;
exports.getList = getList;
