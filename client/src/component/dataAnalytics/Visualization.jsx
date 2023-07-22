import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const Visualization = () => {
    const [realTimeSensor, setRealTimeSensor] = useState({});
    const [weatherData, setWeatherData] = useState();
	const [currentDateTime, setCurrentDateTime] = useState(new Date());
	const [lastUpdated, setLastUpdated] = useState();
    const [forecastWeatherData, setForecastWeatherData] = useState();
    const [crops, setCrops] = useState([]); // State to hold the fetched crops
    const [cropManagement, setCropManagement] = useState([]);
    const [totalHarvest, setTotalHarvest] = useState({});
    const [dailyHarvestData, setDailyHarvestData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    },[])

    const formattedDateTime = currentDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + " "
        + currentDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

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
                const last = lastRecord.createdAt;

                // Reformat the createdAt value to date and time in 'en-US' format
                const createdAtDate = new Date(last);
                const formattedLastUpdated = createdAtDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }) + ' ' + createdAtDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                });
                setRealTimeSensor({ temperature, humidity, moisture });
                setLastUpdated(formattedLastUpdated);
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
                        show: false,
                    },
                    value: {
                        show: false,
                    },
                },
            },
        },
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


    const getCrops = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/crop');
            const activeCrops = response.data.filter(crop => crop.crop_active === true);
            setCrops(activeCrops);
        } catch (error) {
            console.log(error);
        }
    };

    const getCropsManagement = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/cropManagement");
            setCropManagement(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getWeatherData();
        getForecastWeather();
        getCrops();
        getCropsManagement();
    }, []);


    useEffect(() => {
        if (cropManagement.length > 0) {
            const currentMonth = currentDateTime.getMonth(); // Get the current month (0-indexed)
            const totalHarvestThisMonth = cropManagement.reduce((acc, crop) => {
                const cropDate = new Date(crop.c_management_date);
                const cropMonth = cropDate.getMonth();
                if (cropMonth === currentMonth) {
                    const cropName = crop.CROP_T.crop_name;
                    acc[cropName] = (acc[cropName] || 0) + crop.c_management_harvest;
                }
                return acc;
            }, {});

            setTotalHarvest(totalHarvestThisMonth);
        }
    }, [cropManagement, currentDateTime]);

    useEffect(() => {
        if (cropManagement.length > 0) {
            // Grouping cropManagement data by date
            const groupedData = cropManagement.reduce((acc, crop) => {
                const cropDate = new Date(crop.c_management_date);
                const cropDateStr = cropDate.toISOString().split('T')[0];
                if (acc[cropDateStr]) {
                    acc[cropDateStr] += crop.c_management_harvest;
                } else {
                    acc[cropDateStr] = crop.c_management_harvest;
                }
                return acc;
            }, {});

            // Converting grouped data to an array of objects for ApexCharts
            const dataArray = Object.entries(groupedData).map(([date, harvest]) => ({
                x: new Date(date).getTime(),
                y: harvest,
            }));

            // Sorting the data by date (in case it's not already sorted)
            dataArray.sort((a, b) => a.x - b.x);

            setDailyHarvestData(dataArray);
        }
    }, [cropManagement]);

    const lastFiveDaysData = dailyHarvestData.slice(-5);
    const areaChartSeries = [
        {
            name: 'Harvest',
            data: lastFiveDaysData,
        },
    ];

    const areaChartOptions = {
        chart: {
            id: 'area-chart',
            toolbar: {
                show: false,
            },
        },
        colors: ['#71AF9D'],
        xaxis: {
            type: 'datetime',
            labels: {
                // Show only the last five x-axis labels
                show: lastFiveDaysData.length <= 5,
                formatter: (value, timestamp) => {
                    const date = new Date(timestamp);
                    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
                },
            },
        },
        yaxis: {
            title: {
                text: 'Total Harvest',
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy',
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
            },
        },
    };

    return (
        <div>
            <h1 className="title">Visualization</h1>

            <div>
                <h1 style={{fontSize:"25px", marginBottom:"1vh"}}>{formattedDateTime}</h1>
            </div>
            <div className="columns is-multiline">
                <div className="column is-5">
                    <div className="card">
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Sensor Data</p>
                        </header>
                        <div className="card-content">
                            <ReactApexChart options={combinedGaugeOptions} series={combinedGaugeSeries} type="radialBar" height={350} />
                            <div>Last Updated: {lastUpdated}</div>
                        </div>
                    </div>
                </div>

                <div className="column is-3">
                    <div className="card">
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Crop in the Farm</p>
                        </header>
                        <div className="card-content has-text-centered">
                            {crops.length > 0 ? (
                                crops.map((crop) => (
                                    <div key={crop._id} style={{ marginBottom: '1rem' }}>
                                        <h3 className="title is-5">{crop.crop_name}</h3>
                                    </div>
                                ))
                            ) : (
                                <p>No crops active in the farm.</p>
                            )}
                        </div>
                    </div>
                    <div className="card mt-5">
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Total Harvest this Month</p>
                        </header>
                        <div className="card-content has-text-centered">
                            <div className="card-content has-text-centered">
                                {Object.keys(totalHarvest).length > 0 ? (
                                    Object.entries(totalHarvest).map(([cropName, harvest]) => (
                                        <div key={cropName} style={{ marginBottom: '1rem' }}>
                                            <h3 className="title is-5">{cropName}: {harvest} KG</h3>
                                        </div>
                                    ))
                                ) : (
                                    <p>No harvest data available for this month.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="column is-4 ">
                    <div className="card" style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Total Harvest by Daily</p>
                        </header>
                        <div className="card-content">
                            <ReactApexChart options={areaChartOptions} series={areaChartSeries} type="area" height={350} />
                        </div>
                    </div>
                </div>

                <div className="column is-12">
                    <div className="card" style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <header className="card-header" style={{ boxShadow: 'none', backgroundColor: '#E1F6F0' }}>
                            <p className="card-header-title is-centered">Climate Condition</p>
                        </header>
                        {weatherData && forecastWeatherData && forecastWeatherData.forecast ? (
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '2rem', textAlign: 'center' }}>
                                {/* Day 1 */}
                                <div>
                                    <div style={{fontSize:"18px"}}>
                                        {forecastWeatherData.forecast.forecastday[0].date}
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                        {weatherData.current.temp_c}°C
                                    </div>
                                    <div>
                                        <img
                                            style={{ height: '80px', width: '80px' }}
                                            src={weatherData.current.condition.icon}
                                            alt="weather-icon"
                                        />
                                    </div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {weatherData.current.condition.text}
                                    </div>
                                </div>

                                {/* Day 2 */}
                                <div>
                                    <div style={{fontSize:"18px"}}>
                                        {forecastWeatherData.forecast.forecastday[1].date}
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                        {forecastWeatherData.forecast.forecastday[1].day.avgtemp_c}°C
                                    </div>
                                    <div>
                                        <img
                                            style={{ height: '80px', width: '80px' }}
                                            src={forecastWeatherData.forecast.forecastday[1].day.condition.icon}
                                            alt="weather-icon"
                                        />
                                    </div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {forecastWeatherData.forecast.forecastday[1].day.condition.text}
                                    </div>
                                </div>

                                {/* Day 3 */}
                                <div>
                                    <div style={{fontSize:"18px"}}>
                                        {forecastWeatherData.forecast.forecastday[2].date}
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                        {forecastWeatherData.forecast.forecastday[2].day.avgtemp_c}°C
                                    </div>
                                    <div>
                                        <img
                                            style={{ height: '80px', width: '80px' }}
                                            src={forecastWeatherData.forecast.forecastday[2].day.condition.icon}
                                            alt="weather-icon"
                                        />
                                    </div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {forecastWeatherData.forecast.forecastday[2].day.condition.text}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>Loading weather data...</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Visualization;
