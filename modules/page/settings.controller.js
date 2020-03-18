const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    is_public: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    collection: "settings",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);
const model = mongoose.model("Settings", schema);

class Controller {
  constructor() {}

  async getByName(name) {
    return model.findOne({ name });
  }
}

module.exports = new Controller();
