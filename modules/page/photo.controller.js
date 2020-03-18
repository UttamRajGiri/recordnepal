const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const config = require("config");
const { RSUtils, DataUtils } = require("../../utils");

const schema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true
    },
    summary: {
      type: String
    },
    summary_np: {
      type: String
    },
    location: String,
    source: String
  },
  {
    collection: "photos",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("Photo", schema);

class Controller {
  async list({ limit = 50, start = 0, search }) {
    let filter = {};
    if (search)
      filter = {
        summary: { $regex: new RegExp(RSUtils.Text.escapeRegex(search), "gi") }
      };
    return DataUtils.paging({
      start,
      limit,
      sort: { updated_at: -1 },
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
}

module.exports = { controller: new Controller(), model };
