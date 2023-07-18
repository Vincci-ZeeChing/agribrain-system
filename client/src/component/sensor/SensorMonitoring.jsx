import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SensorMonitoring = () => {
    const [sensor, setSensor] = useState({});

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
            console.log(sensorData.moisture)
        } catch (error) {
            console.error(error);
            setSensor({});
            return 'Failed to fetch sensor data. Please check your network connection.';
        }
    };

    const formatNumber = (number) => {
        return Number(number).toFixed(2);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


    const renderTemperature = () => {
        if (sensor.temperature < 1) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        NaN °C
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Check your hardware devices
                    </div>
                </div>
            );
        } else if (sensor.temperature > 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.temperature)} °C
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Temperature is high. Take necessary measures to cool the environment.
                    </div>
                </div>
            );
        } else if (sensor.temperature < 40 && sensor.temperature > 20) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.temperature)} °C
                    </div>
                    <div className="content has-text-centered">Temperature is in good condition</div>
                </div>
            );
        }else {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        NaN °C
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Check your hardware devices
                    </div>
                </div>
            );
        }
    };

    const renderHumidity = () => {
        if (sensor.humidity <1 || sensor.humidity > 100) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        NaN %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Check your hardware devices
                    </div>
                </div>
            );
        } else if (sensor.humidity < 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.humidity)} %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Humidity is low. Take necessary measures to increase humidity.
                    </div>
                </div>
            );
        } else if (sensor.humidity > 40 && sensor.humidity < 80) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.humidity)} %
                    </div>
                    <div className="content has-text-centered">Humidity is in good condition</div>
                </div>
            );
        }else {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        NaN %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Check your hardware devices
                    </div>
                </div>
            );
        }
    };

    const renderMoisture = () => {
        if (sensor.moisture === 0 ) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        NaN %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Insertion of the sensor into the soil.
                    </div>
                </div>
            );
        } else if (sensor.moisture <= 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.moisture)} %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Soil moisture is low, irrigate the crop
                    </div>
                </div>
            );
        } else if (sensor.moisture > 40 && sensor.moisture < 80) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.moisture)} %
                    </div>
                    <div className="content has-text-centered">Soil moisture is in good condition</div>
                </div>
            );
        }else if (sensor.moisture > 80) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(sensor.moisture)} %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>Soil moisture is low, stop irrigate the crop</div>
                </div>
            );
        }else {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        NaN %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Check your hardware devices
                    </div>
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
                        <div className="card-content" style={{ height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        <div className="card-content" style={{ height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        <div className="card-content" style={{ height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
