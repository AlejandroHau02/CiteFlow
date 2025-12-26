import { Link } from 'react-router-dom';
import {
    Calendar,
    Clock,
    CheckCircle,
    Star,
    ArrowRight,
    Scissors,
    Sparkles,
    Heart,
    Zap
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const services = [
        {
            icon: Scissors,
            title: 'Corte de Cabello',
            description: 'Cortes modernos y clásicos adaptados a tu estilo personal.',
            duration: '30 min',
            price: '$150'
        },
        {
            icon: Sparkles,
            title: 'Tratamiento Facial',
            description: 'Limpieza profunda e hidratación para una piel radiante.',
            duration: '45 min',
            price: '$300'
        },
        {
            icon: Heart,
            title: 'Masaje Relajante',
            description: 'Técnicas profesionales para liberar tensión y estrés',
            duration: '60 min',
            price: '$400'
        },
        {
            icon: Zap,
            title: 'Manicure y Pedicure',
            description: 'Cuidado completo de manos y pies con productos premium.',
            duration: '45 min',
            price: '$250'
        }
    ];

    const schedule = [
        { day: 'Lunes', hours: '9:00 - 18:00' },
        { day: 'Martes', hours: '9:00 - 18:00' },
        { day: 'Miercoles', hours: '9:00 - 18:00' },
        { day: 'Jueves', hours: '9:00 - 18:00' },
        { day: 'Viernes', hours: '9:00 - 18:00' },
        { day: 'Sabado', hours: '9:00 - 14:00' },
        { day: 'Domingo', hours: 'Cerrado' }
    ];

    const features = [
        'Reserva en menos de 2 minutos',
        'Confirmación instantánea',
        'Recordatorios automáticos',
        'Cancelación flexible'
    ];

    return (
        <div className="home">
            {/* Hero section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <Star size={16} />
                        <span>Sistema de Citas #1</span>
                    </div>
                    <h1 className="hero-title">
                        Agenta tu cita de forma
                        <span className="gradient-text"> rápida y sencilla</span>
                    </h1>
                    <p className="hero-description">
                        CiteFlow te permite reservar citas en segundos.
                        Sin llamadas, sin esperas, solo elige el horario que prefieras.
                    </p>
                    <div className="hero-features">
                        {features.map((feature, index) => (
                            <div key={index} className="hero-feature">
                                <CheckCircle size={18} />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div className="hero-actions">
                        <Link to="/booking" className="btn- btn-primary btn-lg">
                            <Calendar size={20} />
                            Agendar Cita Ahora
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-card">
                        <div className="card-header">
                            <Calendar className="card-icon" />
                            <span>Próxima cita disponible</span>
                        </div>
                        <div className="card-time">
                            <Clock size={24} />
                            <span>Hoy, 10:00 AM</span>
                        </div>
                        <div className="card-action">
                            <button className="btn btn-secondary">Reservar</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services section */}
            <section className="services" id="services">
                <div className="section-header">
                    <h2>Nuestros Servicios</h2>
                    <p>Ofrecemos una variedad de servicios profesionales para ti</p>
                </div>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">
                                <service.icon size={28} />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-meta">
                                <span className="service-duration">
                                    <Clock size={14} />
                                    {service.duration}
                                </span>
                                <span className="service-price">{service.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Schedule section */}
            <section className="schedule" id="schedule">
                <div className="section-header">
                    <h2>Horarios de Atención</h2>
                    <p>Estamos disponibles para ti en los siguientes horarios</p>
                </div>
                <div className="schedule-container">
                    <div className="schedule-table">
                        {schedule.map((item, index) => (
                            <div
                                key={index}
                                className={`schedule-row ${item.hours === 'Cerrado' ? 'closed' : ''}`}
                            >
                                <span className="schedule-day">{item.day}</span>
                                <span className="schedule-hours">{item.hours}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="cta-content">
                    <h2>¿Listo para agendar tu cita?</h2>
                    <p>No esperes más, reserva ahora y asegura tu horario preferido.</p>
                    <Link to="/booking" className="btn btn-primary btn-lg">
                        <Calendar size={20} />
                        Agendar Mi Cita
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;