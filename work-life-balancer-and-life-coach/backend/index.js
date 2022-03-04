const { runSchedule } = require('./services/scheduler-service');
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/work-life-balancer", { useNewUrlParser: true })

const { insertUserDetails } = require('./services/db-service');

const app = express()

dotenv.config()

app.use(cors())
app.use(bodyParser.json())

app.post('/notifications/subscribe', (req, res) => {
    const subscription = req.body.subscription
    const userDetails = req.body.userDetails;

    insertUserDetails(subscription, userDetails);
    runSchedule();

    res.status(200).json({ 'success': true })
});

app.listen(9000, () => console.log('The server has been started on the port 9000'))
