import React, { useState } from 'react';
import './index.scss'; // Assumindo que o SCSS contém estilos para .header, .filters, etc., como no exemplo anterior

export default function Form() {
  // Estados para os filtros
  const [dia, setDia] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [medico, setMedico] = useState('');
  
  // Estado para os resultados (simulados; em produção, busque de uma API)
  const [resultados, setResultados] = useState([
    { id: 1, medico: 'Dr. Silva', especialidade: 'Cardiologia', horario: '10:00', data: '15/10/2023' },
    { id: 2, medico: 'Dra. Santos', especialidade: 'Dermatologia', horario: '14:00', data: '16/10/2023' },
  ]);

  // Função para aplicar filtros (simples; substitua por lógica real)
  const aplicarFiltros = () => {
    // Exemplo: Filtrar resultados baseados nos valores selecionados
    const filtrados = resultados.filter(item => {
      return (
        (!dia || item.data === dia) &&
        (!especialidade || item.especialidade.toLowerCase().includes(especialidade.toLowerCase())) &&
        (!medico || item.medico.toLowerCase().includes(medico.toLowerCase()))
      );
    });
    setResultados(filtrados); // Atualiza a lista (ou faça uma requisição)
    alert(`Filtros aplicados: Dia=${dia}, Especialidade=${especialidade}, Médico=${medico}`);
  };

  return (
    <div>
      {/* Cabeçalho com Filtros */}
      <div className="header">
        <h2>Filtros de Agendamento</h2>
        <div className="filters">
          <div className="filter">
            <label htmlFor="dia">Dia da Consulta:</label>
            <input
              type="date"
              id="dia"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
            />
          </div>
          <div className="filter">
            <label htmlFor="especialidade">Especialidade Médica:</label>
            <select
              id="especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="cardiologia">Cardiologia</option>
              <option value="dermatologia">Dermatologia</option>
              <option value="ortopedia">Ortopedia</option>
              {/* Adicione mais opções */}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="medico">Médico que vai Atender:</label>
            <select
              id="medico"
              value={medico}
              onChange={(e) => setMedico(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="dr_silva">Dr. Silva (Cardiologia)</option>
              <option value="dra_santos">Dra. Santos (Dermatologia)</option>
              <option value="dr_oliveira">Dr. Oliveira (Ortopedia)</option>
              {/* Adicione mais opções */}
            </select>
          </div>
        </div>
        <button onClick={aplicarFiltros}>Aplicar Filtros</button>
      </div>

      {/* Resultados Abaixo do Cabeçalho */}
      <div className="results">
        <h3>Resultados</h3>
        {resultados.length > 0 ? (
          resultados.map((item) => (
            <div key={item.id} className="result-item">
              Consulta com {item.medico} em {item.especialidade} - {item.horario}, {item.data}
            </div>
          ))
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
}
