const mongoose = require("mongoose");
const deviceSchema = mongoose.Schema({
  osType: {
    type: Number,
    enum: [1, 2],
    default: 1,
  },
  deviceId: {
    type: String,
    unique: true,
    required: true,
  },
  appVersion: {
    type: String,
  },
  deviceName: {
    type: String,
  },
  macAddress: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
});
