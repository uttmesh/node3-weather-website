const request = require('request')

const geocode = (address, callback)  => {
    const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGFyYW14eXoiLCJhIjoiY2s3NTUxNzZlMGt2YTNpcG82dXpsODZodSJ9.kKyTcutn4wL6zx6ixpSjmw'
    request({url: urlMap, json: true}, (error,{body}) => {
        const {error:errrorResponse, features} = body
        
        if(error){
            callback('Unable to reach site location!', undefined)
        } else if(errrorResponse|| features === undefined || features.length === 0){
            callback('Unable to find Address location',undefined)
           
        } else {
            callback(undefined,{
                latitude:features[0].center[1],
                longitude:features[0].center[0], 
                location:features[0].place_name
            })
        }
    })
}

module.exports = geocode