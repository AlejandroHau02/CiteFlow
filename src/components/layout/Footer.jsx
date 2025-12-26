import { Calendar, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <div className="footer-logo">
                        <Calendar className="logo-icon" />
                        <span>CiteFlow</span>
                    </div>
                    <p className="footer-description">
                        Sistema profesional de gestión de citas.
                        Simplifica tu agenda y mejora la experiencia de tus clientes.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Contacto</h4>
                    <ul className="footer-links">
                        <li>
                            <Mail size={16} />
                            <span>contacto@citeflow.com</span>
                        </li>
                        <li>
                            <Phone size={16} />
                            <span>+52 123 456 7890</span>
                        </li>
                        <li>
                            <MapPin size={16} />
                            <span>Ubicación, MX</span>>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Horarios</h4>
                    <ul className="footer-links">
                        <li>Lunes - Viernes: 9:00 - 18:00</li>
                        <li>Sábado: 9:00 - 14:00</li>
                        <li>Domingo: Cerrado</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} CiteFlow. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;