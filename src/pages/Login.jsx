import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // si ya esta autenticado, redirigir
    if (isAuthenticated) {
        navigate('/admin');
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // simular delay
        setTimeout(() => {
            const result = login(formData.username, formData.password);

            if (result.success) {
                navigate('/admin');
            } else {
                setError(result.error);
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="login">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon">
                        <Lock size={32} />
                    </div>
                    <h1>Acceso Administrador</h1>
                    <p>Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">
                            <User size={18} />
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Ingresa tu usuario"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <Lock size={18} />
                            Contraseña
                        </label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Ingresando...' : (
                            <>
                                <LogIn size={20} />
                                Iniciar Sesión
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;