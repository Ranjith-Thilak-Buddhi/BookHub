import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-page-container">
    <img
      className="not-found-img"
      src="https://res.cloudinary.com/dlbszl6kr/image/upload/v1723048832/Group_7484_1_d4fzlq.png"
      alt="not found"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-text">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link className="link-container" to="/">
      <button type="button" className="not-found-page-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
