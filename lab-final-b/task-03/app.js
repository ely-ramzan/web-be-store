require('dotenv').config();
const express = require('express');
const session = require('express-session');
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

// Session middleware for cart
app.use(session({
    secret: process.env.SESSION_SECRET || 'bestore-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const orderRouter = require('./routes/order');

app.use('/', indexRouter);
app.use('/', orderRouter);
app.use('/api/products', productsRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
    console.log(`BeStore server running at http://localhost:${PORT}`);
});
