import { useEffect, useState } from 'react';
import api from '../../axios.js';
import { useNavigate } from 'react-router';
import './Cadastrao.scss';                           
import CabecalhoCadastro from '../../components/Cadastro/cabecalhoCadastro';


export default function Cadastro() {

    const navigate = useNavigate()

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
        setform({...form, [campo]: valor});
     }

     async function salvar() {
        try {

           const dataNasc = new Date(form.data_nascimento);
           const dataMin = new Date(dataMinima);
           const dataMax = new Date();

           if (dataNasc < dataMin || dataNasc > dataMax){
            alert("Data de nascimento invalida!");
            return;
           }

            await api.post('/inserir', form);
            alert('Usuario cadastrado com sucesso!');
            setform({
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

            navigate('/')
            } catch (erro) {
      console.error(erro);
      alert('Erro ao cadastrar usuário.');
        }
     }

   return (
    <>
    <section className='all'>
    <section className="Container">

        <CabecalhoCadastro />


            <div className="primeiroP">
                <p>Preencha os dados abaixo para agilizar seu atendimento na unidade de saúde</p>
            </div>

            <div className="informação-usuário">
               <div className="dados-usu">
               <p>Dados pessoais</p>
               </div>

                <div className="dados">
                    <label>  <p>Nome Completo*</p>
                        <input type="text" placeholder='Nome Completo'
                        value={form.nome_completo} onChange={(e) => atualizar('nome_completo', e.target.value)}
                        />
                    </label>

                    <div className="grupo1">
                        <label> <p>CPF*</p>
                            <input type="text" placeholder='000.000.000-00' 
                            value={form.cpf} onChange={(e) => atualizar('cpf',e.target.value)}
                            />
                            </label>
                            <label> <p>Data de Nascimeto*</p>
                                <input type="date" placeholder='DD/MM/AAAA' 
                                min={dataMinima}
                                max={hoje}
                                value={form.data_nascimento} onChange={(e) => atualizar('data_nascimento', e.target.value)}
                                />
                                </label>
                    </div>
                
                <label > <p>E-mail*</p>
                    <input type="email" placeholder='exemplo@gmail.com' 
                    value={form.email} onChange={(e) => atualizar('email', e.target.value)}
                    />
                </label>

                <label> <p>Crie sua senha*</p>
                            <input type="password" placeholder='Digite sua senha' 
                            value={form.senha} onChange={(e) => atualizar('senha', e.target.value)}
                            />
                            </label>
                </div>

                <div className="endereço">
                <div className="endereço-usu">
               <p>Endereço</p>
               </div>

                <label> <p>CEP*</p>
                    <input type="text" placeholder='00000-000'
                    value={form.cep} onChange={(e) => atualizar('cep', e.target.value)}
                    />
                </label>

                <div className="grupo2">
                        <label> <p>Rua/Avenida*</p>
                            <input type="text" placeholder='Rua ViaSaúde/Avenida ViaSaúde'
                            value={form.rua} onChange={(e) => atualizar('rua', e.target.value)}
                            />
                            </label>
                            <label> <p>Número*</p>
                                <input type="number" placeholder='n° 1234' 
                                value={form.numero} onChange={(e) => atualizar('numero', e.target.value)}
                                />
                                </label>
                    </div>

                    <label> <p>Bairro*</p>
                        <input type="text" placeholder='Nome Bairro' 
                        value={form.bairro} onChange={(e) => atualizar('bairro', e.target.value)}
                        />
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
    </>
   ) 
}