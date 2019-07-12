const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  status: {
    type: String,
    required: true
  },
  experience: [
    {
      sno: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      subcategory: {
        type: String,
        required: true
      },
      itemname: {
        type: String,
        required: true
      },
      quantity: {
        type: String,
        required: true
      },
      toxic: {
        type: String,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
