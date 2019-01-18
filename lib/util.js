const nanoid = require('nanoid')
const { promisify } = require("util");
const qs = require('qs');
const rimraf = require("rimraf");

const baseUrl = "https://api.unsplash.com";
const removeAsync = promisify(rimraf);

const getFilePath = extension => {
  return new Promise(async (resolve, reject) => {
    try {
      return resolve(`wallpapers/${nanoid()}${extension || ".jpg"}`);
    } catch (e) {
      return reject(e);
    }
  });
};

const parseCollections = () => {
  if (!process.env.COLLECTIONS) {
    console.log("No collections specified, defaulting to technology (291936)");
    return [261936];
  }

  return process.env.COLLECTIONS.split(",");
}

const generateURL = () => {
  const collections = parseCollections();
  const randomCollection = getRandom(collections);
  const params = {
    client_id: process.env.CLIENT_KEY,
    collections: randomCollection,
    w: 1080,
    h: 1920,
    count: 1
  }
  const queryString = qs.stringify(params);
  return `${baseUrl}/photos/random?${queryString}`;
}

const getRandom = (collection) => {
  return collection[Math.floor(Math.random() * collection.length)];
}

module.exports = {
  getFilePath,
  removeAsync,
  getRandom,
  generateURL
};
