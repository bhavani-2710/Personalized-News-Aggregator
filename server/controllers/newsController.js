const { default: axios } = require("axios");
require("dotenv").config();

const fetchNewsByLanguage = async (req, res) => {
  const { language = "en" } = req.query;
  const API_KEY = process.env.API_KEY;

  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/latest?country=in&apikey=${API_KEY}`,
      {
        params: { language },
      }
    );
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Could Not Fetch News",
      error,
    });
  }
};

const fetchSources = async (req, res) => {
  const { language= 'en' } = req.query;
  const API_KEY = process.env.API_KEY;

  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/sources?country=in&apikey=${API_KEY}`,
      {
        params: { language },
      }
    );
    res.json(response.data.results);
  } catch (error) {
    return res.json(error);
  }
}

module.exports = { fetchNewsByLanguage, fetchSources };
