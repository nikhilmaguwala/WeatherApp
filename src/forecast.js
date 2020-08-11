const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0a4892106108ff56962cc4e38fd3341e&query=' + address

    request({ url, json: true }, (error, { body = 0  }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.temperature + ' Degree temperature with ' + body.current.weather_descriptions[0])
        }
    })
}

module.exports = forecast