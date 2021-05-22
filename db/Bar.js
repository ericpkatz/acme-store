const conn = require('./conn');
const { DataTypes: { STRING, UUID, UUIDV4 } } = conn.Sequelize;

const Bar = conn.define('bar', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: STRING
});

module.exports = Bar;
