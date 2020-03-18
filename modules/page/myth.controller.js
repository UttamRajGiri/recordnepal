const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const config = require("config");
const { RSUtils, DataUtils } = require("../../utils");
const SettingsController = require("./settings.controller");

const schema = mongoose.Schema(
  {
    type: { type: String, required: true, default: "text", enum: ["text", "image"] },
    myth: {
      type: String,
      required: true,
      unique: true
    },
    reality: {
      type: String,
      required: true
    },
    myth_np: String,
    reality_np: String,
    source_name: String,
    source_url: String,
    image_url: String,
    lang: { type: String, required: true, default: "en", enum: ["en", "np"] }
  },
  {
    collection: "myths",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("Myth", schema);

class Controller {
  async list({ limit = 50, start = 0, search }) {
    // let data = await SettingsController.getByName("myths_order");
    // let myths_order = data.value;

    let filter = { type: { $nin: ["video"] } };
    if (search) filter.myth = { $regex: new RegExp(RSUtils.Text.escapeRegex(search), "gi") };
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
