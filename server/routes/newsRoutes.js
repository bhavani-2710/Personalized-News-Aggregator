const express = require("express");
const { fetchNewsByLanguage, fetchSources } = require("../controllers/newsController");

const router = express.Router();

router.get("/language", fetchNewsByLanguage);
router.get('/sources', fetchSources)

module.exports = router;
