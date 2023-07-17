import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const Surrounding = () => {
    const [sensorData, setSensorData] = useState([]);
	const [realTimeSensor, setRealTimeSensor] = useState("");
    const [lastUpdated, setLastUpdated] = useState(null); // Add state for last updated time

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

                // Find the latest timestamp in the data and set it as the last updated time
                const latestTimestamp = lastTenData.reduce((maxTimestamp, data) => {
                    const currentTimestamp = new Date(data.createdAt).getTime();
                    return Math.max(maxTimestamp, currentTimestamp);
                }, 0);
                setLastUpdated(new Date(latestTimestamp));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRealTimeSensor();
        const interval = setInterval(getRealTimeSensor, 5000);
        return () => clearInterval(interval);
    }, []);

    const getRealTimeSensor = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/sensorDataRealTime');
            const sensorData = response.data;
            setRealTimeSensor(sensorData);
            console.log(realTimeSensor)
        } catch (error) {
            console.error(error);
            setRealTimeSensor({});
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
                    title: {
                        text: 'Time',
                        style: {
                            fontSize: '15px',
                        },
                    },
                },
                yaxis: {
                    labels: {
                        formatter: (value) => Math.floor(value),
                    },
                    title: {
                        text: 'Humidity (%)',
                        style: {
                            fontSize: '15px',
                        },
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
                    title: {
                        text: 'Time',
                        style: {
                            fontSize: '15px',
                        },
                    },
                },
                yaxis: {
                    labels: {
                        formatter: (value) => value.toFixed(2), // Format value with 2 decimal places
                    },
                    title: {
                        text: 'Temperature (°C)',
                        style: {
                            fontSize: '15px',
                        },
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



    const renderTemperature = () => {
        if (realTimeSensor.temperature < 1) {
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
        } else if (realTimeSensor.temperature > 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(realTimeSensor.temperature)} °C
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Temperature is high. Take necessary measures to cool the environment.
                    </div>
                </div>
            );
        } else if (realTimeSensor.temperature < 40 && realTimeSensor.temperature > 20) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(realTimeSensor.temperature)} °C
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
        if (realTimeSensor.humidity <1 || realTimeSensor.humidity > 100) {
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
        } else if (realTimeSensor.humidity < 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(realTimeSensor.humidity)} %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Humidity is low. Take necessary measures to increase humidity.
                    </div>
                </div>
            );
        } else if (realTimeSensor.humidity > 40 && realTimeSensor.humidity < 80) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(realTimeSensor.humidity)} %
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

    return (
        <div>
            <h1 className="title">Surrounding</h1>
			<div>
                Last Updated: {lastUpdated ? formatDate(lastUpdated) : 'Never'}
            </div>

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
