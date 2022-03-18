import logo from '../../assets/images/image.jpg'
import React, { useEffect, useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Stack from '@mui/material/Stack';
import { subscribeUser } from '../../subscription';
import './Dashboard.css'
import { TextField, Card, CardHeader, CardContent, CardMedia, Grid, Button } from '@mui/material'
import { Timeline, TimelineConnector, TimelineOppositeContent, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
const moment = require('moment');
const Dashboard = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loginTime, setLoginTime] = useState(moment(new Date()));
  const [lunchTime, setLunchTime] = useState((moment(new Date()).add(4, "hours")));
  const [logoffTime, setLogoffTime] = useState((moment(new Date()).add(9, "hours")));
  const [notifyInHours, setNotifyInHours] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleLoginTimeChange = (event) => {
    setLoginTime(event.target.value)
  }

  const handleLogoffTimeChange = (event) => {
    setLogoffTime(event.target.value)
  }

  const handleLunchTimeChange = (event) => {
    setLunchTime(event.target.value)
  }

  const handleNotifyInHoursChange = (event) => {
    setNotifyInHours(event.target.value)
  }
  const handleFormSubmit = (event) => {
    console.log("Inside submit handler");
    event.preventDefault();
    const userDetails = {
      name: name,
      email: email,
      loginTime: moment(loginTime).utcOffset("+05:30").format(),
      logoffTime: moment(logoffTime).utcOffset("+05:30").format(),
      lunchTime: moment(lunchTime).utcOffset("+05:30").format(),
      maxWorkPeriodInHours: notifyInHours
    }
    subscribeUser(userDetails);
    setIsSubmitted(true);
  }

  const newSubmittedView =
    <div>
      <form onSubmit={handleFormSubmit}>
        <Card variant="outlined" id="parent-card">
          <CardHeader id="parent-title" title="Welcome to Work-Life-Balancer" />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs="4">
                <Card variant="outlined" id="form-card">
                  {!isSubmitted && <CardContent>
                    <CardHeader id="form-title" title="Please enter your details" />
                    <Stack spacing={3}>
                      <TextField
                        className="inputField"
                        id="name"
                        label="Name"
                        variant="outlined"
                        onChange={handleNameChange} />
                      <TextField
                        className="inputField"
                        id="email"
                        label="Email"
                        variant="outlined"
                        onChange={handleEmailChange} />
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid container spacing={1}>
                          <Grid id="time-box" item xs="6">
                            <MobileDateTimePicker
                              className="inputField"
                              value={loginTime}
                              label="Login Time"
                              onChange={(newValue) => {
                                setLoginTime(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Grid>
                          <Grid item xs="6">
                            <MobileDateTimePicker
                              className="inputField"
                              value={lunchTime}
                              label="Lunch Time"
                              onChange={(newValue) => {
                                setLunchTime(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                            />

                          </Grid>
                        </Grid>
                        <MobileDateTimePicker
                          className="inputField"
                          value={logoffTime}
                          label="LogOff Time"
                          onChange={(newValue) => {
                            setLogoffTime(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <Grid container spacing={1}>
                          <Grid id="time-box" item xs="5">
                            <TextField
                              className="inputField"
                              id="breakInterval"
                              type="number"
                              label="Work Interval"
                              variant="outlined"
                              onChange={handleNotifyInHoursChange} />  </Grid>
                          <Grid item xs="7">
                            <small>Time interval (in hours) after which you want to consider for a break.</small>
                          </Grid>
                        </Grid>
                      </LocalizationProvider>
                      <Button onClick={handleFormSubmit} variant="contained">Submit</Button>
                    </Stack>
                  </CardContent>}
                  {isSubmitted && <CardContent>
                    <div>
                      <p>
                        Greetings {name} !!
                      </p>
                      <p>Thanks for sharing your work timings with us, we'll make sure to remind you for breaks after regular interval as per your inputs.</p>
                      <p>We'll remind you for short walks as, research shows that a brief walk, especially one outdoors lowers levels of the stress hormone cortisol</p>
                      <p>We want to make sure you take your lunch on time, and wrap up stuff accordingly so we will remind you for lunch prior to 10 minutes of your lunch time</p>
                      <p>We know you are a hard working passionate person, but thers a time to call it a day, and we encourage you to wrap  your day at the rigth time, to make sure we remind you 10 minutes before your log off time.</p>
                    </div>
                  </CardContent>}
                </Card>
              </Grid>
              <Grid item xs="3">
                <React.Fragment>
                  <Timeline position="alternate">
                    <TimelineItem>
                      <TimelineOppositeContent color="text.secondary">
                        {moment(loginTime).format('HH:mm a')}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>Login</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineOppositeContent color="text.secondary">
                        {moment(lunchTime).format('HH:mm a')}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>Lunch</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineOppositeContent color="text.secondary">
                        {moment(logoffTime).format('HH:mm a')}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>LogOff</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineOppositeContent color="text.secondary">

                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                      </TimelineSeparator>
                      <TimelineContent>Enjoy</TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </React.Fragment>
              </Grid>
              <Grid item xs="5">
                <Card id="image-card">
                  <CardMedia
                    component="img"
                    height="319"
                    image={logo}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <div>
                      <p>One of the best pieces of advice I ever got was from a horse master. He told me to go slow to go fast. I think that applies to everything in life. We live as though there aren't enough hours in the day but if we do each thing calmly and carefully we will get it done quicker and with much less stress.</p>
                      <p>Welcome to our Work Life Balancer and Life Coach application. Our Motive is to help you strike work-life balance in your hectic schedule</p>
                    </div>
                  </CardContent>
                </Card>

              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </div >

  return (
    newSubmittedView
  );
}

export default Dashboard;
