import React, {useEffect, useState} from 'react';
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const DailyForecast = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [forecastWeatherData, setForecastWeatherData] = useState();

    const [dailyChartData, setDailyChartData] = useState({
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

            const weeklyForecastData = response.forecast.forecastday.slice(0, 3);
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


    return (
        <div>
            <h1 className="title">Daily Forecast Climate</h1>
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
                    options={dailyChartData.options}
                    series={dailyChartData.series}
                    type="area"
                    height={430}
                />
            )}
        </div>
    );
};

export default DailyForecast;