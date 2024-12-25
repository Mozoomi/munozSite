const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
});

module.exports = mongoose.model('Image', imageSchema);

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

module.exports = Image;