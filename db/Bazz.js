const conn = require('./conn');
const { DataTypes: { STRING, UUID, UUIDV4 } } = conn.Sequelize;

const Bazz = conn.define('bazz', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: STRING
});

Bazz.destructure = ({ name })=> {
  return { name };
}

module.exports = Bazz;
