import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './pages/home/index';
import Perfil from './pages/Perfil/Perfil';
import Cadastro from './pages/Cadastro/Cadastrao';
import Sobrenos from './pages/Sobre/index';
import Entrar from './pages/Entrar/Entrar';
import Verificacao from './pages/Verificacao';
import AtualizarSenha from './pages/RedefinirSenha/TrocarSenha';
import RotaProtegida from './components/component';
import Solicitacoes from './pages/Admin/Solicitacoes';
import TesteMapa from './pages/mapa/testeMapa';
import PaginaAdmin from './pages/Admin/Principal';
import EsqueciSenha from './pages/RedefinirSenha/enviarEmail';
import UPAs from './pages/UPAs/upa';
import CalendarioVacinacao from './pages/Vacinacao/CalendarioVacinacao';
import Horarios from './pages/Horarios/Horarios';
import Form from './pages/Formulario';
import AdminCRUD from './pages/CRUD/crud';
import SobrenosAdmin from './pages/Sobre/sobreAdmin';


export default function Navegation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/Cadastro' element={<Cadastro />} />
                <Route path='/' element={<Entrar />} />
                <Route path='/EnviarEmail' element={<EsqueciSenha />} />
                <Route path='/RedefinirSenha/:token' element={<AtualizarSenha />}/>
                

                <Route path='/upas' element={<RotaProtegida><UPAs /></RotaProtegida>}/>
                <Route path='/CRUD' element={<RotaProtegida><AdminCRUD /></RotaProtegida>}/>
                <Route path='/Vacinacoes' element={<RotaProtegida><CalendarioVacinacao /></RotaProtegida>}/>
                <Route path='/Horarios' element={<RotaProtegida><Horarios/></RotaProtegida>}/>
                <Route path='/Formulario' element={<RotaProtegida><Form/></RotaProtegida>}/>
                <Route path='/Home' element={<RotaProtegida><Home /></RotaProtegida>} />
                <Route path='/SobreAdmin' element={<RotaProtegida><SobrenosAdmin /></RotaProtegida>} />
                <Route path='/Sobre' element={<RotaProtegida><Sobrenos /></RotaProtegida>} />
                <Route path='/Verificar' element={<RotaProtegida><Verificacao /></RotaProtegida>} />
                <Route path='/Perfil' element={<RotaProtegida><Perfil /></RotaProtegida>} />
                <Route path='/Mapa' element={<RotaProtegida><TesteMapa/></RotaProtegida>} />
                <Route path='/Admin'  element={<RotaProtegida tipoPermitido="admin"><PaginaAdmin /></RotaProtegida>}/>
                <Route path='/SolicitaçõesAdmin'  element={<RotaProtegida tipoPermitido="admin"><Solicitacoes /></RotaProtegida>}/>
                <Route path='/Forms' element={<Form/>}/>
            </Routes>
        </BrowserRouter>
    );

    
}
