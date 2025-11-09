import { useState } from 'react';
import api from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import './Cadastrao.scss';
import CabecalhoCadastro from '../../components/Cadastro/cabecalhoCadastro';

export default function Cadastro() {
    const [erros, setErros] = useState({});

  const navigate = useNavigate();

  function validarCampos() {
  const novosErros = {};

  if (!form.nome_completo.trim()) novosErros.nome_completo = "Informe o nome completo";
  if (!form.cpf.trim()) novosErros.cpf = "Informe o CPF";
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf))
    novosErros.cpf = "CPF inválido (use o formato 000.000.000-00)";
  if (!form.data_nascimento) novosErros.data_nascimento = "Informe a data de nascimento";
  if (!form.email.trim()) novosErros.email = "Informe o e-mail";
  if (!form.senha.trim()) novosErros.senha = "Crie uma senha";
  if (!form.cep.trim()) novosErros.cep = "Informe o CEP";
  if (!form.rua.trim()) novosErros.rua = "Informe a rua ou avenida";
  if (!form.numero.trim()) novosErros.numero = "Informe o número da casa";
  if (!form.bairro.trim()) novosErros.bairro = "Informe o bairro";
  if (!form.tipo) novosErros.tipo = "Selecione o cargo";

  setErros(novosErros);
  return Object.keys(novosErros).length === 0;
}


  const hoje = new Date().toISOString().split("T")[0];
  const dataMinima = "1900-01-01";

  const [form, setform] = useState({
    nome_completo: '',
    cpf: '',
    data_nascimento: '',
    email: '',
    senha: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    tipo: '',
    abrirDropdown: false
  });

  function atualizar(campo, valor) {
    setform({ ...form, [campo]: valor });
  }

  async function salvar() {
    try {
      const dataNasc = new Date(form.data_nascimento);
      const dataMin = new Date(dataMinima);
      const dataMax = new Date();

       if (!validarCampos()) {
    alert("Preencha todos os campos obrigatórios corretamente.");
    return;
  }

      if (dataNasc < dataMin || dataNasc > dataMax) {
        alert("Data de nascimento inválida!");
        return;
      }

      if (!form.tipo) {
        alert("Selecione o cargo (Usuário ou Solicitar Administrador).");
        return;
      }

      await api.post('/inserir', form);
      alert('Usuário cadastrado com sucesso!');

      
      setform({
        nome_completo: '',
        cpf: '',
        data_nascimento: '',
        email: '',
        senha: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        tipo: '',
        abrirDropdown: false
      });

      navigate('/');
    } catch (erro) {
      console.error(erro);
      alert('Erro ao cadastrar usuário.');
    }
  }

  return (
    <section className='all'>
      <section className='Container'>
        <CabecalhoCadastro />
        <div className='primeiroP'>
          <p>Preencha os dados abaixo para completar seu atendimento na unidade de saúde</p>
        </div>

        <div className='informação-usuário'>
          <div className='dados-usu'>
            <p>Dados pessoais</p>
          </div>

                <div className="dados">
                   
                    <div className="inputs">
                         <label>  <p>Nome Completo*</p>
                        <input type="text" placeholder='Nome Completo'
                        value={form.nome_completo} onChange={(e) => atualizar('nome_completo', e.target.value)}
                        className={erros.nome_completo ? 'erro' : ''}
                        />
                        {erros.nome_completo && <span className="msg-erro">{erros.nome_completo}</span>}
                    </label>

                    <div className="grupo1">
                        <label> <p>CPF*</p>
                            <input type="text" placeholder='000.000.000-00' 
                            value={form.cpf} onChange={(e) => atualizar('cpf',e.target.value)}
                            className={erros.cpf ? 'erro' : ''}
                            />
                            {erros.cpf && <span className="msg-erro">{erros.cpf}</span>}
                            </label>

                            <label> <p>Data de Nascimeto*</p>
                                <input type="date" placeholder='DD/MM/AAAA' 
                                min={dataMinima}
                                max={hoje}
                                value={form.data_nascimento} onChange={(e) => atualizar('data_nascimento', e.target.value)}
                                className={erros.data_nascimento ? 'erro' : ''}
                                />
                                {erros.data_nascimento && <span className="msg-erro">{erros.data_nascimento}</span>}
                                </label>
                    </div>
                
                <label > <p>E-mail*</p>
                    <input type="email" placeholder='exemplo@gmail.com' 
                    value={form.email} onChange={(e) => atualizar('email', e.target.value)}
                    className={erros.email ? 'erro' : ''}
                    />
                     {erros.email && <span className="msg-erro">{erros.email}</span>}
                </label>

                <label> <p>Crie sua senha*</p>
                            <input type="password" placeholder='Digite sua senha' 
                            value={form.senha} onChange={(e) => atualizar('senha', e.target.value)}
                            className={erros.senha ? 'erro' : ''}
                            />
                            {erros.senha && <span className="msg-erro">{erros.senha}</span>}
                            </label>
                    </div>

                </div>

                <div className="endereço">
                <div className="endereço-usu">
               <p>Endereço</p>
               </div>

                <label> <p>CEP*</p>
                    <input type="text" placeholder='00000-000'
                    value={form.cep} onChange={(e) => atualizar('cep', e.target.value)}
                    className={erros.cep ? 'erro' : ''}
                    />
                    {erros.cep && <span className="msg-erro">{erros.cep}</span>}
                </label>

                <div className="grupo2">
                        <label> <p>Rua/Avenida*</p>
                            <input type="text" placeholder='Rua ViaSaúde/Avenida ViaSaúde'
                            value={form.rua_aven} onChange={(e) => atualizar('rua_aven', e.target.value)}
                            className={erros.rua_aven ? 'erro' : ''}
                            />
                            {erros.rua_aven && <span className="msg-erro">{erros.rua_aven}</span>}
                            </label>
                            <label> <p>Número*</p>
                                <input type="number" placeholder='n° 1234' 
                                value={form.numero_casa} onChange={(e) => atualizar('numero_casa', e.target.value)}
                                className={erros.numero_casa ? 'erro' : ''}
                                />
                                {erros.numero_casa && <span className="msg-erro">{erros.numero_casa}</span>}
                                </label>
                    </div>

                    <label> <p>Bairro*</p>
                        <input type="text" placeholder='Nome Bairro' 
                        value={form.bairro} onChange={(e) => atualizar('bairro', e.target.value)}
                        className={erros.bairro ? 'erro' : ''}
                        />
                         {erros.bairro && <span className="msg-erro">{erros.bairro}</span>}
                    </label>

<label>
  <p>Cargo*</p>
  <div className="dropdown">
    <button
      type="button"
      className="dropdown-btn"
      onClick={() => atualizar("abrirDropdown", !form.abrirDropdown)}
    >
      {form.tipo ? form.tipo : "Selecione o cargo"}
      <span className="setinha">▼</span>
    </button>

    {form.abrirDropdown && (
      <div className="dropdown-menu">
        <div
          className="dropdown-item"
          onClick={() => setform({ ...form, tipo: "Usuário", abrirDropdown: false })}
        >
          Usuário
        </div>
        <div
          className="dropdown-item"
          onClick={() => setform({ ...form, tipo: "Solicitar Administrador", abrirDropdown: false })}
        >
          Solicitar Administrador
        </div>
      </div>
    )}
  </div>
</label>




                </div>

                <div className="doisfinais">
                    <button className='cadastrar-img' type='button' onClick={salvar} >
                        <img src= "/public/assets/images/ChatGPT_Image_7_de_nov._de_2025__00_53_06-removebg-preview.png" height={50} alt="" />
                        <h2>Cadastrar-se</h2>
                        </button>
                    <p>* Campos obrigratórios</p>
                </div>
            </div>


    </section>
    </section>
  );
}
