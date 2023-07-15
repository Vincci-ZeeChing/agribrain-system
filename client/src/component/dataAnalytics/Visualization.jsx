import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const Visualization = () => {
    const [realTimeSensor, setRealTimeSensor] = useState({});
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        getRealTimeSensor();
        const interval = setInterval(getRealTimeSensor, 6000);
        return () => clearInterval(interval);
    }, []);

    const getRealTimeSensor = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/sensorData');
            const sensorData = response.data;
            if (sensorData.length > 0) {
                const lastRecord = sensorData[sensorData.length - 1];
                const temperature = parseFloat(lastRecord.sensor_temperature).toFixed(2);
                const humidity = lastRecord.sensor_humidity;
                const moisture = lastRecord.sensor_moisture;
                setRealTimeSensor({ temperature, humidity, moisture });
            }
        } catch (error) {
            console.error(error);
        }
    };


    const combinedGaugeOptions = {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    showOn: "always",
                    name: {
                        // fontSize: "16px",
                        // color: "#888",
                        // offsetY: -10,
                        show: false,
                    },
                    value: {
                        // formatter: function (val) {
                        //     if (typeof val === "number") {
                        //         return val.toFixed(2);
                        //     }
                        //     return val;
                        // },
                        // color: "#111",
                        // offsetY: 0,
                        // fontSize: "28px",
                        show: false,
                    },
                },
            },
        },
        // colors: ['#1ab7ea', '#0084ff', '#39539E'],
        labels: ['Temperature', 'Humidity', 'Moisture'],
        legend: {
            show: true,
            floating: true,
            fontSize: '16px',
            position: 'left',
            offsetX: 0,
            offsetY: 15,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [
            {
                breakpoint: 972,
                options: {
                    legend: {
                        show: false
                    }
                }
            },
            {
                breakpoint: 770,
                options: {
                    legend: {
                        show: true
                    }
                }
            },
            {
                breakpoint: 517,
                options: {
                    legend: {
                        show: false
                    }
                }
            },
        ]
    };

    const combinedGaugeSeries = [
        realTimeSensor?.temperature || 0,
        realTimeSensor?.humidity || 0,
        realTimeSensor?.moisture || 0,
    ];

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

    useEffect(() => {
        getWeatherData();
    }, []);


    return (
        <div>
            <h1 className="title">Visualization</h1>

            <div className="columns is-multiline">
                <div className="column is-6">
                    <div className="card">
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Sensor Data</p>
                        </header>
                        <div className="card-content">
                            <ReactApexChart options={combinedGaugeOptions} series={combinedGaugeSeries} type="radialBar" height={350} />
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card" style={{minHeight:"60vh"}}>
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
            </div>
        </div>
    );
};

export default Visualization;
