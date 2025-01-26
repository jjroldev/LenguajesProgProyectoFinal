import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import { MiLista } from './MiLista/MiLista';
import Buscar from './Buscar/Buscar';
export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='home' element={<Home />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
            <Route path='miLista' element={<MiLista />} />
            <Route path='buscar' element={<Buscar />} />
        </Routes>
    );
};