import React, { useState } from 'react';
import './index.scss'; 

export default function Form() {
 
  const [dia, setDia] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [medico, setMedico] = useState('');
  
  
  const [resultados, setResultados] = useState([
    { id: 1, medico: 'Dr. Silva', especialidade: 'Cardiologia', horario: '10:00', data: '15/10/2023' },
    { id: 2, medico: 'Dra. Santos', especialidade: 'Dermatologia', horario: '14:00', data: '16/10/2023' },
  ]);

  
  const aplicarFiltros = () => {
    
    const filtrados = resultados.filter(item => {
      return (
        (!dia || item.data === dia) &&
        (!especialidade || item.especialidade.toLowerCase().includes(especialidade.toLowerCase())) &&
        (!medico || item.medico.toLowerCase().includes(medico.toLowerCase()))
      );
    });
    setResultados(filtrados); 
    alert(`Filtros aplicados: Dia=${dia}, Especialidade=${especialidade}, Médico=${medico}`);
  };

  return (
    <div>
      
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
              
            </select>
          </div>
        </div>
        <button onClick={aplicarFiltros}>Aplicar Filtros</button>
      </div>

     
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
