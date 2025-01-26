import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import { MiLista } from './Perfil/MiLista';
export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='home' element={<Home />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
            <Route path='miLista' element={<MiLista />} />
        </Routes>
    );
};