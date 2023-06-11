const getCurrentWeather = async (req, res) => {
    try {
        const response = await fetch('http://api.weatherapi.com/v1/current.json?key=ed6616bf3b1d4d57b7a114539232405&q=cameron highlands&aqi=yes', {
            credentials: 'include',
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const getForecastWeather = async (req, res) => {
    try {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=ed6616bf3b1d4d57b7a114539232405&q=Cameron%20Highlands&days=7&aqi=yes&alerts=yes', {
            credentials: 'include',
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


const getHistoryWeather = async (req, res) => {
    try {
        const today = new Date(); // Get the current date
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Subtract 1 day

        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(yesterday.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        const apiUrl = `http://api.weatherapi.com/v1/history.json?key=ed6616bf3b1d4d57b7a114539232405&q=Cameron Highlands&dt=${formattedDate}`;
        const response = await fetch(apiUrl, {
            credentials: 'include',
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
    getCurrentWeather,
    getForecastWeather,
    getHistoryWeather,
};