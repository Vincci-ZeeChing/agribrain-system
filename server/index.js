require('dotenv').config();

const express = require('express');
const { sequelize } = require('./config/Database.js');
// const { UserModel } = require('./model/UserModel.js');
// const { FarmingModel } = require('./model/FarmingModel.js');
// const { CropModel } = require('./model/CropModel.js');
const UserRoute = require("./route/UserRoute");
const CropRoute = require("./route/CropRoute");
const FarmingRoute = require("./route/FarmingRoute");
const WeatherRoute = require("./route/WeatherRoute");


const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Agribrain System!');
});

app.use(express.json());
app.use(UserRoute)
app.use(CropRoute)
app.use(FarmingRoute)
app.use(WeatherRoute)

//
// Sync the UserModel with the database
// sequelize.sync()
//     .then(() => {
//         console.log('Model synchronized with database');
//     })
//     .catch((error) => {
//         console.error('Error synchronizing UserModel:', error);
//     });

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}...`);
});
