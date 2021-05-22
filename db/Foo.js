const conn = require('./conn');
const { DataTypes: { STRING, UUID, UUIDV4 } } = conn.Sequelize;

const Foo = conn.define('foo', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  }
});

module.exports = Foo;
