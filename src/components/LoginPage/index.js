import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onUsernameChange = event => this.setState({username: event.target.value})

  onPasswordChange = event => this.setState({password: event.target.value})

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <img
          className="login-page-img"
          src="https://res.cloudinary.com/dlbszl6kr/image/upload/v1713811564/BookHub/Rectangle_1467_ediokx.png"
          alt="website login"
        />
        <div className="login-right-container">
          <form className="login-api-container" onSubmit={this.onSubmitDetails}>
            <img
              className="login-page-mb-img"
              src="https://res.cloudinary.com/dlbszl6kr/image/upload/v1713715101/BookHub/Ellipse_99_dksauq.png"
              alt="website login"
            />
            <img
              className="login-page-website-logo"
              src="https://res.cloudinary.com/dlbszl6kr/image/upload/v1713714668/BookHub/Vector_1_knpgrx.png"
              alt="login website logo"
            />
            <div className="input-container">
              <label htmlFor="usernameInput" className="label">
                Username*
              </label>
              <input
                type="text"
                className="login-input"
                id="usernameInput"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="passwordInput" className="label">
                Password*
              </label>
              <input
                type="password"
                className="login-input"
                id="passwordInput"
                onChange={this.onPasswordChange}
                value={password}
              />
            </div>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
