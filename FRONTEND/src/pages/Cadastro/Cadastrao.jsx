import { useEffect, useState } from 'react';
import api from '../../axios.js';
import { useNavigate } from 'react-router';
import './Cadastrao.scss';                           
import CabecalhoCadastro from '../../components/Cadastro/cabecalhoCadastro';

export default function Cadastro() {
   return (
    <>
    <section className='all'>
    <section className="Container">

        <CabecalhoCadastro />


    </section>
    </section>
    </>
   ) 
}