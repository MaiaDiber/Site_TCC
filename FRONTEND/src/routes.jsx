import {BrowserRouter, Routes, Route} from 'react-router'
import Home from './pages/home/index'
import Cadastro from './pages/Cadastro/Cadastrao'

export default function Navegation() {
    return (

        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Cadastro' element={<Cadastro/>} />
        </Routes>
        </BrowserRouter>
    )
}