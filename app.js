import bodyParser from 'body-parser'
import express from 'express'
import favicon from 'serve-favicon'
import path from 'path'

import ThreadSetup from './helpers/thread-setup'

export const app = express()
const demo = process.env.DEMO || false;
if (demo) { console.log('====> RUNNING IN DEMO MODE'); }

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('index', {demo: demo})
})

ThreadSetup.domainWhitelisting()
ThreadSetup.getStartedButton()

export default app