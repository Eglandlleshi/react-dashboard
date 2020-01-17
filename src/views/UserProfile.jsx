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
  Col
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
/*
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
*/
class UserProfile extends Component {

  state = {
    ageDataPie : {
      labels: [],
      series: []
    },
    genderDataPie : {
      labels: [],
      series: []
    },
    emotionDataPie : {
      labels: [],
      series: []
    },
    beardDataPie : {
      labels: [],
      series: []
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
  //this.testAPI()
  this.updateAge()
  this.updateBeard()
  this.updateEmotion()
  this.updateGender()
  }


 
  updateAge = ()=>{
    axios.get('http://40.89.164.225:8080/getAge')
    .then(response =>{
      let data = {
        labels: [],
        series: []
      }
      if(response.data[0]['0-2']['%Of0-2']==0)
        data.labels.push(null)
      else
        data.labels.push(response.data[0]['0-2']['%Of0-2'].toFixed(1)+"%")
      data.series.push(response.data[0]['0-2']['%Of0-2'])


      if(response.data[1]['4-6']['%Of4-6']==0)
        data.labels.push("")
      else
        data.labels.push(response.data[1]['4-6']['%Of4-6'].toFixed(1)+"%")
      data.series.push(response.data[1]['4-6']['%Of4-6'])

      if(response.data[2]['8-12']['%Of0-2']==0)
        data.labels.push("")
      else
        data.labels.push(response.data[2]['8-12']['%Of0-2'].toFixed(1)+"%")
      data.series.push(response.data[2]['8-12']['%Of0-2'])

      if(response.data[3]['15-20']['%Of15-20']==0)
        data.labels.push("")
      else
        data.labels.push(response.data[3]['15-20']['%Of15-20'].toFixed(1)+"%")
      data.series.push(response.data[3]['15-20']['%Of15-20'])
      if(response.data[4]['25-32']['%Of25-32']==0){
        data.labels.push("")
      }
      else{
        data.labels.push(response.data[4]['25-32']['%Of25-32'].toFixed(1)+"%")
      }
      data.series.push(response.data[4]['25-32']['%Of25-32'])
      if(response.data[5]['38-43']['%Of38-43']==0)
        data.labels.push("")
      else
        data.labels.push(response.data[5]['38-43']['%Of38-43'].toFixed(1)+"%")
      data.series.push(response.data[5]['38-43']['%Of38-43'])
      if(response.data[6]['48-53']['%Of48-53']==0)
        data.labels.push("")
      else
        data.labels.push(response.data[6]['48-53']['%Of48-53'].toFixed(1)+"%")
      data.series.push(response.data[6]['48-53']['%Of48-53'])
      if(response.data[7]['60-100']['%Of60-100']==0)
        data.labels.push("")
      else
        data.labels.push(response.data[7]['60-100']['%Of60-100'].toFixed(1)+"%")
      data.series.push(response.data[7]['60-100']['%Of60-100'])
      console.log(data)
      this.setState({
        ageDataPie : data
      })
      console.log(response)
    })
  }

  updateEmotion = ()=>{
    axios.get('http://40.89.164.225:8080/getEmotion')
    .then(response =>{
      let data = {
        labels: [],
        series: []
      }
      data.labels.push(response.data[0].Angry['%OfAngry'].toFixed(1)+"%")
      data.series.push(response.data[0].Angry['%OfAngry'])
      data.labels.push(response.data[1].Disgust['%OfDisgust'].toFixed(1)+"%")
      data.series.push(response.data[1].Disgust['%OfDisgust'])
      data.labels.push(response.data[2].Scared['%OfScared'].toFixed(1)+"%")
      data.series.push(response.data[2].Scared['%OfScared'])
      data.labels.push(response.data[3].Happy['%OfHappy'].toFixed(1)+"%")
      data.series.push(response.data[3].Happy['%OfHappy'])
      data.labels.push(response.data[4].Sad['%OfSad'].toFixed(1)+"%")
      data.series.push(response.data[4].Sad['%OfSad'])
      data.labels.push(response.data[5].Surprised['%OfSurprised'].toFixed(1)+"%")
      data.series.push(response.data[5].Surprised['%OfSurprised'])
      data.labels.push(response.data[6].Neutral['%OfNeutral'].toFixed(1)+"%")
      data.series.push(response.data[6].Neutral['%OfNeutral'])
      this.setState({
        emotionDataPie : data
      })
      console.log(response)
    })
  }

  updateBeard = ()=>{
    axios.get('http://40.89.164.225:8080/getBeard')
    .then(response =>{
      let data = {
        labels: [],
        series: []
      }
      data.labels.push(response.data[0]['Detected']['%OfDetected'].toFixed(1)+'%')
      data.series.push(response.data[0]['Detected']['%OfDetected'])
      data.labels.push(response.data[1]['Not Detected']['%OfNotDetected'].toFixed(1)+'%')
      data.series.push(response.data[1]['Not Detected']['%OfNotDetected'])
      this.setState({
        beardDataPie : data
      })
      console.log(response)
    })
  }

  updateGender = ()=>{
    axios.get('http://40.89.164.225:8080/getGender')
    .then(response =>{
      let data = {
        labels: [],
        series: []
      }
      data.labels.push(response.data[0]['Male']['%OfMales'].toFixed(1)+'%')
      data.series.push(response.data[0]['Male']['%OfMales'])
      data.labels.push(response.data[1]['Female']['%OfMales'].toFixed(1)+'%')
      data.series.push(response.data[1]['Female']['%OfMales'])
      this.setState({
        genderDataPie : data
      })
      console.log(response)
    })
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
