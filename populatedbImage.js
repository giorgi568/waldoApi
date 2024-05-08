#! /usr/bin/env node
// const fs = require('fs');
// const path = require('path');

// no longer using commented out code because storing images
// in mongodb directly was a mistake

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

// its way more complicated that it should be
// but simpler than writing it twice

// const directory = 'public/images';

// async function imageCreate(
//   file,
//   fileTitle,
//   cordX_waldo,
//   cordY_waldo,
//   cordX_wenda,
//   cordY_wenda
// ) {
//   try {
//     if (path.extname(file) === '.jpg' || path.extname(file) === '.png') {
//       const filePath = path.join(directory, file);

//       const imageBuffer = fs.readFileSync(filePath);

// const newImage = new Image({
//   title: fileTitle,
//   data: imageBuffer,
//   contentType: path.extname(file).startsWith('.jpg')
//     ? 'image/jpg'
//     : 'image/png',
//   cordX_waldo,
//   cordY_waldo,
// });

// if (cordX_wenda !== undefined) {
//   newImage.cordX_wenda = cordX_wenda;
//   newImage.cordY_wenda = cordY_wenda;
// }

// await newImage.save();
// console.log('image saved : ' + fileTitle);
//     }
//   } catch (err) {
//     console.log('error uploading image: ' + err);
//   }
// }

async function imageCreate(
  url,
  title,
  cordX_waldo,
  cordY_waldo,
  cordX_wenda,
  cordY_wenda
) {
  try {
    const newImage = new Image({
      url,
      title,
      cordX_waldo,
      cordY_waldo,
    });

    if (cordX_wenda !== undefined) {
      newImage.cordX_wenda = cordX_wenda;
      newImage.cordY_wenda = cordY_wenda;
    }

    await newImage.save();
    console.log('image saved : ' + title);
  } catch (err) {
    console.log(err);
  }
}

async function createImages() {
  // const files = fs.readdirSync(directory);

  console.log('adding images');

  await Promise.all([
    imageCreate(
      'https://i.postimg.cc/pXs8yK37/test.jpg',
      'holywood',
      844,
      330,
      710,
      519
    ),
    imageCreate('https://i.postimg.cc/y8WRRkHN/test2.jpg', 'battle', 827, 284),
    imageCreate(
      'https://i.postimg.cc/mrHFdJhf/test3.jpg',
      'skiing',
      1027,
      550,
      590,
      322
    ),
  ]);
}
