import React from "react"
import "./imagelinkform.css"

const ImageLinkForm = ({ onInputChange, onDetect, input, error }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain wil detect faces in your pictures. Give it a try!"}  
      </p>    
        <div className="form center pa4 br3 shadow-5">
          <input onChange={onInputChange} value={input} className="f4 pa2 w-70 center" type="text" />
          <button onClick={onDetect} className="w-30 f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>
        <p style={{ color: "red", fontWeight: "bold" }}>{error.length ? error : ""}</p>
    </div>
  )
}

export default ImageLinkForm