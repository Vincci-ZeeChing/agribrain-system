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

const createSensorData = async () => {
    try {
        const response = await fetch('http://192.168.100.145/temp_humid', {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch sensor data');
        }

        const data = await response.json();

        if (data.temperature !== 0 && data.humidity !== 0 && data.moisture !== 0) {
            await SensorModel.create({
                sensor_temperature: data.temperature.toString(),
                sensor_humidity: data.humidity.toString(),
                sensor_moisture: data.moisture.toString(),
            });
        } else {
            console.log('Skipping post request due to 0 value');
        }
    } catch (error) {
        console.error(error);
    }
};

// Schedule the task to run every 1 minute
cron.schedule('*/20 * * * * *', createSensorData);


module.exports = {
    getSensorData,
    createSensorData,
}