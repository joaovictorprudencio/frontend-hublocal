import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ResgisterPage from '../features/auth/pages/RegisterPage';
const AppRoutes = () => {
    return (
        <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<ResgisterPage />} />
          {/* Ex: rota da dashboard */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Routes>
      </Router>
    );
}

export default AppRoutes;