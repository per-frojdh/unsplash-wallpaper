require('dotenv').config();
const getWallpaper = require("./lib/wallpaper");

(async function() {
  try {
    getWallpaper();
  } catch (e) {
    throw e;
  }
})();
