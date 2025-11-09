import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/index';
import Perfil from './pages/Perfil/Perfil';
import Cadastro from './pages/Cadastro/Cadastrao';
import Sobrenos from './pages/Sobre/index';
import Entrar from './pages/Entrar/Entrar';
import Verificacao from './pages/Verificacao';
import EmailEnviado from './pages/Entrar/PaginadeEspera';
import AtualizarSenha from './pages/RedefinirSenha/TrocarSenha';
import RotaProtegida from './components/component';
import Solicitacoes from './pages/Admin/Solicitacoes';

export default function Navegation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Cadastro' element={<Cadastro />} />
                <Route path='/Entrar' element={<Entrar />} />
                <Route path='/Sobre' element={<Sobrenos />} />
                <Route path='/PaginaDeEspera' element={<EmailEnviado />} />
                <Route path='/RedefinirSenha' element={<AtualizarSenha />} />
                <Route path='/Verificar' element={<Verificacao />} />
                <Route path='/Perfil' element={<Perfil />} />
                <Route path='/Admin'  element={<RotaProtegida tipoPermitido="Adm"><Solicitacoes /></RotaProtegida>}/>
            </Routes>
        </BrowserRouter>
    );
}
