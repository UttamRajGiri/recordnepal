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
    title: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    content: String,
    image_url: String,
    lang: { type: String, required: true, default: "en", enum: ["en", "np"] }
  },
  {
    collection: "news",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("News", schema);

class Controller {
  async list({ limit = 20, start = 0, search }) {
    let filter = {};
    if (search)
      filter = {
        myth: { $regex: new RegExp(RSUtils.Text.escapeRegex(search), "gi") }
      };
    return DataUtils.paging({
      start,
      limit,
      sort: { updated_at: -1 },
      model,
      query: [
        {
          $match: filter
        },
        {
          $project: {
            content: 0
          }
        }
      ]
    });
  }

  get(id) {
    return model.findById(id);
  }
}

module.exports = { controller: new Controller(), model };
