import { useEffect, useState } from 'react';
import api from '../../axios';
import { useNavigate } from 'react-router';
import './Cadastrao.scss';                           
import CabecalhoCadastro from '../../components/Cadastro/cabecalhoCadastro';

export default function Cadastro() {
   return (
    <>
    <div className="Container">

        <CabecalhoCadastro />

        <h1>tenstando</h1>
    </div>
    </>
   ) 
}