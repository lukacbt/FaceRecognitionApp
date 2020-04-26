import React, { Component } from "react"
import "./FaceRecognition.css"

class FaceRecognition extends Component {

  displayText = () => {
    if(this.props.boxes.length === 1){
      return <p style={this.props.imageURL && !this.props.error.length ? {display: "block"}: {display: "none"}}>There is {this.props.boxes.length} face in the picture!</p>
    }else if (this.props.boxes.length > 1) {
      return <p style={this.props.imageURL && !this.props.error.length ? {display: "block"}: {display: "none"}}>There are {this.props.boxes.length} faces in the picture!</p>
    }else {
      return <p style={this.props.imageURL && !this.props.error.length ? {display: "block"}: {display: "none"}}>There are NO faces in the picture!</p>
    }
  }

  displayBoxes = () => {
    if(this.props.boxes.length > 0) {
      return  this.props.boxes.map((box, i) => {
        return <div key={i} className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      })
    }
  }

  render() {
    const { imageURL, removeImageURL } = this.props
    return (
      <div>
        <div className="center ma">
          {this.displayText()}
          <div className="absolute img-container">
            <button onClick={removeImageURL} style={imageURL ? {display: "block"}: {display: "none"}} className="close-img">✖</button>
            <img id="inputImage" src={imageURL} alt="Not Recognized" width="500px" height="auto" style={imageURL === "" ? {display: "none"} : {display: "block"}} />  
            {this.displayBoxes()}
          </div>
        </div>
      </div>
    )
  }
}

export default FaceRecognition