
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.OPENWEATHER_API_KEY;

module.exports = async function (req, res) {
    if (req.method === 'POST') {
        const { cityName, unit } = req.body;

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`
            );

            const { main, weather, name } = response.data;
            const temperature = main.temp;
            const weatherDes = weather[0].description;
            const icon = weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.status(200).json({
                temperature,
                weatherDes,
                cityName: name,
                imageURL,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Unable to fetch weather data' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
