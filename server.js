const db = require('./db');
const { syncAndSeed, models, conn } = db;
const { pluralize } = require('inflection');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(conn.models);

Object.entries(conn.models).forEach(([ key, model ]) => {
  const plural = pluralize(key);
  app.get(`/api/${plural}`, async(req, res, next)=> {
    try {
      const items = await model.findAll();
      res.send(items);
    }
    catch(ex){
      next(ex);
    }
  });

  app.get(`/api/${plural}/:id`, async(req, res, next)=> {
    try {
      const item = await model.findByPk(req.params.id);
      res.send(item);
    }
    catch(ex){
      next(ex);
    }
  });

  //TODO - These need be locked.
  app.delete(`/api/${plural}/:id`, async(req, res, next)=> {
    try {
      const item = await model.findByPk(req.params.id);
      await item.destroy();
      res.sendStatus(201);
    }
    catch(ex){
      next(ex);
    }
  });

  app.post(`/api/${plural}`, async(req, res, next)=> {
    try {
      const item = await model.create(model.destructure ? model.destructure(req.body): req.body);
      res.status(201).send(item);
    }
    catch(ex){
      next(ex);
    }
  });

  app.put(`/api/${plural}/:id`, async(req, res, next)=> {
    try {
      const item = await model.findByPk(req.params.id);
      await item.update(req.body); 
      res.send(item);
    }
    catch(ex){
      next(ex);
    }
  });

});


/*
app.get('/api/foos', async(req, res, next)=> {
  try {
    const foos = await Foo.findAll();
    res.send(foos);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/foos/:id', async(req, res, next)=> {
  try {
    const foo = await Foo.findByPk(req.params.id);
    res.send(foo);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/foos/:id',  async(req, res, next)=> {
  try {
    const foo = await Foo.findByPk(req.params.id);
    await foo.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/foos',  async(req, res, next)=> {
  try {
    const foo = await Foo.create(req.body);
    res.status(201).send(foo);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/foos/:id',  async(req, res, next)=> {
  try {
    const foo = await Foo.findByPk(req.params.id);
    await foo.update(req.body);
    res.send(foo);
  }
  catch(ex){
    next(ex);
  }
});
*/

const setUp = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setUp();
