import { useState } from 'react';
import { useAppointments } from '../context/AppointmentsContext';
import { useAuth } from '../context/AuthContext';
import { formatDateFull } from '../utils/dateUtils';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, Trash2, LogOut } from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const { appointments, updateAppointmentStatus, deleteAppointment } = useAppointments();
    const { logout } = useAuth();
    const [filter, setFilter] = useState('all'); // all, pending, confirmed, cancelled

    const filteredAppointments = appointments.filter(apt => {
        if (filter === 'all') return true;
        return apt.status === filter;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    const handleStatusChange = (id, newStatus) => {
        updateAppointmentStatus(id, newStatus);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
            deleteAppointment(id);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <span className="badge pending">Pendiente</span>;
            case 'confirmed': return <span className="badge confirmed">Confirmada</span>;
            case 'cancelled': return <span className="badge cancelled">Cancelada</span>;
            default: return null;
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div>
                    <h1>Panel de Administración</h1>
                    <p>Gestiona las citas del sistema</p>
                </div>
                <button onClick={logout} className="btn btn-outline">
                    <LogOut size={18} />
                    Cerrar Sesión
                </button>
            </header>

            <div className="admin-filters">
                <button 
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Todas
                </button>
                <button 
                    className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Pendientes
                </button>
                <button 
                    className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
                    onClick={() => setFilter('confirmed')}
                >
                    Confirmadas
                </button>
                <button 
                    className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
                    onClick={() => setFilter('cancelled')}
                >
                    Canceladas
                </button>
            </div>

            <div className="appointments-list">
                {filteredAppointments.length === 0 ? (
                    <div className="no-appointments">
                        <Calendar size={48} />
                        <p>No hay citas {filter !== 'all' ? `en estado ${filter}` : ''}</p>
                    </div>
                ) : (
                    filteredAppointments.map(apt => (
                        <div key={apt.id} className="appointment-card">
                            <div className="apt-header">
                                <div className="apt-service">
                                    <h3>{apt.service}</h3>
                                    {getStatusBadge(apt.status)}
                                </div>
                                <div className="apt-datetime">
                                    <div className="dt-item">
                                        <Calendar size={16} />
                                        <span>{formatDateFull(apt.date)}</span>
                                    </div>
                                    <div className="dt-item">
                                        <Clock size={16} />
                                        <span>{apt.time} hrs</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="apt-client">
                                <div className="client-info">
                                    <User size={16} />
                                    <span>{apt.name}</span>
                                </div>
                                <div className="client-info">
                                    <Mail size={16} />
                                    <span>{apt.email}</span>
                                </div>
                                {apt.phone && (
                                    <div className="client-info">
                                        <Phone size={16} />
                                        <span>{apt.phone}</span>
                                    </div>
                                )}
                            </div>

                            <div className="apt-actions">
                                {apt.status !== 'confirmed' && (
                                    <button 
                                        className="btn-action confirm"
                                        onClick={() => handleStatusChange(apt.id, 'confirmed')}
                                        title="Confirmar"
                                    >
                                        <CheckCircle size={18} />
                                    </button>
                                )}
                                {apt.status !== 'cancelled' && (
                                    <button 
                                        className="btn-action cancel"
                                        onClick={() => handleStatusChange(apt.id, 'cancelled')}
                                        title="Cancelar"
                                    >
                                        <XCircle size={18} />
                                    </button>
                                )}
                                <button 
                                    className="btn-action delete"
                                    onClick={() => handleDelete(apt.id)}
                                    title="Eliminar"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Admin;