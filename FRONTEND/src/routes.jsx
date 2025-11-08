import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/index';
import Cadastro from './pages/Cadastro/Cadastrao';
import Sobrenos from './pages/Sobre/index';
import Entrar from './pages/Entrar/Entrar';
import EmailEnviado from './pages/Entrar/RedefinicaoSenha';
import Verificacao from './pages/Verificacao';
import PaginaAdmin from './pages/Admin/index';
import RotaProtegida from './components/component';

export default function Navegation() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas públicas */}
                <Route path='/' element={<Home />} />
                <Route path='/Cadastro' element={<Cadastro />} />
                <Route path='/Entrar' element={<Entrar />} />
                <Route path='/Sobre' element={<Sobrenos />} />
                <Route path='/RedefinirSenha' element={<EmailEnviado />} />
                <Route path='/Verificar' element={<Verificacao />} />

                {/* Rota protegida — somente Adm pode acessar */}
                <Route
                    path='/Admin'
                    element={
                        <RotaProtegida tipoPermitido="Adm">
                            <PaginaAdmin />
                        </RotaProtegida>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
