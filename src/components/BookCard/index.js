/* eslint-disable camelcase */
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookCard = props => {
  const {bookDetails} = props
  const {id, title, read_status, rating, cover_pic, author_name} = bookDetails

  return (
    <li className="shelf-book-container">
      <Link className="shelf-link-container" to={`/books/${id}`}>
        <img className="book-img" src={cover_pic} alt={title} />
        <div className="shelf-book-text-container">
          <h1 className="book-title">{title}</h1>
          <p className="book-author">{author_name}</p>
          <div className="rating-section-container">
            <p className="rating-label">Avg Rating</p>
            <BsFillStarFill color="gold" style={{marginRight: '4px'}} />
            <p className="book-rating">{rating}</p>
          </div>
          <p className="status-label">
            Status: <span className="status-text">{read_status}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default BookCard
