import { getNextDays, formatDateISO, formatDateShort, isToday } from '../../utils/dateUtils';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onDateSelect }) => {
    const availableDays = getNextDays(14);

    return (
        <div className="date-picker">
            <h3>Selecciona una fecha</h3>
            <div className="date-grid">
                {availableDays.map((date) => {
                    const dateISO = formatDateISO(date);
                    const isSelected = selectedDate === dateISO;
                    const todayClass = isToday(date) ? 'today' : '';

                    return (
                        <button
                            key={dateISO}
                            className={`date-btn ${isSelected ? 'selected' : ''} ${todayClass}`}
                            onClick={() => onDateSelect(dateISO)}
                        >
                            <span className="date-day">
                                {formatDateShort(date).split(' ')[0]}
                            </span>
                            <span className="date-number">
                                {date.getDate()}
                            </span>
                            {isToday(date) && <span className="date-today-label">Hoy</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DatePicker;