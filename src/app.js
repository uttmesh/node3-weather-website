const path = require('path')
const hbs = require('hbs')
const express = require('express')

const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

//Define path for express
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup views and handlebars
app.set('view engine','hbs')
app.set('views',viewsPath)
//Settign up partials locaiton in hbs.
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicPath))

// Request router
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Uttmesh Chauhan',
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Weather App',
        name: 'Uttmesh Chauhan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Instructions',
        instructions: 'Enter a valid location name and click enter to see weather forecast',
        name: 'Uttmesh Chauhan'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide a valid address to see weather forecast'
        })
    }

    // Fetching weather forecast
    geocode(req.query.address, (error, geoData) => {
        if(error){
            return res.send({error})
        }

        forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location: geoData.location,
                forecast: forecastData.forecast,
                address: req.query.address
            })
        })
    })



})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 'Help Article Not Found',
        error: 'Requested Help Article not found',
        name: 'Uttmesh Chauhan'
    })   
})

app.get('*',(req,res) => {
    res.render('404',{
        title: 'Page Not Found',
        error: 'Requested location not found',
        name: 'Uttmesh Chauhan'
    })   
})

app.listen(3000,()=>{
    console.log('Express server started on port 3000')
})