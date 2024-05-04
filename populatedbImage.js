#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log(
  'Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const userArgs = process.argv.slice(2);
const Image = require('./models/image');

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
  await createImages();
  console.log('closing mongoose');
  mongoose.connection.close();
}

async function imageCreate(file, fileTitle, cordX, cordY) {
  try {
    if (path.extname(file) === '.jpg' || path.extname(file) === '.png') {
      const filePath = path.join(directory, file);

      const imageBuffer = fs.readFileSync(filePath);

      const newImage = new Image({
        title: fileTitle,
        data: imageBuffer,
        contentType: path.extname(file).startsWith('.jpg')
          ? 'image/jpg'
          : 'image/png',
        cordX,
        cordY,
      });

      await newImage.save();
      console.log('image saved : ' + fileTitle);
    }
  } catch (err) {
    console.log('error uploading image: ' + err);
  }
}
async function createImages() {
  const directory = '/images';
  const files = fs.readdirSync(directory);

  console.log('adding images');

  await Promise.all([imageCreate(files[0], 'holywood', 50, 50)]);
}
