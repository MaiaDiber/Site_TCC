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
import TesteMapa from './pages/mapa/testeMapa';
import PaginaAdmin from './pages/Admin/Principal';
import CabecalhoAdmin from './components/Index/AdminCabecalho';

export default function Navegation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/Cadastro' element={<Cadastro />} />
                <Route path='/' element={<Entrar />} />

                <Route path='/Home' element={<RotaProtegida><Home /></RotaProtegida>} />
                <Route path='/Sobre' element={<RotaProtegida><Sobrenos /></RotaProtegida>} />
                <Route path='/PaginaDeEspera' element={<RotaProtegida><EmailEnviado /></RotaProtegida>} />
                <Route path='/RedefinirSenha' element={<RotaProtegida><AtualizarSenha /></RotaProtegida>} />
                <Route path='/Verificar' element={<RotaProtegida><Verificacao /></RotaProtegida>} />
                <Route path='/Perfil' element={<RotaProtegida><Perfil /></RotaProtegida>} />
                <Route path='/Mapa' element={<RotaProtegida><TesteMapa/></RotaProtegida>} />
                <Route path='/Admin'  element={<RotaProtegida tipoPermitido="admin"><PaginaAdmin /></RotaProtegida>}/>
                <Route path='/SolicitaçõesAdmin'  element={<RotaProtegida tipoPermitido="admin"><Solicitacoes /></RotaProtegida>}/>
            </Routes>
        </BrowserRouter>
    );

    
}
