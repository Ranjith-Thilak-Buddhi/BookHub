/* eslint-disable camelcase */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItem extends Component {
  state = {apiStatus: apiStatusConstants.initial, bookDetails: {}}

  componentDidMount() {
    this.fetchBookDetails()
  }

  fetchBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({
        bookDetails: data.book_details,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessViews = () => {
    const {bookDetails} = this.state
    const {
      about_book,
      about_author,
      title,
      read_status,
      rating,
      cover_pic,
      author_name,
    } = bookDetails

    return (
      <div className="book-item-container">
        <div className="book-item-top-section-container">
          <img className="book-item-img" src={cover_pic} alt={title} />
          <div className="book-item-text-container">
            <h1 className="book-item-title">{title}</h1>
            <p className="book-item-author">{author_name}</p>
            <div className="book-item-rating-section-container">
              <p className="book-item-rating-label">Avg Rating</p>
              <BsFillStarFill color="gold" style={{marginRight: '4px'}} />
              <p className="book-item-rating">{rating}</p>
            </div>
            <p className="book-item-status-label">
              Status:{' '}
              <span className="book-item-status-text">{read_status}</span>
            </p>
            <div />
          </div>
        </div>
        <hr className="horizontal-line" />
        <h1 className="about-author-label">About Author</h1>
        <p className="about-author-text">{about_author}</p>
        <h1 className="about-book-label">About Book</h1>
        <p className="about-book-text">{about_book}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="book-failure-view-container">
      <img
        className="home-failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/dlbszl6kr/image/upload/v1723050491/Group_7522_gouy9i.png"
      />
      <p className="home-failure-view-text">
        Something went wrong, Please try again.
      </p>
      <button
        onClick={this.fetchBookDetails}
        type="button"
        className="home-failure-view-button"
      >
        Try Again
      </button>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessViews()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-item-page-container">
          {this.renderView()}
          <div className="home-page-footer-container">
            <div className="home-page-socials-container">
              <FaGoogle size={14} />
              <FaTwitter size={14} />
              <FaInstagram size={14} />
              <FaYoutube size={14} />
            </div>
            <p className="home-page-contact-us-text">Contact Us</p>
          </div>
        </div>
      </>
    )
  }
}

export default BookItem
