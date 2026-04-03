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
        type: String,
        minLength: 5,
        maxLength: 50,
        default: "Guest"
    }
},{timestamps: true});

articleSchema.index({title: "text", content: "text"})


const Article = mongoose.model("Article", articleSchema);

module.exports = Article;