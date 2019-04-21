const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

// monogo init
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);

mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db('test101');
  // move app logic in here
  const app = express();
  app.use(bodyParser.json());
  // sorry for spelling wrong :(
  app.post('/messanger/postMessage', (req, res) => {
    console.log(req.body);
    db.collection('test').insertOne({ data: req.body.message })
      .then(() => console.log('db insert worked'))
      .catch((e) => console.log(e));
    client.publish('testPublish', req.body.message);
    res.send('ok');
  });

  app.get('/messanger/getMessages', (req, res) => {
    db.collection('test').find({}).toArray()
      .then((result) => {
        res.send(result.map(r => r.data));
      })
      .catch((e) => console.log(e));
  });

  app.listen(5000);
  // end app logic
});

