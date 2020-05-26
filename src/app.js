const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

// Defines path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Todos'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Oops!!!! Check the URL........'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})