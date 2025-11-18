import React, { useEffect, useState } from "react";
import MedicamentoCard from "../../components/Cartao/index"; 
import Cabecalho from "../../components/Index/cabecalho";
import "./index.scss";

export default function Verificacao() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamentosFiltrados, setMedicamentosFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
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

        // DEBUG: Verifique a estrutura dos dados
        console.log("Dados da API:", dados);
        if (dados.length > 0) {
          console.log("Primeiro medicamento:", dados[0]);
          console.log("Data registro:", dados[0].data_registro);
          console.log("Data validade:", dados[0].data_validade);
        }

        const medicamentosConvertidos = dados.map(item => ({
          id: item.id,
          nome: item.nome_produto,
          estoque: Number(item.estoque_total ?? 0),
          ubs: Array.isArray(item.unidades) && item.unidades.length > 0
               ? item.unidades.map(u => u.nome_unidade).join(", ")
               : "Nenhuma unidade disponível",
          ultimaAtualizacao: item.data_registro
            ? new Date(item.data_registro).toLocaleDateString("pt-BR")
            : "Não informado",
          data_validade: item.data_validade
            ? new Date(item.data_validade).toLocaleDateString("pt-BR")
            : "Não informado"
        }));

        console.log("Medicamentos convertidos:", medicamentosConvertidos);

        setMedicamentos(medicamentosConvertidos);
        setMedicamentosFiltrados(medicamentosConvertidos); // Inicialmente mostra todos

      } catch (erro) {
        console.error("Erro ao carregar medicamentos:", erro);
        setErro("Não foi possível carregar os medicamentos. Tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    }

    carregarMedicamentos();
  }, []);

  // Função para filtrar medicamentos em tempo real
  useEffect(() => {
    if (termoPesquisa.trim() === "") {
      setMedicamentosFiltrados(medicamentos);
    } else {
      const filtrados = medicamentos.filter(medicamento =>
        medicamento.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
      );
      setMedicamentosFiltrados(filtrados);
    }
  }, [termoPesquisa, medicamentos]);

  const handlePesquisaChange = (event) => {
    setTermoPesquisa(event.target.value);
  };

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

        {/* Barra de Pesquisa */}
        <div className="barra-pesquisa">
          <input
            type="text"
            placeholder="🔍 Pesquisar medicamento por nome..."
            value={termoPesquisa}
            onChange={handlePesquisaChange}
            className="input-pesquisa"
          />
          {termoPesquisa && (
            <span className="contador-resultados">
              {medicamentosFiltrados.length} medicamento(s) encontrado(s)
            </span>
          )}
        </div>

        <div className="cards-container">
          {medicamentosFiltrados.length > 0 ? (
            medicamentosFiltrados.map((item) => (
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
            <div className="nenhum-resultado">
              <p>Nenhum medicamento encontrado para "<strong>{termoPesquisa}</strong>"</p>
              <button 
                onClick={() => setTermoPesquisa("")}
                className="btn-limpar-pesquisa"
              >
                Limpar pesquisa
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}