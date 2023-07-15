const SensorModel = require("../model/SensorModel");
const cron = require('node-cron');

const getSensorData = async (req, res) => {
    try{
        let response;
        response = await SensorModel.findAll(({
            attributes:['id','sensor_uuid','sensor_temperature','sensor_humidity','sensor_moisture', 'createdAt'],
        }))
        res.status(200).json(response);
    }catch (error){
        res.status(500).json({msg:error.message});
    }
}

const getRealTimeSensorData = async (req, res) => {
    try {
        const response = await fetch('http://192.168.100.145/sensorData', {
            credentials: 'include',
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const createSensorData = async (req, res) => {
    try {
        const response = await fetch('http://192.168.100.145/sensorData', {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch sensor data');
        }

        const data = await response.json();

        if (data.temperature !== 0 && data.humidity !== 0 && data.moisture !== 0 && data.humidity < 100 && data.temperature > 20 ) {
            await SensorModel.create({
                sensor_temperature: data.temperature.toString(),
                sensor_humidity: data.humidity.toString(),
                sensor_moisture: data.moisture.toString(),
            });
        } else {
            res.status(200).json({ message: 'Skipping post request due to 0 value' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Schedule the task to run every 1 minute
cron.schedule('*/40 * * * * *', createSensorData);


module.exports = {
    getSensorData,
    getRealTimeSensorData,
    createSensorData,
}