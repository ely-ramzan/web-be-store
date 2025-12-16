const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const indexRouter = require('./routes/index');

// Use routes
app.use('/', indexRouter);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 BeStore server running at http://localhost:${PORT}`);
});
