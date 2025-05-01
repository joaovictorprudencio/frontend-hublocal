import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ResgisterPage from '../features/auth/pages/RegisterPage';
import CompaniesPage from '../features/companies/pages/CompaniesPage';
import LocationsPage from '../features/locations/pages/LocationsPage';
const AppRoutes = () => {
    return (
        <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<ResgisterPage />} />
          <Route path="/MyCompanies" element={<CompaniesPage />} />
          <Route path="/company/:companyId/locations" element={<LocationsPage />} />
        </Routes>
      </Router>
    );
}

export default AppRoutes;