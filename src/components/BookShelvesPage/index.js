import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header/index'
import BookCard from '../BookCard/index'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelvesPage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    bookShelveFilter: bookshelvesList[0],
    booksList: [],
  }

  componentDidMount() {
    this.getBooksDetails()
  }

  getBooksDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, bookShelveFilter} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookShelveFilter.value}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
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
        apiStatus: apiStatusConstants.success,
        booksList: data.books,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onFilterChange = filter => {
    this.setState({bookShelveFilter: filter}, this.getBooksDetails)
  }

  renderFailureView = () => (
    <div className="shelves-failure-view-container">
      <img
        className="shelves-failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/dlbszl6kr/image/upload/v1723050491/Group_7522_gouy9i.png"
      />
      <p className="shelves-failure-view-text">
        Something went wrong, Please try again.
      </p>
      <button
        onClick={this.getBooksDetails}
        type="button"
        className="shelves-failure-view-button"
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {booksList, searchInput} = this.state

    if (booksList.length === 0) {
      return (
        <div className="no-books-container">
          <img
            className="no-books-image"
            src="https://res.cloudinary.com/dlbszl6kr/image/upload/v1723226965/Asset_1_1_1_xrg1mo.png"
            alt="no books"
          />
          <p className="no-books-text">
            Your search for {searchInput} did not find any matches.
          </p>
        </div>
      )
    }

    return (
      <ul className="shelves-books-list-container">
        {booksList.map(eachBook => (
          <BookCard key={eachBook.id} bookDetails={eachBook} />
        ))}
      </ul>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, bookShelveFilter} = this.state
    return (
      <>
        <Header />
        <div className="shelf-page-container">
          <div className="search-bar-container">
            <input
              type="search"
              className="search-input"
              value={searchInput}
              onChange={this.onSearchInput}
              placeholder="search"
            />
            <button
              className="search-button"
              type="button"
              onClick={this.getBooksDetails}
            >
              <BsSearch />
            </button>
          </div>
          <div className="book-shelves-filter-section-container">
            <h1 className="bookshelves-title">Bookshelves</h1>
            <ul className="filters-container">
              {bookshelvesList.map(eachShelve => {
                const isSelected =
                  eachShelve.value === bookShelveFilter.value ? 'checked' : ''
                const onClickFilter = () => {
                  this.onFilterChange(eachShelve)
                }
                return (
                  <li key={eachShelve.id}>
                    <button
                      type="button"
                      onClick={onClickFilter}
                      className={`filter-container ${isSelected}`}
                    >
                      {eachShelve.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="books-section-container">
            <div className="w-status-search-bar-container">
              <h1 className="status-filter">{bookShelveFilter.label} Books</h1>
              <div className="w-search-bar-container">
                <input
                  type="search"
                  className="w-search-input"
                  value={searchInput}
                  onChange={this.onSearchInput}
                />
                <button
                  className="w-search-button"
                  type="button"
                  testid="searchButton"
                  onClick={this.getBooksDetails}
                >
                  <BsSearch />
                </button>
              </div>
            </div>
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
        </div>
      </>
    )
  }
}

export default BookShelvesPage
