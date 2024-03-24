import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  logOut = () => {
    const {history} = this.props
    history.replace('/ebank/login')
    Cookies.remove('jwt_token')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="logo"
          />
          <button onClick={this.logOut} type="button">
            Logout
          </button>
        </div>
        <div className="home-content">
          <h1>Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card"
          />
        </div>
      </div>
    )
  }
}

export default Home
