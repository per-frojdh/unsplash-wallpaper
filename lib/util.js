const uuid = require("uuid");
const { promisify } = require("util");
const rimraf = require("rimraf");

const removeAsync = promisify(rimraf);

const getFilePath = extension => {
  return new Promise(async (resolve, reject) => {
    try {
      return resolve('wallpapers/' + uuid.v4() + (extension || ".jpg"));
    } catch (e) {
      return reject(e);
    }
  });
};

module.exports = {
  getFilePath,
  removeAsync
};
