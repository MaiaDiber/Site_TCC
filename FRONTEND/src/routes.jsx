import {BrowserRouter, Routes, Route} from 'react-router'
import Home from './pages/home/index'
import Cadastro from './pages/Cadastro/Cadastrao'
import Sobrenos from './pages/Sobre/index'

export default function Navegation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/Cadastro' element={<Cadastro/>} />
                <Route path='/Sobre' element={<Sobrenos/>} />
            </Routes>
        </BrowserRouter>
    )
}