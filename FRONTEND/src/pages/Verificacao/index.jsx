
import React, { useEffect, useState } from "react";
import MedicamentoCard from "../../components/Cartao"; 
import Cabecalho from "../../components/Index/cabecalho";
import "./index.scss";

export default function Verificacao() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarMedicamentos() {
      try {
        const resposta = await fetch("http://localhost:6045/medicamentos/listar");

        if (!resposta.ok) {
          throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
        }

        const dados = await resposta.json();

       
        const convertidos = dados.map((item) => ({
          id: item.id,
          nome: item.nome_produto || "Sem nome",
          ubs: item.razao_social || "Não informado",
          estoque: item.estoque_produto ?? 0,
          ultimaAtualizacao: item.data_registro
            ? new Date(item.data_registro).toLocaleDateString("pt-BR")
            : "Data não informada",
          data_validade: item.situacao || "Não informada",
        }));

        setMedicamentos(convertidos);
      } catch (erro) {
        console.error("Erro ao carregar medicamentos:", erro);
        setErro("Não foi possível carregar os medicamentos. Tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    }

    carregarMedicamentos();
  }, []);

  if (carregando) {
    return (
      <>
        <Cabecalho />
        <p className="loading">⏳ Carregando informações...</p>
      </>
    );
  }

  if (erro) {
    return (
      <>
        <Cabecalho />
        <p className="erro">{erro}</p>
      </>
    );
  }

  return (
    <>
      <Cabecalho />
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
            <p className="vazio">Nenhum medicamento disponível no momento.</p>
          )}
        </div>
      </div>
    </>
  );
}
