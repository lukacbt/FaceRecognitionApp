import React, { Component } from "react"
import "./register.css"

class Register extends Component{
  constructor(props) {
    super(props)
    this.state = {
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
    }
  }

  onInputChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  onRegister = () => {
    this.props.removeImageURL()
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: this.state.registerUsername,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    }).then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange("home")
        }
      })
  }

  render() {
    const { registerPassword, registerUsername, registerEmail } = this.state
    return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
                <input onChange={this.onInputChange} placeholder="Username..." autoComplete="new-password" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" value={registerUsername} name="registerUsername" />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onInputChange} placeholder="Email..." autoComplete="new-password" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" value={registerEmail} name="registerEmail" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onInputChange} placeholder="Password..." autoComplete="new-password" className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" value={registerPassword} name="registerPassword" />
              </div>
              </fieldset>
              <div className="">
              <input
                onClick={this.onRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register" />
              </div>
          </div>
          <p onClick={this.props.asGuest} className="tryItOut">Try it out as guest >></p>
        </main>
      </article>
    )
  }
}

export default Register