import './App.css'
import { PageLogin } from './componentes/PageLogin/PageLogin';
import { PageRegister } from './componentes/PageRegister/PageRegister';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Home } from './componentes/Home/Home';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<PageLogin />} />
          <Route path="/register" element={<PageRegister />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
