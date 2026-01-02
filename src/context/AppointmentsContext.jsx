import { createContext, useContext, useState, useEffect } from 'react';

const AppointmentsContext = createContext();

export const useAppointments = () => {
    const context = useContext(AppointmentsContext);
    if (!context) {
        throw new Error('useAppointments must be used within AppointmentsProvider');
    }
    return context;
};

export const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);

    // Cargar citas del LocalStorage al iniciar
    useEffect(() => {
        const saved = localStorage.getItem('citeflow_appointments');
        if (saved) {
            setAppointments(JSON.parse(saved));
        }
    }, []);

    // Guardar citas en localstorage cuando cambien
    useEffect(() => {
        localStorage.setItem('citeflow_appointments', JSON.stringify(appointments));
    }, [appointments]);

    // Agregar nueva cita
    const addAppointment = (appointment) => {
        const newAppointment = {
            ...appointment,
            id: Date.now().toString(),
            status: 'pending', //pending, confirmed, cancelled
            createdAt: new Date().toISOString()
        };
        setAppointments(prev => [...prev, newAppointment]);
        return newAppointment;
    };

    //Actualizar estado de cita
    const updateAppointmentStatus = (id, status) => {
        setAppointments(prev =>
            prev.map(apt =>
                apt.id === id ? { ...apt, status } : apt
            )
        );
    };

    // Eliminar cita
    const deleteAppointment = (id) => {
        setAppointments(prev => prev.filter(apt => apt.id !== id));
    };

    // Verificar si un horario está ocupado
    const isTimeSlotTaken = (date, time) => {
        return appointments.some(
            apt => apt.date === date && apt.time === time && apt.status !== 'cancelled'
        );
    };

    // Obtener citas por fecha
    const getAppointmentsByDate = (date) => {
        return appointments.filter(apt => apt.date === date);
    };

    const value = {
        appointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        isTimeSlotTaken,
        getAppointmentsByDate
    };

    return (
        <AppointmentsContext.Provider value={value}>
            {children}
        </AppointmentsContext.Provider>
    );

};