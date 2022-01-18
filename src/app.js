const path = require('path')
const express =require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()

// Define path for engine config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vinhps'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Vinhprs'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        helptext: 'Some text can help u' ,
        title: 'Help page',
        name: 'Vinhprs'
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {location} ={}) => {
        if(error) {
            return res.send({error})
        }
        forecast(req.query.address, (error, foreCastData) => {
            if(error) {
                return res.send(error)
            }
            res.send({

                forecast: foreCastData,
                location,
                address: req.query.address
            }) 
            
        })
    })

    // res.send({
    //     location: 'dongthap',
    //     forecast: 'rain',
    //     address: req.query.address
    // })
})

app.get('/products' ,(req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('help/*' ,(req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Vinhprs',
        errorMsg: 'Help article not found'
    })
})

app.get('*' , (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vinhprs',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})