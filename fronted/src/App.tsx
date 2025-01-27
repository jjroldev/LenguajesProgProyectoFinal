import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './componentes/PrivateRoutes';
import { PublicRoutes } from './componentes/PublicRoutes';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EmailProvider } from './context/ExistsEmailContext';
import { Toaster } from 'react-hot-toast';
import { SearchProvider } from './context/SearchContext';
function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {isLoggedIn ? <Route path="/*" element={<PrivateRoutes />} /> : <Route path="/*" element={<PublicRoutes />} />}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EmailProvider>
        <SearchProvider>
          <BrowserRouter>
            <Toaster position="bottom-right" reverseOrder={false} />
            <AppRoutes />
          </BrowserRouter>
        </SearchProvider>
      </EmailProvider>
    </AuthProvider>
  );
}
