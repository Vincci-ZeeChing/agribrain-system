const getSensorData = async (req, res) => {
    try {
        const response = await fetch('https://api.thingspeak.com/channels/2213931/feeds.json?api_key=X5YPI2NBXZN42YBK&results=100', {
            credentials: 'include',
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


module.exports = {
    getSensorData,
}