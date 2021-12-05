import Header from '../Header'
import './index.css'

const NotFound = () => {
  const message = 'we’re sorry, the page you requested could not be found'
  return (
    <>
      <Header />
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="not-found"
        />
        <h1 className="not-found-text">Page not Found</h1>
        <p className="message">{message}</p>
      </div>
    </>
  )
}
export default NotFound
