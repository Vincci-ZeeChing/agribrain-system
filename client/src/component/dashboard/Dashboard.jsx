import React, {useEffect, useState} from 'react';
import axios from "axios";

const DashboardComponent = () => {
    const [weatherData, setWeatherData] = useState();
    const [currentDate, setCurrentDate] = useState('');
    const [dailyQuote, setDailyQuote] = useState('');
    const [sensor, setSensor] = useState({});
    const [farmingAdvice, setFarmingAdvice] = useState('');

    const quotes = [
        "\"The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways.\" - John F. Kennedy",
        "\"Farming is a profession of hope.\" - Brian Brett",
        "\"The farmer has to be an optimist or he wouldn't still be a farmer.\" - Will Rogers",
        "\"Agriculture is our wisest pursuit because it will, in the end, contribute most to real wealth, good morals, and happiness.\" - Thomas Jefferson",
        "\"The future of agriculture is not input-intensive, but knowledge-intensive.\" - M.S. Swaminathan",
        "\"Agriculture is the backbone of our economy.\" - James H. Douglas, Jr.",
        "\"The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings.\" - Masanobu Fukuoka",
        "\"Agriculture is the most healthful, most useful, and most noble employment of man.\" - George Washington",
        "\"Farming looks mighty easy when your plow is a pencil, and you're a thousand miles from the cornfield.\" - Dwight D. Eisenhower",
        "\"The discovery of agriculture was the first big step toward a civilized life.\" - Arthur Keith"
    ];


    useEffect(() => {
        getSensor();
        const interval = setInterval(getSensor, 60000); // Refresh data every 1 minute
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const getSensor = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/sensorData');
            const sensorData = response.data;
            if (sensorData.length > 0) {
                const lastData = sensorData[sensorData.length - 1]; // Get the last data
                setSensor(lastData);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const getWeatherData = () => {
        axios
            .get(
                "http://localhost:5000/api/v1/currentWeather"
            )
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.log(error);
                // You can add additional error handling here, such as setting a default weather data value
            });
    };

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };

    const updateDailyQuote = () => {
        const today = new Date().toLocaleDateString();
        if (currentDate !== today) {
            setCurrentDate(today);
            setDailyQuote(getRandomQuote());
        }
    };

    useEffect(() => {
        updateDailyQuote();
        getWeatherData();
        // Run the updateDailyQuote function every day at midnight
        const timer = setInterval(updateDailyQuote, 86400000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        updateFarmingAdvice();
    }, [sensor]);

    const updateFarmingAdvice = () => {
        const { sensor_moisture, sensor_temperature, sensor_humidity } = sensor;

        let advice = '';
        if (sensor_moisture < 30) {
            advice = 'Increase irrigation to maintain optimal soil moisture.';
        } else if (sensor_moisture > 70) {
            advice = 'Reduce irrigation to avoid overwatering.';
        } else {
            advice = 'Soil moisture level is optimal for crop growth.';
        }

        if (sensor_temperature > 35 && sensor_humidity > 80) {
            advice += ' High temperature and humidity may require additional shading and ventilation.';
        } else if (sensor_temperature < 15 && sensor_humidity < 40) {
            advice += ' Low temperature and humidity may require additional heating and moisture.';
        } else {
            advice += ' No specific advice for current temperature and humidity conditions.';
        }

        setFarmingAdvice(advice);
    };

    return (
        <div>
            <div className="columns">
                <div className="column is-4">
                    <div className="card" style={{ margin: '2vw', height: '60vh' }}>
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: "#E1F6F0" }}>
                            <p className="card-header-title is-centered">Climate Condition</p>
                        </header>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: "2vh"
                            }}>
                            {weatherData && weatherData.current && (
                                <img
                                    style={{ height: '150px', width: '150px', marginTop: "5vh" }}
                                    src={weatherData.current.condition.icon}
                                    alt="weather-icon"
                                />
                            )}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            {weatherData && weatherData.current && (
                                <h1 style={{ fontSize: "70px", fontWeight: "bold" }}>
                                    {weatherData.current.temp_c}°C
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
                <div className="column is-6">
                    <div className="columns" style={{ height: '40vh' }}>
                        <div className="column is-6">
                            <div className="card" style={{ width: '40vw', margin: '2vw' , height: "35vh" }}>
                                <header className="card-header" style={{ boxShadow: 'none', backgroundColor: "#E1F6F0" }}>
                                    <p className="card-header-title is-centered">Sensor Monitoring</p>
                                </header>
                                <div className="card-content" style={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    {/* Rest of your sensor monitoring code */}
                                    <div className="content has-text-centered" style={{ fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Soil Moisture :</span>
                                        <span>{sensor.sensor_moisture} %</span>
                                    </div>
                                    <div className="content has-text-centered" style={{ fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Temperature :</span>
                                        <span>{Number(sensor.sensor_temperature).toFixed(2)} °C</span>
                                    </div>
                                    <div className="content has-text-centered" style={{ fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Humidity :</span>
                                        <span>{sensor.sensor_humidity} %</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="card" style={{ width: '40vw', margin: '2vw', height: '35vh' }}>
                                <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                                    <p className="card-header-title is-centered">Farming Advisor</p>
                                </header>
                                <div className="card-content" style={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div className="content has-text-centered" style={{ fontSize: '20px' }}>
                                        {farmingAdvice}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-12">
                            <div className="card" style={{ width: '60vw', margin: '2vw' }}>
                                <header className="card-header" style={{ boxShadow: 'none', backgroundColor: "#E1F6F0" }}>
                                    <p className="card-header-title is-centered">Quote</p>
                                </header>
                                <div className="card-content" style={{ padding: '10px' }}>
                                    <div className="content has-text-centered" style={{ fontSize: '18px' }}>
                                        {dailyQuote}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
