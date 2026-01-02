import { Clock } from 'lucide-react';
import { useAppointments } from '../../context/AppointmentsContext';
import { getTimeSlots } from '../../utils/dateUtils';
import './TimeSlots.css';

const TimeSlots = ({ selectedDate, selectedTime, onTimeSelect }) => {

    const { isTimeSlotTaken } = useAppointments();

    if (!selectedDate) {
        return (
            <div className="time-slots-empty">
                <Clock size={48} />
                <p>Por favor, selecciona una fecha para ver los horarios disponibles</p>
            </div>
        );
    }

    const slots = getTimeSlots(selectedDate);

    return (
        <div className="time-slots">
            <h3>Selecciona un horario</h3>
            <div className="time-grid">
                {slots.map((time) => {
                    const isTaken = isTimeSlotTaken(selectedDate, time);
                    const isSelected = selectedTime === time;

                    return (
                        <button
                            key={time}
                            className={`time-btn ${isSelected ? 'selected' : ''} ${isTaken ? 'taken' : ''}`}
                            onClick={() => !isTaken && onTimeSelect(time)}
                            disabled={isTaken}
                        >
                            {time}
                            {isTaken && <span className="taken-label">Ocupado</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TimeSlots;