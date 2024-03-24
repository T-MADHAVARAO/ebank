import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', userPin: '', msg: ''}

  changeUserId = event => {
    this.setState({userId: event.target.value})
  }

  changeUserPin = event => {
    this.setState({userPin: event.target.value})
  }

  loginUser = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const userData = {
      user_id: userId,
      pin: userPin,
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      headers: {
        authorization: 'application/json',
      },
      body: JSON.stringify(userData),
    }
    const responseData = await fetch(url, options)
    if (responseData.ok) {
      const data = await responseData.json()
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const data = await responseData.json()
      this.setState({msg: data.error_msg})
    }
  }

  render() {
    const {userId, userPin, msg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-ing"
          />

          <form onSubmit={this.loginUser}>
            <h1>Welcome Back!</h1>
            <label htmlFor="userId">User ID</label>
            <br />
            <input
              value={userId}
              type="text"
              placeholder="user ID"
              id="userId"
              onChange={this.changeUserId}
            />
            <br />
            <label htmlFor="pin">PIN</label>
            <br />
            <input
              value={userPin}
              type="password"
              placeholder="PIN"
              id="pin"
              onChange={this.changeUserPin}
            />
            <br />
            <button type="submit">Login</button>
            <p className="error">{msg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
