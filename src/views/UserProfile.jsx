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
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import axios from 'axios'


import {
  ageLegendPie,
  genderLegendPie,
  emotionLegendPie,
  beardLegendPie
} from "variables/Variables.jsx";

import ChartistGraph from "react-chartist";

import avatar from "assets/img/faces/face-3.jpg";

import '../assets/css/colors.css'

class UserProfile extends Component {

  state = {
    ageDataPie : {
      labels: ["10%", "10%","10%","10%","10%","10%","10%","10%"],
      series: [10,10,10,20,20,10,10,10]
    },
    genderDataPie : {
      labels: ["60%", "40%"],
      series: [66.3,33.3]
    },
    emotionDataPie : {
      labels: ["10%", "10%","10%","20%","20%","20%","10%"],
      series: [10,10,10,20,20,20,10]
    },
    beardDataPie : {
      labels: ["70%", "30%"],
      series: [70,30]
    }
  }

  createLegend(json){
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
    var type = "badge badge--"+json["types"][i]+" badge--small"
    legend.push(<span class={type}>{json["names"][i]}</span>);
      legend.push(" ");
    }
    return legend;
  }

  testAPI() {
    axios.get('http://192.168.0.41:8080/getGender')
      .then(response =>{
        console.log(response.data[0].Male.nrOfMales)
      })
    }

  componentDidMount(){
   this.testAPI()
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
          <Col md={6}>
              <Card
                statsIcon="fa fa-refresh"
                title="Gender Statistics"
                category="Last Campaign Performance"
                stats="Updated now"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.state.genderDataPie}  type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(genderLegendPie)}</div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                statsIcon="fa fa-refresh"
                title="Age Statistics"
                category="Last Campaign Performance"
                stats="Updated now"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.state.ageDataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(ageLegendPie)}</div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                statsIcon="fa fa-refresh"
                title="Emotions Statistics"
                category="Last Campaign Performance"
                stats="Updated now"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.state.emotionDataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(emotionLegendPie)}</div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                statsIcon="fa fa-refresh"
                title="Beard Statistics"
                category="Last Campaign Performance"
                stats="Updated now"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.state.beardDataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(beardLegendPie)}</div>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
