#! /usr/bin/env node

console.log(
  'Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const userArgs = process.argv.slice(2);
const Player = require('./models/player');

const players = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];
main().catch((err) => {
  console.log(err);
});

async function main() {
  console.log('debug: about to connect');
  await mongoose.connect(mongoDB);
  console.log('should be connected');
  await createPlayers();
  console.log('closing mongoose');
  mongoose.connection.close();
}

async function playerCreate(index, name, time) {
  const player = new Player({
    name,
    time,
  });
  await player.save();
  players[index] = player;
  console.log('added player: ' + name);
}

async function createPlayers() {
  console.log('adding players');
  await Promise.all([
    playerCreate(0, 'giorgi', 600),
    playerCreate(0, 'adam', 1200),
    playerCreate(0, 'eva', 3000),
  ]);
}
