// =============== require and run express and cors
const express = require('express');
const app = express();
const cors = require('cors');

// =============== add body parser ===============
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

// =============== BODY PARSER SETTINGS =====================
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// =============== DATABASE CONNECTION =====================
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:3030/ecommerce_github`);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

// =============== ROUTES ==============================
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// =============== USE ROUTES ==============================
app.use(cors());
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/', orderRoutes);

// =============== START SERVER =====================
const port = process.env.port || 3030;
app.listen(port, () => 
    console.log(`server listening on port ${port}`
));
