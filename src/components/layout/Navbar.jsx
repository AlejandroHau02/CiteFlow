import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Menu, X, Home, Clock, LogIn, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const navLinks = [
        { path: '/', label: 'Inicio', icon: Home },
        { path: '/booking', label: 'Agendar Cita', icon: Clock },
    ];

    if (isAuthenticated) {
        navLinks.push({ path: '/admin', label: 'Panel Admin', icon: Shield });
    } else {
        navLinks.push({ path: '/login', label: 'Admin', icon: LogIn });
    }

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
                    {isAuthenticated && (
                        <li>
                            <button
                                className="navbar-link logout-btn"
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                    navigate('/');
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}
                            >
                                <LogOut size={18} />
                                <span>Cerrar Sesión</span>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );

}

export default Navbar;