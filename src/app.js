const express = require('express')
const path = require('path')
const hbs = require('hbs')

// Connect to Database
require('./db/mongoose')

// Goto Routers
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

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
app.use(express.json())
app.use(TaskRouter)


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

app.listen(port, () => {
    console.log('Server running on port ' + port)
})