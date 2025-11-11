// index.jsx (sem mudanças significativas, apenas para referência)
import React, { useEffect, useState } from "react";
import MedicamentoCard from "../../components/Cartao";
import Cabeçalho from "../../components/Index/cabecalho";
import "./index.scss";

export default function Verificacao() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarMedicamentos() {
      try {
        const resposta = await fetch("https://api.exemplo.com/medicamentos");
        if (!resposta.ok) {
          throw new Error("Erro na resposta da API");
        }
        const dados = await resposta.json();
        setMedicamentos(dados);
      } catch (erro) {
        console.error("Erro ao carregar medicamentos:", erro);
        // Dados mockados para demonstração
        setMedicamentos([
          {
            id: 1,
            nome: "Paracetamol",
            ubs: "UBS Centro",
            estoque: 10,
            ultimaAtualizacao: "2023-10-01",
            data_validade: "2024-12-31"
          },
          {
            id: 2,
            nome: "Ibuprofeno",
            ubs: "UBS Norte",
            estoque: 3,
            ultimaAtualizacao: "2023-10-02",
            data_validade: "2024-11-15"
          },
          {
            id: 3,
            nome: "Amoxicilina",
            ubs: "UBS Sul",
            estoque: 0,
            ultimaAtualizacao: "2023-10-03",
            data_validade: "2024-10-20"
          }
        ]);
      } finally {
        setCarregando(false);
      }
    }

    carregarMedicamentos();
  }, []);

  if (carregando) {
    return <p className="loading">⏳ Carregando informações...</p>;
  }

  return (
    <>
      <Cabeçalho />
      <div className="pagina-medicamentos">
        <h1>Estoque de Medicamentos — ViaSaúde</h1>

        <div className="cards-container">
          {medicamentos.length > 0 ? (
            medicamentos.map((item) => (
              <MedicamentoCard
                key={item.id}
                nome={item.nome}
                ubs={item.ubs}
                estoque={item.estoque}
                ultimaAtualizacao={item.ultimaAtualizacao}
                data_validade={item.data_validade}
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