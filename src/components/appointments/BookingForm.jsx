import { useState } from 'react';
import { User, Mail, Phone, FileText, Briefcase } from 'lucide-react';
import './BookingForm.css';

const BookingForm = ({ onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        notes: '',
    });

    const [errors, setErrors] = useState({});

    const services = [
        'Corte de Cabello',
        'Tratamiento Facial',
        'Masaje Relajante',
        'Manicure y Pedicure',
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'El telefono es requerido';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'El telefono debe tener 10 digitos';
        }

        if (!formData.service) {
            newErrors.service = 'El servicio es requerido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar error al escribir
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            <h3>Completa tus datos</h3>

            <div className="form-group">
                <label htmlFor="name">
                    <User size={18} />
                    Nombre completo
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email">
                    <Mail size={18} />
                    Correo Electrónico
                </label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="phone">
                    <Phone size={18} />
                    Teléfono
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="service">
                    <Briefcase size={18} />
                    Servicio
                </label>
                <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={errors.service ? 'error' : ''}
                >
                    <option value="">Selecciona un servicio</option>
                    {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                    ))}
                </select>
                {errors.service && <span className="error-msg">{errors.service}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="notes">
                    <FileText size={18} />
                    Notas adicionales (opcional)
                </label>
                <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Algún comentario o  solicitud especial..."
                    rows={3}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-lg submit-btn"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Agendando...' : 'Confirmar Cita'}
            </button>
        </form>
    );
};

export default BookingForm;