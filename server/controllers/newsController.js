const { default: axios } = require("axios");
const {
  getCachedLatestNews,
  fetchAndCacheLatestNews,
  getCachedSources,
  fetchAndCacheSources,
} = require("../utils/cache");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

// Fetch news of a particular language
const fetchNewsByLanguage = async (req, res) => {
  const { language = "en" } = req.params;

  const cacheKey = `latestNews:language:${language}`;

  try {
    // Check Redis first
    const cachedData = await getCachedLatestNews(cacheKey);

    if (cachedData) {
      console.log(`Cache Hit: Returning cached News for ${cacheKey}`);
      return res.json(JSON.parse(cachedData));
    } else {
      //  Cache Miss: Fetch from DB
      console.log(`Cache Miss: Fetching News for ${cacheKey} from DB`);

      const response = await axios.get(
        `https://newsdata.io/api/1/latest?country=in&apikey=${API_KEY}`,
        {
          params: { language },
        }
      );
      // Cache the data
      await fetchAndCacheLatestNews(cacheKey, response.data);

      return res.status(200).json(response.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Could Not Fetch News",
      error,
    });
  }
};

// Fetch all sources of a particular language
const fetchSources = async (req, res) => {
  const { language = "en" } = req.params;

  const cacheKey = `sources:${language}`;

  try {
    // Check Redis first
    const cachedData = await getCachedSources(cacheKey);

    if (cachedData) {
      console.log(`Cache Hit: Returning cached News for ${cacheKey}`);
      return res.json(JSON.parse(cachedData));

    } else {
      //  Cache Miss: Fetch from DB
      console.log(`Cache Miss: Fetching News for ${cacheKey} from DB`);

      const response = await axios.get(
        `https://newsdata.io/api/1/sources?country=in&apikey=${API_KEY}`,
        {
          params: { language },
        }
      );

      // Cache the data
      await fetchAndCacheSources(cacheKey, response.data.results);

      return res.status(200).json(response.data.results);
    }
  } catch (error) {
    return res.json(error);
  }
};

// Fetch news containing a particular keyword -> 'SEARCH'
const searchParticularNews = async (req, res) => {
  const { searchWord } = req.query;

  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/latest?country=in&apikey=${API_KEY}`,
      {
        params: { qInTitle: searchWord },
      }
    );
    return res.json(response.data);
  } catch (error) {
    return res.status(error.status).json({
      message: "No Relevant News found.",
      error,
    });
  }
};

const getNextPageSearchData = async (req, res) => {
  const { page } = req.query;
  const { searchWord } = req.body;

  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/latest?country=in&apikey=${API_KEY}`,
      {
        params: { qInTitle: searchWord, page },
      }
    );
    return res.json(response.data);
  } catch (error) {
    return res.json(error);
  }
};

// Get news of a particular domain -> 'SOURCE'
const getNewsOfParticularDomain = async (req, res) => {
  const domain = req.params.source;

  const cacheKey = `latestNews:domain:${domain}`;

  try {
    // Check Redis first
    const cachedData = await getCachedLatestNews(cacheKey);

    if (cachedData) {
      console.log(`Cache Hit: Returning cached News for ${cacheKey}`);
      return res.json(JSON.parse(cachedData));

    } else {
      //  Cache Miss: Fetch from DB
      console.log(`Cache Miss: Fetching News for ${cacheKey} from DB`);

    const response = await axios.get(
      `https://newsdata.io/api/1/latest?country=in&apikey=${API_KEY}`,
      { params: { domain } }
    );

    // Cache the data
    await fetchAndCacheLatestNews(cacheKey, response.data);

    return res.status(200).json(response.data);
  }
  } catch (error) {
    return res.json(error);
  }
};

const getNextPageDomainData = async (req, res) => {
  const { page } = req.query;
  const domain = req.params.source;

  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/latest?country=in&apikey=${API_KEY}`,
      {
        params: { domain, page },
      }
    );
    return res.json(response.data);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  fetchNewsByLanguage,
  fetchSources,
  searchParticularNews,
  getNextPageSearchData,
  getNewsOfParticularDomain,
  getNextPageDomainData,
};
