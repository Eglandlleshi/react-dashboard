/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import axios from 'axios'
import NotificationSystem from "react-notification-system";
import AdminNavbar from "components/Navbars/AdminNavbar";
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import Webcam from 'react-webcam';
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { style } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  iconsPNG
} from "variables/Variables.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      serverStatus: null,
      genderStr: null,
      ageStr: null,
      emotionStr: null,
      beardStr: null,
      buttonColor : "",
      buttonText : "Scanning not available",
      buttonState : "false"
    };
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }


  componentDidMount(){
    this.testAPI()
  }

  
  showNotification(text,color){
    let icon
    if(color==="info")
      icon="pe-7s-check"
    else
      icon="pe-7s-close-circle"
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;

    _notificationSystem.addNotification({
      title: <span data-notify="icon" className={icon} />,
      message: (
        <div>
          {text}
        </div>
      ),
      level: color,
      position: "tr",
      autoDismiss: 2
     })
  }
/*http://23.96.37.119:8080/getAllPersons */
  testAPI() {
    axios.get('http://localhost:4000/test')
      .then(response =>{
        console.log(response)
        this.showNotification("Server ON","info")
        this.setState({
          serverStatus: "ON",
          genderStr: null,
          ageStr: null,
          emotionStr: null,
          beardStr: null,
          buttonColor : "info",
          buttonText : "Scan",
          buttonState : false
        })
      })
      .catch(error=>{
        if (error.response) {
          this.showNotification("Server OFF","error")
          this.setState({
            serverStatus: "OFF",
            genderStr: null,
            ageStr: null,
            emotionStr: null,
            beardStr: null,
            buttonColor : null,
            buttonText : "Scanning not available",
            buttonState : true
          })
      } else if (error.request) {
        this.showNotification("Server OFF","error")
        this.setState({
          serverStatus: "OFF",
          genderStr: null,
          ageStr: null,
          emotionStr: null,
          beardStr: null,
          buttonColor : null,
          buttonText : "Scanning not available",
          buttonState : true
        })
      } else {
        this.showNotification("Server OFF","error")
        this.setState({
          serverStatus: "OFF",
          genderStr: null,
          ageStr: null,
          emotionStr: null,
          beardStr: null,
          buttonColor : null,
          buttonText : "Scanning not available",
          buttonState : true
        })
      }
      })
  }

  update(){
    console.log("2311321321311")
  }
 
  screenshot() {
    // access the webcam trough this.refs
    var screenshot = this.refs.webcam.getScreenshot()
    console.log(screenshot)
  }

  render() {
    return (
      <div className="content">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Grid fluid>
          <Row>
            <Col md={6}>
            <Webcam width="500" audio ={false} ref='webcam'/>
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                id="a"
                bigIcon= {<i className="gender-icon" />}
                statsText={<p className="text-primary">Gender</p>}
                statsValue={this.state.name}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="age-icon" />}
                statsText={<p className="text-success">Age</p>}
                statsValue={this.state.name}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="emotion-icon" />}
                statsText={<p className="text-danger">Emotion</p>}
                statsValue={this.state.name}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="beard-icon" />}
                statsText={<p className="text-warning">Beard</p>}
                statsValue={this.state.name}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col md={4} >
            <Button disabled={this.state.buttonState} bsStyle={this.state.buttonColor} pullRight fill type="submit">{this.state.buttonText}</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
