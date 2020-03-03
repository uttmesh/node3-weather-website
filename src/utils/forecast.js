const request = require('request')

const forecast = (lat, long, callback)  => {
    const urlForcast = 'https://api.darksky.net/forecast/166c289178c8de5ba155c4c2e0ef01fe/'+encodeURIComponent(lat)+','+encodeURIComponent(long)
    request({url: urlForcast, json: true}, (error,{body}) => {
        const {currently,error: errorResponse,daily} = body
        const {summary,temperature,precipProbability} = currently

        if(error){
            callback('Unable to reach site location!', undefined)
        } else if(errorResponse){
            callback('Unable to find location for weather',undefined)
           
        } else {
            callback(undefined,{
                forecast: summary+ '. It is currently '+temperature+' degrees outside. There is '+
                precipProbability+'% chance of rain. High today is ' + daily.data[0].temperatureHigh + 
                ' and low today is '+ daily.data[0].temperatureLow
            })
        }
    })
}

module.exports = forecast