import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const Soil = () => {
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

    const formatNumber = (number) => {
        return Number(number).toFixed(2);
    };

    const renderMoistureChart = () => {
        if (sensorData.length === 0) {
            return <div>No data available</div>;
        } else {
            const moistureData = sensorData.map((data) => formatNumber(data.sensor_moisture));
            const xaxisLabels = sensorData.map((data) => {
                const time = new Date(data.createdAt);
                return time.toLocaleTimeString([], { timeStyle: 'short' });
            });

            const chartOptions = {
                chart: {
                    background: '#fff',
                    foreColor: '#333',
                    fontFamily: 'Arial, sans-serif',
                    zoom: {
                        enabled: false,
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
                    name: 'Moisture',
                    data: moistureData,
                },
            ];

            return (
                <div>
                    <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={400} />
                </div>
            );
        }
    };

    const renderMoisture = () => {
        if (latestSensor.sensor_moisture === 0) {
            return <div>Check your hardware devices</div>;
        } else if (latestSensor.sensor_moisture <= 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(latestSensor.sensor_moisture)} %
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
                        {formatNumber(latestSensor.sensor_moisture)} %
                    </div>
                    <div className="content has-text-centered"> Soil moisture is in good condition</div>
                </div>
            );
        }
    };

    return (
        <div>
            <h1 className="title">Soil</h1>

            <div className="column fullwidth">
                <div className="card" style={{ margin: '2vw' }}>
                    <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                        <p className="card-header-title is-centered">Soil Moisture</p>
                    </header>
                    <div className="card-content">
                        <div className="content has-text-centered">{renderMoistureChart()}</div>
                    </div>
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
                </div>
            </div>

        </div>
    );
};

export default Soil;
