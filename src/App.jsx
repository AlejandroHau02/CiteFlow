import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppointmentsProvider } from './context/AppointmentsContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Admin from './pages/Admin';
import RequireAuth from './components/auth/RequireAuth';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="booking" element={<Booking />} />
              <Route path="login" element={<Login />} />
              
              <Route element={<RequireAuth />}>
                <Route path="admin" element={<Admin />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AppointmentsProvider>
    </AuthProvider>
  );
}

export default App;