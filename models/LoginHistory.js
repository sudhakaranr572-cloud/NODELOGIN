const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    device: {
      type: String,
      default: "Unknown Device"
    },

    ipAddress: {
      type: String,
      default: "Unknown"
    },

    loginDate: {
      type: Date,
      default: Date.now
    }
  }
);

const LoginHistory = mongoose.model(
  "LoginHistory",
  loginHistorySchema
);

module.exports = LoginHistory;