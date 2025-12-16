require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectToMongoDb } = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToMongoDb();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');

// Use routes
app.use('/', indexRouter);
app.use('/api/products', productsRouter);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 BeStore server running at http://localhost:${PORT}`);
});
