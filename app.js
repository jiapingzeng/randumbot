import bodyParser from 'body-parser'
import express from 'express'
import favicon from 'serve-favicon'
import path from 'path'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('index', {demo: true})
})

export default app