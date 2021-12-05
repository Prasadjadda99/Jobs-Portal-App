import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({
        showErrorMsg: true,
        errorMsg,
      })
    }
  }

  render() {
    const {showErrorMsg, username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              className="username-input-field"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="password-input-field"
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
