import React, { Component } from 'react';
import Webcam from 'react-webcam';

class WebCam extends Component{

    constructor(props){
        super(props);
    }
    // this is the area I'm having issues with. Thanks!
     screenshot() {
        // access the webcam trough this.refs
        var screenshot = this.refs.webcam.getScreenshot()
        console.log(screenshot)
      }

    render(){

        return (
            <div>   
             <Webcam audio ={false} ref='webcam'/>
             <button onClick={()=>this.screenshot()}>Capture</button>
            </div>
            )
    }
}

export default WebCam