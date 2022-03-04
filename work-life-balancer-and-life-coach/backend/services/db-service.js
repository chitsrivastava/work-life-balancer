const dotenv = require('dotenv')
const mongoose = require("mongoose");
const User = require('../notification-db/models/user');
const Notification = require('../notification-db/models/notification');
const moment = require('moment');
const webpush = require('web-push')
const quotes = require('../quotes.json');

const insertUserDetails = async (subscription, userDetails) => {
    try {
        let user = new User();
        user.subscription = subscription;
        user.name = userDetails.name;
        user.email = userDetails.email;
        user.logoffTime = userDetails.logoffTime;
        user.loginTime = userDetails.loginTime;
        user.lunchTime = userDetails.lunchTime;
        user.maxWorkPeriodInHours = userDetails.maxWorkPeriodInHours;

        computeNotificationsToBeSent(userDetails);
        const insertUserResponse = await user.save();
        return insertUserResponse;
    } catch (e) {
        console.log(e);
        return 'Error';
    }
}

const computeNotificationsToBeSent = async (userDetails) => {

    try {
        const reminderForLogOffTime = moment(userDetails.logoffTime, 'HH:mm a').subtract(10, "minutes").toString();
        const reminderForLunchTime = moment(userDetails.lunchTime, 'HH:mm a').subtract(10, "minutes").toString();
        const notifyTime = userDetails.maxWorkPeriodInHours;
        const loginTime = moment(userDetails.loginTime, 'HH:mm a');
        const logoffTime = moment(userDetails.logoffTime, 'HH:mm a');

        let time = loginTime.add(notifyTime, "hours");
        let sitStraightNotifications = [];
        while (time.isBefore(logoffTime)) {
            const randomMotivationalMessage = quotes[Math.floor(Math.random() * 10 + 1)]
            const timeString = time.toString();
            const notification = new Notification({
                email: userDetails.email,
                message: {
                    title: `Hi ${userDetails.name} !!`,
                    body: randomMotivationalMessage
                },
                deliveryTime: timeString.substring(4, timeString.length - 12)
            });
            sitStraightNotifications.push(notification);
            time = time.add(notifyTime, "hours")
        }

        await Promise.all(sitStraightNotifications.map(async notification_element => {
            const rep = await notification_element.save();
        }))

        const logOffNotification = new Notification(
            {
                email: userDetails.email,
                message: {
                    title: `Hi ${userDetails.name} !!`,
                    body: `I hope it was a productive day for you, its time for you to log off in 10 minutes`
                },
                deliveryTime: reminderForLogOffTime.substring(4, reminderForLogOffTime.length - 12)
            });

        const lunchNotification = new Notification(
            {
                email: userDetails.email,
                message: {
                    title: `Hi ${userDetails.name} !!`,
                    body: `Its time for you to take your Lunch break in 10 minutes`
                },
                deliveryTime: reminderForLunchTime.substring(4, reminderForLunchTime.length - 12)
            });

        const logOffInsertResponse = await logOffNotification.save();
        const lunchInsertResponse = await lunchNotification.save();

        const insertResponse = { "logOffInsertResponse": logOffInsertResponse, "lunchInsertResponse": lunchInsertResponse };
        return insertResponse;
    } catch (e) {
        console.log(e);
        return 'Error';
    }
}

const findUserByEmail = async (email) => {
    let subscription;
    try {
        const data = await User.find({ email: email }).exec();
        subscription = data;

    } catch (e) {
        console.log('error in findDestinationByEmail ==> ', error)
    }
    return subscription;
}

const findNotificationsByTime = async (time) => {
    let notifications;
    try {
        const data = await Notification.find({ deliveryTime: time }).exec();
        notifications = data;
    } catch (e) {
        console.log('error in findNotificationsByTime ==> ', error)
    }
    return notifications;
}

const pushNotification = async () => {
    webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

    const currentTime = moment(new Date()).toString();
    const timeToMatchInDB = currentTime.substring(4, currentTime.length - 12)

    const notifications = await findNotificationsByTime(timeToMatchInDB);
    await Promise.all(notifications.map(async element => {
        const recepientEmail = element.email;
        const message = element.message;
        const user = await findUserByEmail(recepientEmail);
        const deliveryAddress = user[0].subscription;
        const payload = message.body

        webpush.sendNotification(deliveryAddress, payload)
            .then(result => {
            })
            .catch(e => console.log('\n\nerror ==>', e.stack))

    }))
}

module.exports = {
    insertUserDetails,
    computeNotificationsToBeSent,
    findUserByEmail,
    findNotificationsByTime,
    pushNotification
}