const cron = require('node-cron');
const {pushNotification} = require('./db-service'); 
const runSchedule = () => {
    cron.schedule('1 * * * * *', () => {
        pushNotification();
    })
}

module.exports = {runSchedule};