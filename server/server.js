const express = require('express')
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const morgan = require('morgan');
const newsRouter = require('./routes/newsRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

// Routes
app.use('/news', newsRouter)

// Testing
app.get('/', (req, res) => {
    res.send("Hello World!")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));