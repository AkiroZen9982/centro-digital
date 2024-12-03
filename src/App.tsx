import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegisterBusinessContainer } from './components/container/RegisterBusinessContainer';
import { HelpCenterContainer } from './components/presentation/HelpCenter';
import { TermsContainer } from './components/presentation/Terms';
import { PrivacyContainer } from './components/presentation/Privacy';
import NotFound from './components/presentation/Error404';
import { AuthProvider, useAuth } from './context/auth/authContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import BusinessPage from './pages/BusinessPage';
import Login from './pages/Login';

function App() {

  const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/:id" element={<BusinessPage />} />
          <Route path="/register-business" element={<RegisterBusinessContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<HelpCenterContainer />} />
          <Route path="/terms" element={<TermsContainer />} />
          <Route path="/privacy" element={<PrivacyContainer />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />


          {/*Ruta para manejar el error 404.*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;