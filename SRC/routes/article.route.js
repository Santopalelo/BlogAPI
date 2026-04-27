const express = require("express")
const requireOwnership = require("../middlewares/requireOwnership.js")
    const requireAuth = require("../middlewares/requireAuth.js")
const { postArticle, getAllArticle, updateArticleById, deleteArticleById, getArticleById, searchArticles } = require("../controllers/article.controller")
 const router = express.Router()
 router.use(requireAuth)

 router.post("/articles", postArticle)
 router.get("/articles", getAllArticle)
 router.get("/articles/search", searchArticles)
 router.get("/articles/:id", getArticleById)
 router.put("/articles/:id", requireOwnership, updateArticleById)
 router.delete("/articles/:id", requireOwnership, deleteArticleById)

 module.exports = router