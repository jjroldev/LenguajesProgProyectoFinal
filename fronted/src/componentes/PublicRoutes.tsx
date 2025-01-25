import { Navigate, Route, Routes } from 'react-router-dom';
import { PageLogin } from './PageLogin/PageLogin';
import { PageRegister } from './PageRegister/PageRegister';
export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path='login' element={<PageLogin />} />
            <Route path="register" element={<PageRegister />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    );
};