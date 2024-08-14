import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {FaBars} from 'react-icons/fa'
import {IoCloseCircle} from 'react-icons/io5'

const Header = props => {
  const [dopDown, toggleBar] = useState(false)

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickToggle = () => {
    toggleBar(prevState => !prevState)
  }
  return (
    <>
      <div className="header-container">
        <Link to="/">
          <img
            className="header-logo"
            src="https://res.cloudinary.com/dlbszl6kr/image/upload/v1714069410/BookHub/Group_7732_gz2blg.svg"
            alt="website logo"
          />
        </Link>
        <FaBars className="hamburger" onClick={onClickToggle} size={16} />
        <ul className="wide-screen-header">
          <li>
            <Link className="link-container" to="/">
              <p className="drop-down-header-tab">Home</p>
            </Link>
          </li>
          <li>
            <Link className="link-container" to="/shelf">
              <p className="drop-down-header-tab">Bookshelves</p>
            </Link>
          </li>
          <li>
            <button type="button" onClick={onClickLogout} className="logout">
              Logout
            </button>
          </li>
        </ul>
      </div>

      {dopDown && (
        <ul className="drop-down-header">
          <li>
            <Link className="link-container" to="/">
              <p className="drop-down-header-tab">Home</p>
            </Link>
          </li>
          <li>
            <Link className="link-container" to="/shelf">
              <p className="drop-down-header-tab">Bookshelves</p>
            </Link>
          </li>
          <li>
            <button type="button" onClick={onClickLogout} className="logout">
              Logout
            </button>
          </li>
          <li>
            <IoCloseCircle size={24} onClick={onClickToggle} />
          </li>
        </ul>
      )}
    </>
  )
}

export default withRouter(Header)
