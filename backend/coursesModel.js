const mongoose = require ("mongoose")

const coursesModel = new mongoose.Schema({
    name: { type : String },
    description: { type : String },
    img: {type : String}
});

module.exports = mongoose.model("coursesModel", coursesModel)