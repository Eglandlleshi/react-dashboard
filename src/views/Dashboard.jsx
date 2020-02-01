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
      serverStatus: "OFF",
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
    
    this.intervalAPI = setInterval(()=>this.intervalTestAPI(),2000)
  }

  componentWillUnmount(){
    clearInterval(this.intervalAPI)
    clearInterval(this.intervalScan)
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

  errorActions(){
    this.showNotification("Server OFF","error")
    this.updateButtonState("OFF",null,"Scanning not available",true)
    clearInterval(this.intervalScan)
  }
  succesActions(){
    this.showNotification("Server ON","info")
    this.updateButtonState("ON","info","Scan",false)
  }
/*http://23.96.37.119:8080/getAllPersons */
  intervalTestAPI() {
    axios.get('http://52.237.9.215:8000/test')
      .then(response =>{
        if(this.state.serverStatus==="OFF"){
          this.succesActions()
        }
      })
      .catch(error=>{
        if (error.response) {
          if(this.state.serverStatus==="ON"){
            this.errorActions()
          }
      } else if (error.request) {
        if(this.state.serverStatus==="ON"){
          this.errorActions()
        }    
      } else {
        if(this.state.serverStatus==="ON"){
          this.errorActions()
        }
      }
      })
  }
  
  
  updateButtonState(serverStatus,buttonColor,buttonText,buttonState){
    this.setState({
      serverStatus: serverStatus,
      buttonColor : buttonColor,
      buttonText : buttonText,
      buttonState : buttonState
    })
  }
 
  getscreenshot() {
    // access the webcam trough this.refs
    let screenshot = this.refs.webcam.getScreenshot()
    return screenshot;
  }

  updateGenderAge(base64string){
    axios.post('http://52.237.9.215:8000/agegender',{base64string})
      .then(response =>{
        if(response.data==="Face Not Detected"){
          this.setState({
            genderStr: "-",
            ageStr: "-"
          })
        }
        else{
          this.setState({
            genderStr: response.data.gender,
            ageStr: response.data.age
          })
        }
        
        console.log(response)
      })
  }


  updateEmotion(base64string){
    axios.post('http://52.237.9.215:8000/emotions',{base64string})
      .then(response =>{
        if(response.data==="Face Not Detected"){
          this.setState({
            emotionStr: "-"
          })
        }
        else{
          this.setState({
            emotionStr: response.data.emotion
          })
        }
        console.log(response)
      })
  }

  updateBeard(base64string){
    axios.post('http://52.237.9.215:8000/beard',{base64string})
      .then(response =>{
        if(response.data==="Face Not Detected" || response.data.beard==="Not Detected"){
          this.setState({
            beardStr: "-"
          })
        }
        else{
          this.setState({
            beardStr: response.data.beard
          })
        }
        console.log(response)
      })
  }

  scan(){
   let base64string = this.getscreenshot()
   this.updateGenderAge(base64string)
   this.updateEmotion(base64string)
   this.updateBeard(base64string)
  }

  start_stopScan(){
    if(this.state.buttonText==="Scan"){
    this.scan()
    this.intervalScan = setInterval(()=>this.scan(),1500)
    this.setState({
      buttonColor: "danger",
      buttonText:"Stop"
    })
    }

    if(this.state.buttonText==="Stop"){
      clearInterval(this.intervalScan)
      this.setState({
        buttonColor: "info",
        buttonText:"Scan",
      })
      setTimeout(()=>{
        this.setState({
          genderStr: null,
          ageStr: null,
          emotionStr: null,
          beardStr: null,
        })
    }, 1500);
      }
  }

  render() {
    return (
      <div className="content">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Grid fluid>
          <Row>
            <Col md={6}>
            <Webcam width="100%" audio ={false} ref='webcam'/>
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                id="a"
                bigIcon= {<i className="gender-icon" />}
                statsText={<p className="text-primary">Gender</p>}
                statsValue={this.state.genderStr}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="age-icon" />}
                statsText={<p className="text-success">Age</p>}
                statsValue={this.state.ageStr}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="emotion-icon" />}
                statsText={<p className="text-danger">Emotion</p>}
                statsValue={this.state.emotionStr}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="beard-icon" />}
                statsText={<p className="text-warning">Beard</p>}
                statsValue={this.state.beardStr}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col md={3} >
            <Button onClick={()=>this.start_stopScan()} disabled={this.state.buttonState} bsStyle={this.state.buttonColor} pullRight fill >{this.state.buttonText}</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
