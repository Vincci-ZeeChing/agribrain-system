import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const Soil = () => {
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
            console.log(sensorData.moisture)
        } catch (error) {
            console.error(error);
            setRealTimeSensor({});
            return 'Failed to fetch sensor data. Please check your network connection.';
        }
    };

    const renderMoisture = () => {
        if (realTimeSensor.moisture === 0 ) {
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
        } else if (realTimeSensor.moisture <= 40) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(realTimeSensor.moisture)} %
                    </div>
                    <div className="content has-text-centered" style={{ color: 'red' }}>
                        Soil moisture is low, irrigate the crop
                    </div>
                </div>
            );
        } else if (realTimeSensor.moisture > 40 && realTimeSensor.moisture < 80) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(realTimeSensor.moisture)} %
                    </div>
                    <div className="content has-text-centered">Soil moisture is in good condition</div>
                </div>
            );
        }else if (realTimeSensor.moisture > 80) {
            return (
                <div>
                    <div className="content has-text-centered" style={{ height: '10vh', fontSize: '40px', fontWeight: 'bold' }}>
                        {formatNumber(realTimeSensor.moisture)} %
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div>
            <h1 className="title">Soil</h1>
            <div>
                Last Updated: {lastUpdated ? formatDate(lastUpdated) : 'Never'}
            </div>

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
