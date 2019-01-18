require('dotenv').config();
const fs = require("fs");
const wallpaper = require("wallpaper");
const got = require("got");
const qs = require('qs');
const random = require("lodash.random");
const util = require("./util");


const baseUrl = "https://api.unsplash.com";

const collections = [
  142376, // https://unsplash.com/collections/142376/awash-in-color
  182565, // https://unsplash.com/collections/182565/in-motion
  334800, // https://unsplash.com/collections/334800/reflections
  261936 // https://unsplash.com/collections/261936/technology
];

const generateUrl = () => {
  const test = collections[random(0, collections.length, false)];
  const params = {
    client_id: process.env.CLIENT_KEY,
    collections: test,
    w: 1080,
    h: 1920,
    count: 1
  }
  const queryString = qs.stringify(params);
  return `${baseUrl}/photos/random?${queryString}`;
};

module.exports = async () => {
  const url = generateUrl();
  const filePath = await util.getFilePath(".jpg");

  // get URL
  const result = await got(url, { json: true });
  const imageUrl = result.body[0].urls.full;

  // clear previous wallpapers
  await util.removeAsync('wallpapers/*');

  got
    .stream(imageUrl)
    .pipe(fs.createWriteStream(filePath))
    .on("finish", async () => {
      await wallpaper.set(filePath);
    });
};
