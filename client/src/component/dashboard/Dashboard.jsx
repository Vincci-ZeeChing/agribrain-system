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
        const interval = setInterval(getSensor, 5000);
        return () => clearInterval(interval);
    }, []);

    const getSensor = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/sensorDataRealTime');
            const sensorData = response.data;
            setSensor(sensorData);
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
        const { moisture, temperature, humidity } = sensor;

        let advice = '';
        if (moisture < 40 && moisture >= 1) {
            advice = 'Increase irrigation to maintain optimal soil moisture.';
        } else if (moisture > 80) {
            advice = 'Reduce irrigation to avoid overwatering.';
        }else if (moisture === 0 ) {
            advice = 'Insertion of the sensor into the soil.';
        }else if (moisture <80 || moisture > 40) {
            advice = 'Soil moisture level is optimal for crop growth.';
        }


        if (temperature > 38 && humidity > 80) {
            advice += ' High temperature and humidity may require additional shading and ventilation.';
        }else if (temperature >33) {
            advice += ' High temperature may require irrigation.';
        }else if (temperature > 20 && temperature < 33) {
            advice += ' No specific advice for current temperature and humidity conditions.';
        } else {
            advice = ' Hardware Error, Please check the hardware.';
        }

        setFarmingAdvice(advice);
    };

    const renderTemperature = () => {
        if (sensor.temperature < 20) {
            return (
                <div>
                    NaN °C
                </div>
            );
        }else if (sensor.temperature >= 20 || sensor.temperature <= 40) {
            return (
                <div>
                    {Number(sensor.temperature).toFixed(2)} °C
                </div>
            );
        }else {
            return (
                <div>
                    NaN °C
                </div>
            );
        }
    };

    const renderHumidity = () => {
        if (sensor.humidity < 1 || sensor.humidity > 100) {
            return (
                <div>
                    NaN %
                </div>
            );
        }else if (sensor.humidity >=1 ||sensor.humidity <= 100) {
            return (
                <div>
                    {sensor.humidity} %
                </div>
            );
        } else {
            return (
                <div>
                    NaN %
                </div>
            );
        }
    };

    const renderMoisture = () => {
        if (sensor.moisture === 0) {
            return (
                <div>
                    0 %
                </div>
            );
        } else if (sensor.moisture >1 || sensor.moisture < 100) {
            return (
                <div>
                    {sensor.moisture} %
                </div>
            );
        }else {
            return (
                <div>
                    NaN %
                </div>
            );
        }
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
                                        <span>{renderMoisture()}</span>
                                    </div>
                                    <div className="content has-text-centered" style={{ fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Temperature :</span>
                                        <span>{renderTemperature()}</span>
                                    </div>
                                    <div className="content has-text-centered" style={{ fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Humidity :</span>
                                        <span>{renderHumidity()}</span>
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
