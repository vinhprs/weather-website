const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=07df28a931906b95b86bea2dd97af541&query=' + encodeURIComponent(address) + '&units=m'

    request( {url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the Weather API service', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, 
               `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. \nThere is 
                ${body.current.wind_degree} wind degree  
                Humidity: ${body.current.humidity}  
                Observation_time: ${body.current.observation_time} 
                Cloudcover: ${body.current.cloudcover} 
                Is day: ${body.current.is_day}`
            )
        }
    })
}
module.exports = forecast