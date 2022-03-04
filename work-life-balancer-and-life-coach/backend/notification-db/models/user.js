const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: { type: String, unique: true },
  subscription: {
    endpoint: { type: String },
    expirationTime: { type: String, default: null },
    keys: {
      p256dh: { type: String },
      auth: { type: String },
    }
  },
  loginTime: { type: String },
  logoffTime: { type: String },
  lunchTime: { type: String },
  maxWorkPeriodInHours: { type: String },
},
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema)