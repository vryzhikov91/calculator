const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require('mongoose');

const connectionDB = require('./config/db.js')
connectionDB();
require('./models/calculatedModel');

const port = process.env.PORT || 4001;
const index = require("./routes/index");


//db connect

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;
const Calculated = mongoose.model("calculated");
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(async () => await getApiAndEmit(socket), 1000);

  socket.on("calculated", async (calculated) => {      
    const elem = new Calculated({
      calculated : calculated.calculated,
      date : new Date()
    });
    await elem.save();       
    await getApiAndEmit(socket);
    
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = async (socket) => {
  const list = await Calculated.find().sort({date: -1}).limit(10);
  socket.emit("calculated", {results:list});
};

server.listen(port, () => console.log(`Listening on port ${port}`));