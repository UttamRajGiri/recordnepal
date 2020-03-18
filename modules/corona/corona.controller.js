const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { RSUtils, DataUtils } = require("../../utils");

const schema = mongoose.Schema(
  {
    country: String,
    totalCases: Number,
    newCases: Number,
    totalDeaths: Number,
    newDeaths: Number,
    activeCases: Number,
    totalRecovered: Number,
    criticalCases: Number
  },
  {
    collection: "corona_stat",
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("Corona", schema);

class Controller {
  async list() {
    let data = await model.find({});
    return data;
  }

  async add(payload) {
    await model.deleteMany({});
    return model.create(payload);
  }
}

module.exports = { controller: new Controller(), model };
