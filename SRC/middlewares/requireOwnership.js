const articleModel = require("../models/article.model");

const requireOwnership = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const userId = req.user._id;

    // Find the article
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Check if the current user is the author
    if (article.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You can only modify your own articles" });
    }

    // Attach article to request for use in controller
    req.article = article;
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error while checking ownership" });
  }
};

module.exports = requireOwnership;
