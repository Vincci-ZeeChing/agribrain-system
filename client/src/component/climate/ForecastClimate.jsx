import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const ForecastClimate = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [forecastWeatherData, setForecastWeatherData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hourlyChartData, setHourlyChartData] = useState({
        options: {
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

    const [weeklyChartData, setWeeklyChartData] = useState({
        options: {
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

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const getCurrentHourIndex = () => {
        const currentHour = new Date().getHours()+1;
        return currentHour;
    };

    const renderWeatherCards = () => {
        if (!forecastWeatherData) return null;

        const forecastData = forecastWeatherData.forecast.forecastday[0].hour;
        const currentHourIndex = getCurrentHourIndex();

        const weatherCards = [];
        for (let i = 0; i < 10; i++) {
            const hourIndex = (currentHourIndex + i) % 24;
            const hourData = forecastData[hourIndex];

            weatherCards.push(
                <div className="column" key={i}>
                    <div className="card">
                        <header
                            className="card-header"
                            style={{
                                boxShadow: 'none',
                                backgroundColor: '#E1F6F0',
                            }}
                        >
                            <p className="card-header-title is-centered">
                                {hourData.time.slice(11, 16)}
                            </p>
                        </header>
                        <div className="card-content" style={{minHeight:"30vh"}}>
                            <div className="content has-text-centered">
                                <div>
                                    {hourData.condition && (
                                        <img
                                            src={hourData.condition.icon}
                                            alt="weather-icon"
                                            style={{ margin: '0 auto' }}
                                        />
                                    )}
                                    {hourData.condition && hourData.condition.text}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return weatherCards;
    };

    return (
        <div>
            <h1 className="title">Forecast Climate</h1>
            <div className="tabs is-boxed">
                <ul>
                    <li className={activeTab === 0 ? 'is-active' : ''}>
                        <a onClick={() => handleTabClick(0)}>
                            <span>Hourly</span>
                        </a>
                    </li>
                    <li className={activeTab === 1 ? 'is-active' : ''}>
                        <a onClick={() => handleTabClick(1)}>
                            <span>7 Days</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tab-content">
                {activeTab === 0 && (
                    <div>
                        <div className="columns is-multiline">
                            {renderWeatherCards()}
                        </div>
                        <div>
                            {isLoading ? (
                                <p>Loading chart...</p>
                            ) : (
                                <ReactApexChart
                                    options={hourlyChartData.options}
                                    series={hourlyChartData.series}
                                    type="area"
                                    height={430}
                                />
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 1 && (
                    <div>
                        <div>
                            <div className="columns is-multiline mb-3">
                                {forecastWeatherData &&
                                    forecastWeatherData.forecast.forecastday.slice(1, 8).map((day, index) => (
                                        <div className="column" key={index}>
                                            <div className="card">
                                                <header
                                                    className="card-header"
                                                    style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}
                                                >
                                                    <p className="card-header-title is-centered">{day.date}</p>
                                                </header>
                                                <div className="card-content has-text-centered">
                                                    <div className="media is-flex is-align-items-center">
                                                        <div className="media-content">
                                                            <div className="content">
                                                                {forecastWeatherData &&
                                                                    forecastWeatherData.forecast.forecastday[index + 1].day
                                                                        .condition && (
                                                                        <figure className="image">
                                                                            <img
                                                                                src={
                                                                                    forecastWeatherData.forecast.forecastday[
                                                                                    index + 1
                                                                                        ].day.condition.icon
                                                                                }
                                                                                alt="weather-icon"
                                                                                style={{ margin: '0 auto', width: '60px' }}
                                                                            />
                                                                        </figure>
                                                                    )}
                                                                <p>
                                                                    <strong>Humidity:</strong>{' '}
                                                                    {day.day.avghumidity}
                                                                    <br />
                                                                    <strong>Temperature:</strong>{' '}
                                                                    {day.day.avgtemp_c}
                                                                    <br />
                                                                    <strong>Visibility:</strong>{' '}
                                                                    {day.day.avgvis_km}
                                                                    <br />
                                                                    <strong>Chance of Rain:</strong>{' '}
                                                                    {day.day.daily_chance_of_rain}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {isLoading ? (
                            <p>Loading chart...</p>
                        ) : (
                            <ReactApexChart
                                options={weeklyChartData.options}
                                series={weeklyChartData.series}
                                type="area"
                                height={430}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForecastClimate;
