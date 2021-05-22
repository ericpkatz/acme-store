const conn = require('./conn');
const Foo = require('./Foo');
const Bar = require('./Bar');
const Bazz = require('./Bazz');

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const numbers = [1, 2, 3, 4, 5];
  await Promise.all(numbers.map( number => Foo.create({ name: `FOO ${number }`})));
};

module.exports = {
  syncAndSeed,
  models: {
    Foo,
    Bar,
    Bazz
  }
};
