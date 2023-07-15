import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const Visualization = () => {
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
                    background: '#fff',
                    foreColor: '#333',
                    fontFamily: 'Arial, sans-serif',
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
                    background: '#fff',
                    foreColor: '#333',
                    fontFamily: 'Arial, sans-serif',
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
                        text: 'Soil Moisture (%)',
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
                    name: 'Moisture',
                    data: moistureData,
                },
            ];

            return (
                <div>
                    <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={350} />
                </div>
            );
        }
    };



    const [dailyChartData, setDailyChartData] = useState({
        options: {
            chart: {
                background: '#fff',
                foreColor: '#333',
                fontFamily: 'Arial, sans-serif',
            },
            colors: ['#71AF9D'],
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        fontSize: '15px',
                    },
                },
                title: {
                    text: 'Date',
                    style: {
                        fontSize: '15px',
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '15px',
                    },
                },
                title: {
                    text: 'Average Temperature (°C)',
                    style: {
                        fontSize: '15px',
                    },
                },
            },
        },
        series: [
            {
                name: 'Average Temperature',
                data: [],
            },
        ],
    });

    const [isLoading, setIsLoading] = useState(true);
    const [forecastWeatherData, setForecastWeatherData] = useState();


    const getForecastWeather = () => {
        return axios
            .get('http://localhost:5000/api/v1/forecastWeather')
            .then((response) => {
                setForecastWeatherData(response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        setIsLoading(true);
        getForecastWeather().then((response) => {

            const weeklyForecastData = response.forecast.forecastday.slice(0, 7);
            const weeklyCategories = weeklyForecastData.map((day) => day.date);
            const averageTemperatures = weeklyForecastData.map((day) => day.day.avgtemp_c);

            setDailyChartData((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories: weeklyCategories,
                    },
                },
                series: [
                    {
                        ...prevState.series[0],
                        data: averageTemperatures,
                    },
                ],
            }));
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);



    const [hourlyChartData, setHourlyChartData] = useState({
        options: {
            chart: {
                background: '#fff',
                foreColor: '#333',
                fontFamily: 'Arial, sans-serif',
            },
            colors: ['#71AF9D'],
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        fontSize: '15px',
                    },
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
                    style: {
                        fontSize: '15px',
                    },
                },
                title: {
                    text: 'Temperature (°C)',
                    style: {
                        fontSize: '15px',
                    },
                },
            },
        },
        series: [
            {
                name: 'Temperature',
                data: [],
            },
        ],
    });
    useEffect(() => {
        setIsLoading(true);
        getForecastWeather().then((response) => {
            const forecastData = response.forecast.forecastday[0].hour;
            const currentHourIndex = getCurrentHourIndex();
            const categories = [];
            const temperatures = [];

            for (let i = 0; i < 10; i++) {
                const hourIndex = (currentHourIndex + i) % 24;
                const hourData = forecastData[hourIndex];
                categories.push(hourData.time.slice(11, 16));
                temperatures.push(hourData.temp_c);
            }

            setHourlyChartData((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories: categories,
                    },
                },
                series: [
                    {
                        ...prevState.series[0],
                        data: temperatures,
                    },
                ],
            }));

            const weeklyForecastData = response.forecast.forecastday.slice(0, 7);
            const weeklyCategories = weeklyForecastData.map((day) => day.date);
            const averageTemperatures = weeklyForecastData.map((day) => day.day.avgtemp_c);

            setWeeklyChartData((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories: weeklyCategories,
                    },
                },
                series: [
                    {
                        ...prevState.series[0],
                        data: averageTemperatures,
                    },
                ],
            }));
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const [weeklyChartData, setWeeklyChartData] = useState({
        options: {
            chart: {
                background: '#fff',
                foreColor: '#333',
                fontFamily: 'Arial, sans-serif',
            },
            colors: ['#71AF9D'],
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        fontSize: '15px',
                    },
                },
                title: {
                    text: 'Date',
                    style: {
                        fontSize: '15px',
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '15px',
                    },
                },
                title: {
                    text: 'Average Temperature (°C)',
                    style: {
                        fontSize: '15px',
                    },
                },
            },
        },
        series: [
            {
                name: 'Average Temperature',
                data: [],
            },
        ],
    });
    const getCurrentHourIndex = () => {
        const currentHour = new Date().getHours()+1;
        return currentHour;
    };



    return (
        <div>
            <h1 className="title">Visualization</h1>

            <div className="columns is-multiline">
                <div className="column is-4">
                    <div className="card">
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Humidity</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered">{renderHumidityChart()}</div>
                        </div>
                    </div>
                </div>

                <div className="column is-4">
                    <div className="card">
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Temperature</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered">{renderTemperatureChart()}</div>
                        </div>
                    </div>
                </div>

                <div className="column is-4">
                    <div className="card">
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Soil Moisture</p>
                        </header>
                        <div className="card-content">
                            <div className="content has-text-centered">{renderMoistureChart()}</div>
                        </div>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="card">
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Daily Forecast</p>
                        </header>
                        <div className="card-content">
                            {isLoading ? (
                                <p>Loading chart...</p>
                            ) : (
                                <>
                                    <ReactApexChart
                                        options={dailyChartData.options}
                                        series={dailyChartData.series}
                                        type="area"
                                        height={400}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="card">
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Hourly Forecast</p>
                        </header>
                        <div className="card-content">
                            {isLoading ? (
                                <p>Loading chart...</p>
                            ) : (
                                <>
                                    <ReactApexChart
                                        options={hourlyChartData.options}
                                        series={hourlyChartData.series}
                                        type="area"
                                        height={400}
                                    />
                                </>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Visualization;
