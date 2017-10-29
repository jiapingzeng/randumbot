import bodyParser from 'body-parser'
import express from 'express'
import favicon from 'serve-favicon'
import path from 'path'

import ThreadSetup from './helpers/thread-setup'

import index from './routes/index'
import webhook from './routes/webhook'

export const app = express()
const demo = process.env.DEMO || false
if (demo) {
    console.log('====> RUNNING IN DEMO MODE')
}

app.set('view engine', 'ejs')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/webhook', webhook)

ThreadSetup.domainWhitelisting()
ThreadSetup.getStartedButton()

export default app