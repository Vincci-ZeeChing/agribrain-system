import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const Surrounding = () => {
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        getSensorData();
        const interval = setInterval(getSensorData, 60000); // Refresh data every 1 minute
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const getSensorData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/sensorData');
            const sensorData = response.data;
            if (sensorData.length > 0) {
                const lastTenData = sensorData.slice(-10); // Get the last 10 data rows
                setSensorData(lastTenData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formatNumber = (number) => {
        return Number(number).toFixed(2);
    };

    const renderHumidityChart = () => {
        if (sensorData.length === 0) {
            return <div>No data available</div>;
        } else {
            const humidityData = sensorData.map((data) => formatNumber(data.sensor_humidity));
            const xaxisLabels = sensorData.map((data) => {
                const time = new Date(data.createdAt);
                return time.toLocaleTimeString([], { timeStyle: 'short' });
            });

            const chartOptions = {
                chart: {
                    id: 'humidity-chart',
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#71AF9D'],
                xaxis: {
                    categories: xaxisLabels,
                    labels: {
                        formatter: (value) => value,
                    },
                },
                yaxis: {
                    labels: {
                        formatter: (value) => Math.floor(value),
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                },
            };

            const chartSeries = [
                {
                    name: 'Humidity',
                    data: humidityData,
                },
            ];

            return <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={350} />;
        }
    };

    const renderTemperatureChart = () => {
        if (sensorData.length === 0) {
            return <div>No data available</div>;
        } else {
            const temperatureData = sensorData.map((data) => formatNumber(data.sensor_temperature));
            const xaxisLabels = sensorData.map((data) => {
                const time = new Date(data.createdAt);
                return time.toLocaleTimeString([], { timeStyle: 'short' });
            });

            const chartOptions = {
                chart: {
                    id: 'temperature-chart',
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#71AF9D'],

                xaxis: {
                    categories: xaxisLabels,
                    labels: {
                        formatter: (value) => value,
                    },
                },
                yaxis: {
                    labels: {
                        formatter: (value) => Math.floor(value),
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                },
            };

            const chartSeries = [
                {
                    name: 'Temperature',
                    data: temperatureData,
                },
            ];

            return <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={350} />;
        }
    };


    const [latestSensor, setLatestSensor] = useState({});

    useEffect(() => {
        getLatestSensor();
        const interval = setInterval(getLatestSensor, 60000); // Refresh data every 1 minute
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const getLatestSensor = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/sensorData');
            const latestSensorData = response.data;
            if (latestSensorData.length > 0) {
                const lastData = latestSensorData[latestSensorData.length - 1]; // Get the last data
                setLatestSensor(lastData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderTemperature = () => {
        if (latestSensor.sensor_temperature < 3) {
            return <div>Check your hardware devices</div>;
        } else if (latestSensor.sensor_temperature > 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(latestSensor.sensor_temperature)} °C
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
                        {formatNumber(latestSensor.sensor_temperature)} °C
                    </div>
                    <div className="content has-text-centered">Temperature is in good condition</div>
                </div>
            );
        }
    };

    const renderHumidity = () => {
        if (latestSensor.sensor_humidity < 3 ) {
            return <div>Check your hardware devices</div>;
        } else if (latestSensor.sensor_humidity < 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(latestSensor.sensor_temperature)} C
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
                        {formatNumber(latestSensor.sensor_humidity)} %
                    </div>
                    <div className="content has-text-centered">Humidity is in good condition</div>
                </div>
            );
        }
    };

    return (
        <div>
            <h1 className="title">Surrounding</h1>

            <div className="columns is-multiline">
                <div className="column is-6">
                    <div className="card" style={{ margin: '2vw' }}>
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Humidity</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered">{renderHumidityChart()}</div>
                        </div>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="card" style={{ margin: '2vw' }}>
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Temperature</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered">{renderTemperatureChart()}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns is-multiline">
                <div className="column is-4">
                    <div className="card" style={{ margin: '2vw' }}>
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Surrounding Temperature</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered">{renderTemperature()}</div>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Surrounding;
