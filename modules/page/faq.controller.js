const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const config = require("config");
const { RSUtils, DataUtils } = require("../../utils");

const schema = mongoose.Schema(
  {
    type: { type: String, required: true, default: "text", enum: ["text", "image"] },
    question: {
      type: String,
      required: true,
      unique: true
    },
    answer: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    question_np: String,
    answer_np: String,
    lang: { type: String, required: true, default: "en", enum: ["en", "np"] },
    image_url: String
  },
  {
    collection: "faqs",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("FAQ", schema);

class Controller {
  async list({ limit = 50, start = 0, search }) {
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
        }
      ]
    });
  }

  get(id) {
    return model.findById(id);
  }
}

module.exports = { controller: new Controller(), model };
