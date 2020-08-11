const express = require('express')
const path = require('path')
const { request, response } = require('express')
const hbs = require('hbs')
const forecast = require('./forecast')
const app = express()
const port = process.env.PORT || 3000

//Define Path
const publicDirPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')


//Handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
    name:'Nikhil Maguwala'})
})



app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'Nikhil Maguwala'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        helpText:'This is some help text',
        name:'Nikhil Maguwala'
    })
})



app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide us location as search term'
        })
    }
    
    forecast(req.query.address, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast: forecastData,
            address: req.query.address
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('error404',{
        title:'Error-Help',
        notice:'Article Not Found',
        name:'Nikhil Maguwala'
    })
})

app.get('*',(req,res) => {
    res.render('error404',{
        title:'Error 404',
        notice:'This Page is not supported by us..!',
        name:'Nikhil Maguwala'
    })
})

app.listen(port,() => {
    console.log('Server is running on ' + port);
})