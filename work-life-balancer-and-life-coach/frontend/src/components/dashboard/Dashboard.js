import React, { useState } from "react";
import { subscribeUser } from '../../subscription';
import './Dashboard.css'
const Dashboard = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loginTime, setLoginTime] = useState('');
  const [logoffTime, setLogoffTime] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [notifyInHours, setNotifyInHours] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(true);

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
    event.preventDefault();
    const userDetails = {
      name: name,
      email: email,
      loginTime: loginTime,
      logoffTime: logoffTime,
      lunchTime: lunchTime,
      maxWorkPeriodInHours: notifyInHours
    }
    subscribeUser(userDetails);
    setIsSubmitted(true);
  }

  const submittedView = <div className="main-div">
    <form onSubmit={handleFormSubmit}>
      <table>
        <thead>
          <tr styles="display:flex;justify-content:center">
            <th className="title">Work-Life-Balancer</th>
          </tr>
        </thead>
        <tbody>
          <tr><td></td></tr>
          <tr>
            <td>
              <label>Name</label>
            </td>
            <td>
              <input type="text" onChange={handleNameChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Email</label>
            </td>
            <td>
              <input type="text" onChange={handleEmailChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Login Time</label>
            </td>
            <td>
              <input type="time" onChange={handleLoginTimeChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Logoff Time</label>
            </td>
            <td>
              <input type="time" onChange={handleLogoffTimeChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Lunch Time</label>
            </td>
            <td>
              <input type="time" onChange={handleLunchTimeChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Notify me in </label>
            </td>
            <td>
              <input type="number" onChange={handleNotifyInHoursChange} />
            </td>
          </tr>
          <tr>
            <td>
              <label></label>
            </td>
            <td>
              <button>Submit</button>            </td>
          </tr>
        </tbody>
      </table>
    </form></div>

  const formView =
    <div className="afterSubmittionView">
      <h3>Welcome to Work-Life-Balancer and Life-Coach</h3>
      <p>Thanks for sharing your working hours.</p><p>We help you to keep motivated and make sure you are reminded of mainting a healthy work life balance</p></div>

  return (
    !isSubmitted ? submittedView : formView
  );
}

export default Dashboard;
