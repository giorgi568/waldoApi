#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log(
  'Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const userArgs = process.argv.slice(2);
const Image = require('./models/image');

const images = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];
main().catch((err) => {
  console.log(err);
});

async function main() {
  console.log('about to connect');
  await mongoose.connect(mongoDB);
  console.log('should be connected');
}

async function imageCreate() {
  const directory = '/images';
  try {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      if (path.extname(file) === '.jpg' || path.extname(file) === '.png') {
        const filePath = path.join(directory, file);
        
      }
    }
  } catch (err) {
    console.log('error uploading image: ' + err);
  }
}
