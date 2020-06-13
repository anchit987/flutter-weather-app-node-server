const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=2724f5f33376c469ba162597c41562cd'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect weather service', undefined)
        } else if (body.cod >= 400) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, { main: body.main, description: body.weather[0].description })
        }
    })
}

module.exports = forecast