import React, { Component } from "react"
import "./signin.css"

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: "",
      signInPassword: "",
      error: ""
    }
  }

  onInputChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  onSubmitSignIn = () => {
    this.props.removeImageURL()
    fetch("https://floating-citadel-50795.herokuapp.com/signin", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    }).then(response => response.json())
      .then(user => {
        if (user.id){
          this.props.loadUser(user)
          this.props.onRouteChange("home")
        }else {
          this.setState({ error: "Wrong email and password", signInEmail: "", signInPassword: "" })
        }
      })
  }

  render() {
    const { signInEmail, signInPassword } = this.state
    return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input value={signInEmail} value={signInEmail} onChange={this.onInputChange} placeholder="Email..." autoComplete="new-password" className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="signInEmail"  id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input value={signInPassword} value={signInPassword} onChange={this.onInputChange} placeholder="Password..." autoComplete="new-password" className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="signInPassword"  id="password" />
              </div>
              </fieldset>
              <div>
              <input
                style={this.state.error ? {borderColor: "red", color:"red"} : {borderColor: "black", color:"black"}}
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib signIn" 
                type="submit" 
                value="Sign in" />
              </div>
              <p style={{ color: "red", marginBottom: "-10px", fontWeight: "bold" }}> {this.state.error} </p>
          </div>
          <p onClick={this.props.asGuest} className="tryItOut">Try it out as guest >></p>
        </main>
      </article>
    )}
}

export default SignIn