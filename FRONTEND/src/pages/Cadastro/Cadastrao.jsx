import { useState } from 'react';
import api from '../../axios.js';
import { useNavigate } from 'react-router';
import './Cadastrao.scss';
import CabecalhoCadastro from '../../components/Cadastro/cabecalhoCadastro';

export default function Cadastro() {
  const navigate = useNavigate();

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
    bairro: ''
  });

  function atualizar(campo, valor) {
    setform({ ...form, [campo]: valor });
  }

  async function salvar() {
    const dataNasc = new Date(form.data_nascimento);
    const dataMin = new Date(dataMinima);
    const dataMax = new Date();

    if (dataNasc < dataMin || dataNasc > dataMax) {
      alert("Data de nascimento inválida!");
      return;
    }

    await api.post('/usuarios', form);
    alert('Usuário cadastrado com sucesso!');
    navigate('/');
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

          {/* Inputs */}
          <div className='inputs'>
            <input placeholder='Nome completo' value={form.nome_completo} onChange={e => atualizar('nome_completo', e.target.value)} />
            <input placeholder='CPF' value={form.cpf} onChange={e => atualizar('cpf', e.target.value)} />
            <input type='date' value={form.data_nascimento} max={hoje} onChange={e => atualizar('data_nascimento', e.target.value)} />
            <input placeholder='E-mail' value={form.email} onChange={e => atualizar('email', e.target.value)} />
            <input type='password' placeholder='Senha' value={form.senha} onChange={e => atualizar('senha', e.target.value)} />
            <input placeholder='CEP' value={form.cep} onChange={e => atualizar('cep', e.target.value)} />
            <input placeholder='Rua' value={form.rua} onChange={e => atualizar('rua', e.target.value)} />
            <input placeholder='Número' value={form.numero} onChange={e => atualizar('numero', e.target.value)} />
            <input placeholder='Bairro' value={form.bairro} onChange={e => atualizar('bairro', e.target.value)} />
          </div>

          <div className='doisfinais'>
            <button className='cadastrar-img' type='button' onClick={salvar}>
              <img src='/public/assets/images/ChatGPT_Image_7_de_nov._de_2025__00_53_06-removebg-preview.png' height={50} alt='' />
              <h2>Cadastrar-se</h2>
            </button>
            <p>* Campos obrigatórios</p>
          </div>
        </div>
      </section>
    </section>
  );
}
