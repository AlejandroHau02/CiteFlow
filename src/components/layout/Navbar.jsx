import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X, Home, Clock, LogIn } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Inicio', icon: Home },
        { path: '/booking', label: 'Agendar Cita', icon: Clock },
        { path: '/login', label: 'Admin', icon: LogIn },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-logo">
                    <span>CiteFlow</span>
                </Link>

                <button
                    className="navbar-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <link.icon size={18} />
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );

}

export default Navbar;