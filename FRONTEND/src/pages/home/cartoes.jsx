import { useState, useEffect } from 'react';
import './cartoes.scss';

export default function InteractiveCardsSection() {
  const [activeTab, setActiveTab] = useState('consultas');
  const [consultasData, setConsultasData] = useState([]);
  const [medicosData, setMedicosData] = useState([]);
  const [medicamentosData, setMedicamentosData] = useState([]);

  const defaultConsultas = [
    {
      title: 'Clínica Geral',
      local: 'UBS centro',
      endereco: 'rua maria bla bla,151',
      horario: 'Segunda a Sexta',
      status: 'Disponível'
    },
    {
      title: 'Pediatria',
      local: 'UBS norte',
      endereco: 'av. paulo silva, 890',
      horario: 'Segunda, Quarta e Sexta',
      status: 'Disponível'
    },
    {
      title: 'Cardiologia',
      local: 'UBS sul',
      endereco: 'rua das flores, 234',
      horario: 'Terça e Quinta',
      status: 'Disponível'
    }
  ];

  const defaultMedicos = [
    {
      nome: 'Dr. João Silva',
      crm: 'CRM 12345',
      especialidade: 'Clínico Geral',
      local: 'UBS castro alves',
      endereco: 'rua maria bla bla,191',
      horario: 'Segunda, Quinta e Sexta 7h às 14h',
      status: 'Disponível'
    },
    {
      nome: 'Dra. Maria Santos',
      crm: 'CRM 67890',
      especialidade: 'Pediatra',
      local: 'UBS centro',
      endereco: 'rua principal, 456',
      horario: 'Terça e Quarta 8h às 16h',
      status: 'Disponível'
    },
    {
      nome: 'Dr. Carlos Oliveira',
      crm: 'CRM 54321',
      especialidade: 'Cardiologista',
      local: 'UBS norte',
      endereco: 'av. central, 789',
      horario: 'Segunda a Sexta 9h às 17h',
      status: 'Disponível'
    }
  ];

  const defaultMedicamentos = [
    {
      nome: 'Paracetamol 500mg',
      tipo: 'Analgésico',
      indicacao: 'Dor e febre',
      posologia: 'Conforme prescrição médica',
      status: 'Disponível'
    },
    {
      nome: 'Dipirona 500mg',
      tipo: 'Analgésico e Antipirético',
      indicacao: 'Dor e febre',
      posologia: 'Conforme prescrição médica',
      status: 'Disponível'
    },
    {
      nome: 'Losartana 50mg',
      tipo: 'Anti-hipertensivo',
      indicacao: 'Pressão alta',
      posologia: 'Conforme prescrição médica',
      status: 'Disponível'
    }
  ];

  useEffect(() => {
  loadData();
  
}, []);

 const loadData = () => {
  try {
    const consultasStorage = localStorage.getItem('consultas-data');
    const medicosStorage = localStorage.getItem('medicos-data');
    const medicamentosStorage = localStorage.getItem('medicamentos-data');

    const consultas = consultasStorage ? JSON.parse(consultasStorage) : defaultConsultas;
    const medicos = medicosStorage ? JSON.parse(medicosStorage) : defaultMedicos;
    const medicamentos = medicamentosStorage ? JSON.parse(medicamentosStorage) : defaultMedicamentos;

    
    
    setConsultasData(consultas);
    setMedicosData(medicos);
    setMedicamentosData(medicamentos);
  } catch (error) {
    console.error('Erro ao carregar:', error);
    setConsultasData(defaultConsultas);
    setMedicosData(defaultMedicos);
    setMedicamentosData(defaultMedicamentos);
  }
};

  return (
    <div className="interactive-section">

       

      <div className="tab-buttons">
        <button 
          className={`tab-btn ${activeTab === 'consultas' ? 'active' : ''}`}
          onClick={() => setActiveTab('consultas')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          Consultas Disponíveis
        </button>
        
        <button 
          className={`tab-btn ${activeTab === 'medicos' ? 'active' : ''}`}
          onClick={() => setActiveTab('medicos')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Médicos disponíveis
        </button>
        
        <button 
          className={`tab-btn ${activeTab === 'medicamentos' ? 'active' : ''}`}
          onClick={() => setActiveTab('medicamentos')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 3v18"/>
            <path d="M15 3v18"/>
          </svg>
          Medicamentos disponíveis
        </button>
      </div>

      {activeTab === 'consultas' && (
        <div className="cards-container">
          <div className="alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p>Para agendar, compareça à unidade com documento de identidade e cartão SUS</p>
          </div>
          
          {consultasData.map((consulta, index) => (
            <div key={index} className="info-card">
              <div className="card-header">
                <h3>{consulta.title}</h3>
                <span className={`status-badge ${consulta.status === 'Disponível' ? 'disponivel' : 'indisponivel'}`}>
                    {consulta.status}
                </span>
              </div>
              <div className="card-body">
                <div className="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <strong>{consulta.local}</strong>
                    <p>{consulta.endereco}</p>
                  </div>
                </div>
                <div className="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <p>{consulta.horario}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {activeTab === 'medicos' && (
        <div className="cards-container">
          {medicosData.map((medico, index) => (
            <div key={index} className="info-card">
              <div className="card-header">
                <div className="doctor-info">
                  <div className="doctor-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <h3>{medico.nome}</h3>
                    <p className="crm">{medico.crm}</p>
                  </div>
                </div>
                <span className={`status-badge ${medico.status === 'Disponível' ? 'disponivel' : 'indisponivel'}`}>
                    {medico.status}
                </span>
              </div>
              <div className="card-body">
                <div className="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <strong>{medico.local}</strong>
                    <p>{medico.endereco}</p>
                  </div>
                </div>
                <div className="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <p>{medico.horario}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'medicamentos' && (
        <div className="cards-container">
          <div className="alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p><strong>Importante:</strong> Para retirar medicamentos, é necessário apresentar receita médica válida, documento de identidade e cartão SUS na farmácia da unidade de saúde.</p>
          </div>
          
          {medicamentosData.map((medicamento, index) => (
            <div key={index} className="info-card">
              <div className="card-header">
                <div className="medicine-info">
                  <div className="medicine-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M9 3v18"/>
                      <path d="M15 3v18"/>
                    </svg>
                  </div>
                  <div>
                    <h3>{medicamento.nome}</h3>
                    <p className="tipo">{medicamento.tipo}</p>
                  </div>
                </div>
                <span className={`status-badge ${medicamento.status === 'Disponível' ? 'disponivel' : 'indisponivel'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
                </svg>
                {medicamento.status}
                    </span>
              </div>
              <div className="card-body">
                <div className="medicine-details">
                  <div>
                    <strong>Indicação:</strong>
                    <p>{medicamento.indicacao}</p>
                  </div>
                  <div>
                    <strong>Posologia:</strong>
                    <p>{medicamento.posologia}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}