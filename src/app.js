const express = require('express');

const request = require('request')

const geoCode = require('./utils/geoCode')

const forecast = require('./utils/forecast')

const app = express()

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    geoCode(req.query.address, (error, { longitude, latitude, location }) => {
        if (error) {
            return res.send({
                code: "401",
            })
        } else {
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error,
                        code: "402"
                    })
                } else {
                    return res.send(
                        {
                            "location": location,
                            "temp": forecastData.main.temp.toString(),
                            "temp_max": forecastData.main.temp_max.toString(),
                            "temp_min": forecastData.main.temp_min.toString(),
                            "description": forecastData.description,
                            "humidity": forecastData.main.humidity.toString(),
                            "code": "200",
                        }
                    );
                }
            })
        }
    })
})
app.listen(3000, () => {
    console.log('working')
})