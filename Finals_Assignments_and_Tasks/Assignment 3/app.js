require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectToMongoDb } = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDb();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');

app.use('/', indexRouter);
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
    console.log(`BeStore server running at http://localhost:${PORT}`);
});
