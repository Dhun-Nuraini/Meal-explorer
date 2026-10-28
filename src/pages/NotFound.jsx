import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="message">
      <p>Page not found.</p>
      <Link to="/">Back to meals</Link>
    </div>
  )
}

export default NotFound
