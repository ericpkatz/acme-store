const conn = require('./conn');
const Foo = require('./Foo');
const Bar = require('./Bar');
const Bazz = require('./Bazz');

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const numbers = [1, 2, 3, 4, 5];
  await Promise.all([
    Promise.all(numbers.map( number => Foo.create({ name: `FOO ${number }`}))),
    Promise.all(numbers.map( number => Bar.create({ name: `BAR ${number }`}))),
    Promise.all(numbers.map( number => Bazz.create({ name: `BAZZ ${number }`}))),
  ])
};

module.exports = {
  syncAndSeed,
  conn,
  models: {
    Foo,
    Bar,
    Bazz
  }
};
