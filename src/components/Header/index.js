import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </ul>
        <button
          type="button"
          className="logout-button-desktop"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
      <div className="nav-content-mobile">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-mobile"
          />
        </Link>
        <ul className="nav-menu-mobile">
          <Link to="/" className="nav-link">
            <li>
              <AiFillHome className="home-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>
              <BsBriefcaseFill className="job-icon" />
            </li>
          </Link>
          <button
            type="button"
            className="Logout-button-mobile"
            onClick={onClickLogout}
          >
            <li>
              <FiLogOut className="logout-mobile-icon" />
            </li>
          </button>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
