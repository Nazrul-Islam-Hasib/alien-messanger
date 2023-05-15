import http from 'http';
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

import db from '../data/gibberish-decoded.json';
const database = db;

type MessageData = {
  nickname: string;
  message: string;
  sentAt: number;
};

/**
 * /messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     description: Retrieve a list of messages from the local database file.
*/
app.get('/messages', (_: express.Request, response: express.Response) => {
  response.json(database);
});

/**
 * /messages:
 *   post:
 *     summary: Save an incoming message
 *     description: Save an incoming message to the local database file.
*/
app.post('/messages', (request: express.Request, response: express.Response) => {
  if (!request.headers['x-api-key']) {
    return response.sendStatus(403);
  }
  if (request.body.message != '') {
    let data:MessageData = request.body;
    database.push(data)
    response.json({
      status: 'ok',
      data: request.body
    });
  }
  else {
    response.sendStatus(400);
  }
});


http.createServer(app);

const port = process.env.PORT || 1337;

app.get('/', async (req, res) => {
  res.send('Server is running');
})

app.listen(port);

console.log(`Running on port ${port}`);
