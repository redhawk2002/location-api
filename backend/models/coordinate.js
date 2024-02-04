const mongoose = require("mongoose");
const cordSchema = new mongoose.Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});
module.exports = mongoose.model("Cord", cordSchema);
