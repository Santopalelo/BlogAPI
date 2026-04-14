
 const express = require("express")
    const requireAuth = require("../middlewares/requireAuth.js")
    const requireOwnership = require("../middlewares/requireOwnership.js")
const { postArticle, getAllArticle, updateArticleById, deleteArticleById, getArticleById, searchArticles } = require("../controllers/article.controller")
 const router = express.Router()

 router.post("/articles", requireAuth, postArticle)
 router.get("/articles",requireAuth, getAllArticle)
 router.get("/articles/search", searchArticles)
 router.get("/articles/:id", requireAuth, getArticleById)
 router.put("/articles/:id", requireAuth, updateArticleById)
 router.delete("/articles/:id", requireAuth, deleteArticleById)

 module.exports = router