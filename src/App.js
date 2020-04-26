import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import Rank from "./components/Rank/Rank"
import SignIn from "./components/SignIn/SignIn"
import Register from "./components/Register/Register"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import Particles from 'react-particles-js'

const particlesOptions = {
  particles: {
    number: {
      value: 130,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      }
    },
    modes: {
      grab: {
        distance: 200,
        line_linked: {opacity: .6}
      }
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      error: "",
      input: "",
      imageURL: "",
      boxes: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        username: "",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  asGuest = () => {
    this.setState({ route: "guest" })
  }

  removeImageURL = () => {
    this.setState({ imageURL: "" })
  }

  loadUser = data => {
    this.setState( {user: {
      id: data.id,
      username: data.username,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = data => {
    const clarifaiFacesRegions = data.outputs[0].data.regions
    const image = document.getElementById("inputImage")
    const width = Number(image.width)
    const height = Number(image.height)
    // RETURN ARRAY OF OBJECTS
    if(clarifaiFacesRegions) {
      const allFacesArray = clarifaiFacesRegions.map(region => {
        return region.region_info.bounding_box
      })
      const boxes = allFacesArray.map(face => {
        return {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - (face.right_col * width),
          bottomRow: height - (face.bottom_row * height)
        }
      })
      return boxes
    }else {
      return []
    }
  }

  displayFaceBox = boxes => {
    this.setState({ boxes, input: "" })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value})
  }
  
  onDetect = () => {
    this.setState({ imageURL: this.state.input, boxes: [], error: "" })
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
      input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response && this.state.route === "home") {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => this.setState({ error: `${error}, did you enter URL of an image?` }))
  }

  onRouteChange = (route) => {
    switch (route) {
      case "signin":
        this.setState({ isSignedIn: false })
        break
      case "register":
        this.setState({ isSignedIn: false })
        break
      case "home": 
        this.setState({ isSignedIn: true })
        break
      default:
        this.setState({ isSignedIn: false })
    }
    this.setState({ route: route })
  }

  render () {
    const { isSignedIn, boxes, imageURL, route, input, user, error } = this.state
    return (
      <div className="App">
        <Particles className="particles"
                params={particlesOptions}
              />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === "home" || route === "guest"
          ?<div>
            <Logo />
            <Rank route={route} username={user.username} entries={user.entries} />
            <ImageLinkForm error={error} input={input} onDetect={this.onDetect} onInputChange={this.onInputChange} />
            <FaceRecognition error={error} removeImageURL={this.removeImageURL} boxes={boxes} imageURL={imageURL} />
          </div>
          : (
            route === "signin"
            ?<SignIn removeImageURL={this.removeImageURL} asGuest={this.asGuest} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :<Register removeImageURL={this.removeImageURL} asGuest={this.asGuest} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
        </div>
    );
  }
}

export default App;
