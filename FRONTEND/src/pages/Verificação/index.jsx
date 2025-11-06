import React, { useEffect, useState } from "react";
import MedicamentoCard from "../components/MedicamentoCard";
import "./index.scss";


export default function Verificacao() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {

    async function carregarMedicamentos() {
      const resposta = await fetch("https://api.exemplo.com/medicamentos");
      const dados = await resposta.json();

      setMedicamentos(dados); 
      setCarregando(false);
    }

    carregarMedicamentos();
  }, []);

  if (carregando) {
    return <p className="loading">⏳ Carregando informações...</p>;
  }

  return (
    <>
      <Cabecalho/>
      <div className="pagina-medicamentos">
        <h1> Estoque de Medicamentos — ViaSaúde</h1>

        <div className="cards-container">
          {medicamentos.length > 0 ? (
            medicamentos.map((item) => (
              <MedicamentoCard
                key={item.id}
                nome={item.nome}
                ubs={item.ubs}
                estoque={item.estoque}
                ultimaAtualizacao={item.ultimaAtualizacao}
               />
          ))
        ) : (
          <p>Nenhum medicamento encontrado.</p>
        )}
      </div>
    </div>
    </>
  );
}
