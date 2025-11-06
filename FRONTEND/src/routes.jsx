import {BrowserRouter, Routes, Route} from 'react-router'
import Home from './pages/home/index'
import Cadastro from './pages/Cadastro/Cadastrao'
import Sobrenos from './pages/Sobre/index'
import Entrar from './pages/Entrar/Entrar'
import Verificacao from './pages/Verificação/index'


export default function Navegation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/Cadastro' element={<Cadastro/>} />
                <Route path='/Entrar' element={<Entrar/>} />
                <Route path='/Sobre' element={<Sobrenos/>} />
                <Route path='/Medicamentos' element={<Verificacao/>} />
            </Routes>
        </BrowserRouter>
    

)
}





