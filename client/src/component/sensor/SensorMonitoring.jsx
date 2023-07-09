import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SensorMonitoring = () => {
    const [sensor, setSensor] = useState({});

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

    const formatNumber = (number) => {
        return Number(number).toFixed(2);
    };

    const renderTemperature = () => {
        if (sensor.sensor_temperature < 3) {
            return <div>Check your hardware devices</div>;
        } else if (sensor.sensor_temperature > 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.sensor_temperature)} °C
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Temperature is high. Take necessary measures to cool the environment.
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.sensor_temperature)} °C
                    </div>
                    <div className="content has-text-centered">Temperature is in good condition</div>
                </div>
            );
        }
    };

    const renderHumidity = () => {
        if (sensor.sensor_humidity < 3 ) {
            return <div>Check your hardware devices</div>;
        } else if (sensor.sensor_humidity < 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.sensor_humidity)} %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Humidity is low. Take necessary measures to increase humidity.
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.sensor_humidity)} %
                    </div>
                    <div className="content has-text-centered">Humidity is in good condition</div>
                </div>
            );
        }
    };

    const renderMoisture = () => {
        if (sensor.sensor_moisture === 0) {
            return <div>Check your hardware devices</div>;
        } else if (sensor.sensor_moisture <= 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.sensor_moisture)} %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Soil moisture is low, irrigate the crop
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.sensor_moisture)} %
                    </div>
                    <div className="content has-text-centered"> Soil moisture is in good condition</div>
                </div>
            );
        }
    };

    return (
        <div>
            <h1 className="title">Sensor Monitoring</h1>

            <div className="columns is-multiline">
                <div className="column is-4">
                    <div className="card" style={{ margin: '2vw' }}>
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Surrounding Temperature</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered">{renderTemperature()}</div>
                        </div>
                        <footer className="card-footer">
                            <a href="/sensor-monitoring/surrounding" className="card-footer-item">
                                Read More
                            </a>
                        </footer>
                    </div>
                </div>

                <div className="column is-4">
                    <div className="card" style={{ margin: '2vw' }}>
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Surrounding Humidity</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered">{renderHumidity()}</div>
                        </div>
                        <footer className="card-footer">
                            <a href="/sensor-monitoring/surrounding" className="card-footer-item">
                                Read More
                            </a>
                        </footer>
                    </div>
                </div>

                <div className="column is-4">
                    <div className="card" style={{ margin: '2vw' }}>
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Soil Moisture</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered">{renderMoisture()}</div>
                        </div>
                        <footer className="card-footer">
                            <a href="/sensor-monitoring/soil" className="card-footer-item">
                                Read More
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensorMonitoring;
