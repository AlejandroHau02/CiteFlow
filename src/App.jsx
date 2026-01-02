import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppointmentsProvider } from './context/AppointmentsContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <AppointmentsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="booking" element={<Booking />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppointmentsProvider>
  );
}

export default App;