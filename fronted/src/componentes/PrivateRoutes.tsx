import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';


const MiLista= lazy(()=> import ("./MiLista/MiLista"));
const Buscar = lazy(() => import("./Buscar/Buscar"));
const Home = lazy(() => import("./Home/Home"));
// const InfoMovie = lazy(() => import(""));
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