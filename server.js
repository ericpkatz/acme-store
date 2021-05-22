const { syncAndSeed, models: { Foo, Bar, Bazz }} = require('./db');
const express = require('express');
const app = express();

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
