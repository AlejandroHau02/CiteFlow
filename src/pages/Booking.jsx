import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { useAppointments } from '../context/AppointmentsContext';
import { formatDateFull } from '../utils/dateUtils';
import DatePicker from '../components/appointments/DatePicker';
import TimeSlots from '../components/appointments/TimeSlots';
import BookingForm from '../components/appointments/BookingForm';
import './Booking.css';

const Booking = () => {
    const { addAppointment } = useAppointments();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingComplete, setBookingComplete] = useState(null);

    const handleSubmit = (formData) => {
        setIsSubmitting(true);

        // Simular delay de red
        setTimeout(() => {
            const appointment = addAppointment({
                ...formData,
                date: selectedDate,
                time: selectedTime
            });

            setBookingComplete(appointment);
            setIsSubmitting(false);
        }, 1000);
    };

    // Vista de confirmación exitosa
    if (bookingComplete) {
        return (
            <div className="booking-success">
                <div className="success-card">
                    <div className="success-icon">
                        <CheckCircle size={64} />
                    </div>
                    <h1>¡Cita Agendada!</h1>
                    <p>Tu cita ha sido registrada exitosamente.</p>

                    <div className="success-details">
                        <div className="detail-item">
                            <Calendar size={20} />
                            <span>{formatDateFull(bookingComplete.date)}</span>
                        </div>
                        <div className="detail-item">
                            <Clock size={20} />
                            <span>{bookingComplete.time} hrs</span>
                        </div>
                    </div>

                    <div className="success-info">
                        <p><strong>Servicio:</strong> {bookingComplete.service}</p>
                        <p><strong>Nombre:</strong> {bookingComplete.name}</p>
                        <p><strong>Email:</strong> {bookingComplete.email}</p>
                    </div>

                    <p className="success-note">
                        Recibirás un recordatorio antes de tu cita.
                        Si necesitas cancelar, contacta con anticipación.
                    </p>

                    <Link to="/" className="btn btn-primary">
                        <ArrowLeft size={18} />
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    const canShowForm = selectedDate && selectedTime;

    return (
        <div className="booking">
            <div className="booking-header">
                <h1>Agendar Cita</h1>
                <p>Selecciona fecha, hora y completa tus datos</p>
            </div>

            <div className="booking-container">
                <div className="booking-calendar">
                    <DatePicker
                        selectedDate={selectedDate}
                        onDateSelect={(date) => {
                            setSelectedDate(date);
                            setSelectedTime('');
                        }}
                    />

                    <TimeSlots
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onTimeSelect={setSelectedTime}
                    />
                </div>

                <div className="booking-form-container">
                    {canShowForm ? (
                        <>
                            <div className="selected-datetime">
                                <div className="datetime-item">
                                    <Calendar size={18} />
                                    <span>{formatDateFull(selectedDate)}</span>
                                </div>
                                <div className="datetime-item">
                                    <Clock size={18} />
                                    <span>{selectedTime} hrs</span>
                                </div>
                            </div>
                            <BookingForm
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        </>
                    ) : (
                        <div className="form-placeholder">
                            <Calendar size={48} />
                            <p> Selecciona fecha y hora para continuar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;