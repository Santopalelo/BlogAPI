const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100
    },
    content:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1000
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true});

articleSchema.index({title: "text", content: "text"})


const articleModel = mongoose.model("Article", articleSchema);

module.exports = articleModel;