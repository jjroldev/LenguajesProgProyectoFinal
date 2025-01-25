import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='home' element={<Home />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
    );
};