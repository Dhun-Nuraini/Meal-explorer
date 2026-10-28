import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">Meal Explorer</Link>
    </nav>
  )
}

export default Navbar
