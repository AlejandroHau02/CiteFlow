// Generar los próximos N días (exluyendo domingos)
export const getNextDays = (count = 14) => {
    const days = [];
    const today = new Date();

    let current = new Date(today);

    while (days.length < count) {
        // Excluir domingos
        if (current.getDay() !== 0) {
            days.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
    }

    return days;
};

// formatear fecha
export const formatDateISO = (date) => {
    return date.toISOString().split('T')[0];
};

// formatear fecha legible
export const formatDateShort = (date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    return `${days[date.getDay()]} ${date.getDate()}} ${months[date.getMonth()]}`;
};

// formatear fecha completa
export const formatDateFull = (dateString) => {
    const date = new Date(dateString + 'T12:00:00');
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return `${days[date.getDay()]} de ${date.getDate()}} de ${months[date.getMonth()]}`;
};

// generar horarios disponibles
export const getTimeSlots = (date) => {
    const dateObj = new Date(date + 'T12:00:00');
    const isSaturday = dateObj.getDay() === 6;

    const slots = [];
    const startHour = 9;
    const endHour = isSaturday ? 14 : 18;

    for (let hour = startHour; hour < endHour; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    return slots;
};

// verificar si es hoy
export const isToday = (date) => {
    const today = new Date();
    return formatDateISO(date) === formatDateISO(today);
};