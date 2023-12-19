import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
      <Link to="/" alt="AoPS Logo">
        <p>Logo goes here</p>
      </Link>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink> {/* NavLink gives active class and 'end' keeps Dashboard from always being active */}
        <NavLink to="/preferences">Preferences</NavLink>
      </nav>
    </header>
  )
}
