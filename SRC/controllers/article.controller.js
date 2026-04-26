const articleModel = require("../models/article.model.js");

const postArticle = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const newArticle = new articleModel({
      title,
      content,
      author: req.user._id,
    });
    await newArticle.save();

    return res.status(201).json({
      message: "Article created",
      data: newArticle,
    });
  } catch (error) {
    next(error);
  }
};

const getAllArticle = async (req, res, next) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const article = await articleModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("author", "name _id email");
    return res.status(200).json({
      message: "article fetched",
      data: article,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const article = await articleModel.findById(req.params.id);
    if (!article) {
      return res.status(404).json({
        message: `article with ${req.params.id} not found`,
      });
    }
    return res.status(200).json({
      message: "article found",
      data: article,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateArticleById = async (req, res, next) => {
  const { title, content, subtitle } = req.body;
  try {
    const updateArticle = await articleModel.findByIdAndUpdate(
      req.params.id,
      { title, content, subtitle },
      { new: true, runValidators: true },
    );
    if (!updateArticle) {
      return res.status(404).json({
        message: "article not found",
      });
    }
    return res.status(200).json({
      message: `article with id ${req.params.id} updated successfully`,
      data: updateArticle,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
const deleteArticleById = async (req, res, next) => {
  try {
    const deleteArticle = await articleModel.findByIdAndDelete(req.params.id);
    if (!deleteArticle) {
      return res.status(404).json({
        message: `article not found`,
      });
    }
    return res.status(200).json({
      message: `article with ${req.params.id} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
const searchArticles = async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({
      message: "please provide search query",
    });
  }
  try {
    const search = await articleModel
      .find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } });
    return res.status(200).json({
      message: "articles found",
      data: search,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postArticle,
  getAllArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  searchArticles,
};
