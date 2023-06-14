require('dotenv').config();

const express = require('express');
const session = require('express-session');
const SessionStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');

const { sequelize } = require('./config/Database.js');
// const { UserModel } = require('./model/UserModel.js');
// const { FarmingModel } = require('./model/FarmingModel.js');
// const { CropModel } = require('./model/CropModel.js');
const UserRoute = require("./route/UserRoute");
const CropRoute = require("./route/CropRoute");
const FarmingRoute = require("./route/FarmingRoute");
const WeatherRoute = require("./route/WeatherRoute");

const AuthRoute = require("./route/AuthRoute");

const app = express();

const store = new SessionStore({
    db: sequelize
});

// Add the following line to configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
    }
}));

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}));

app.get('/', (req, res) => {
    res.send('Welcome to Agribrain System!');
});

//
// // Sync the with the database
// sequelize.sync()
//     .then(() => {
//         console.log('Model synchronized with database');
//     })
//     .catch((error) => {
//         console.error('Error synchronizing UserModel:', error);
//     });


app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(CropRoute);
app.use(FarmingRoute);
app.use(WeatherRoute);
// store.sync();

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}...`);
});
