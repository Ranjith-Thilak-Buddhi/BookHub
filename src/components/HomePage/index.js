/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomePage extends Component {
  state = {booksList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
        booksList: data.books,
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
    const {booksList} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider className="slick-slider" {...settings}>
        {booksList.map(eachBook => {
          const {id, author_name, title, cover_pic} = eachBook
          return (
            <Link
              to={`/books/${eachBook.id}`}
              className="home-eachBook-container"
              key={id}
            >
              <img className="home-book-m-img" src={cover_pic} alt={title} />
              <h1 className="home-book-m-title">{title}</h1>
              <p className="home-book-m-author-name">{author_name}</p>
            </Link>
          )
        })}
      </Slider>
    )
  }

  renderFailureView = () => (
    <div className="home-failure-view-container">
      <img
        className="home-failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/dlbszl6kr/image/upload/v1723050491/Group_7522_gouy9i.png"
      />
      <p className="home-failure-view-text">
        Something went wrong, Please try again.
      </p>
      <button
        onClick={this.fetchDetails}
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
        <div className="home-page-container">
          <div className="home-page-text-container">
            <h1 className="home-page-heading-text">
              Find Your Next Favorite Books?
            </h1>
            <p className="home-page-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link className="link-container" to="/shelf">
              <button type="button" className="home-page-find-books-m-button">
                Find Books
              </button>
            </Link>
          </div>
          <div className="slider-section-container">
            <div className="button-and-title-container">
              <h1 className="slider-section-title">Top Rated Books</h1>
              <Link className="link-container" to="/shelf">
                <button type="button" className="home-page-find-books-l-button">
                  Find Books
                </button>
              </Link>
            </div>
            {this.renderView()}
          </div>
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

export default HomePage
