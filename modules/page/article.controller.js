const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const config = require("config");
const { RSUtils, DataUtils } = require("../../utils");

const schema = mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    cover_image: String,
    lang: { type: String, required: true, default: "en", enum: ["en", "np"] }
  },
  {
    collection: "articles",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("Article", schema);

class Controller {
  async list({ limit = 50, start = 0, search }) {
    let filter = {};
    if (search)
      filter = {
        title: { $regex: new RegExp(RSUtils.Text.escapeRegex(search), "gi") }
      };
    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
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

  getBySlug(slug) {
    return model.findOne({ slug });
  }
}

module.exports = { controller: new Controller(), model };
