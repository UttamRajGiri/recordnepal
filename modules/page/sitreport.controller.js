const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const config = require("config");
const { RSUtils, DataUtils } = require("../../utils");

const schema = mongoose.Schema(
  {
    type: { type: String, required: true, default: "WHO", enum: ["WHO", "MOHP"] },
    no: {
      type: Number,
      required: true,
      unique: true
    },
    url: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  {
    collection: "sit_reports",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("SIT", schema);

class Controller {
  async list({ limit = 50, start = 0, type }) {
    let filter = {};
    if (type)
      filter = {
        type
      };
    return DataUtils.paging({
      start,
      limit,
      sort: { no: -1 },
      model,
      query: [
        {
          $match: filter
        }
      ]
    });
  }

  get(id) {
    return model.findById(id);
  }

  add(payload) {
    return model.create(payload);
  }
}

module.exports = { controller: new Controller(), model };
