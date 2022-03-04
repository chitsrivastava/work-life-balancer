const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    email: { type: String },
    message: {
        title: { type: String },
        body: { type: String }
    },
    deliveryTime: { type: String }
},
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema)