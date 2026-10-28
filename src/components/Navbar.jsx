import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">Meal Finder</Link>
      <Link to="/" className="nav-link">Home</Link>
    </nav>
  )
}

export default Navbar
