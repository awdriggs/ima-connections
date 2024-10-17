//Data array
let messages = [
  {
    message: "This is the first y message",
    time: "Mon Oct 18 2022 15:36:27 GMT+0300 (Eastern European Summer Time)"
  },
  {
    message: "Hello hello!",
    time: "Mon Oct 18 2022 15:37:05 GMT+0300 (Eastern European Summer Time)"
  }
];



//STEP 1. Set up a server
// let express = require('express');
import express from 'express';
let app = express();

//Serve a public folder
app.use(express.static('public'));
app.use(express.json());

//Listen
let port = 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});

// database business
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const defaultData = { messages: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);



/*ROUTES */
//STEP 4-7. GET all the messages as an object
app.get('/messages', (req, res) => {
  //Send data as an object
  // let msg = {
  //   data: messages
  // }

  db.read()
    .then(() => {
      //access the messages
      //serve messages to the client
      let messages = {data: db.data.messages}
      
      res.json(message);
    });
});

//STEP 10. POST for a new message

app.post('/new-message', (req, res) => {

  console.log(req.body);
  let newMsg = {message: req.body.message, time: Date()};

  db.data.messages.push(newMsg);
  db.write()
    .then(() => {
      //send message back to the client
      res.json(newMsg);
    });
});
