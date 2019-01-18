const fs = require("fs");
const wallpaper = require("wallpaper");
const got = require("got");
const util = require("./util");


module.exports = async () => {
  const url = util.generateURL();
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
