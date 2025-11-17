import { useState, useEffect } from 'react';
import CabecalhoAdmin from '../../components/Index/AdminCabecalho';
import Rodape from '../../components/Index/rodape';
import ComponenteAcessibilidade from '../Cadastro/Acessibilidade';
import './crud.scss';

export default function AdminCRUD() {
  const [activeTab, setActiveTab] = useState('consultas');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingIndex, setEditingIndex] = useState(null);

  const [consultasData, setConsultasData] = useState([]);
  const [medicosData, setMedicosData] = useState([]);
  const [medicamentosData, setMedicamentosData] = useState([]);

  const [formData, setFormData] = useState({});

  
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
    }
  ];

  const defaultMedicamentos = [
    {
      nome: 'Paracetamol 500mg',
      tipo: 'Analgésico',
      indicacao: 'Dor e febre',
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

      setConsultasData(consultasStorage ? JSON.parse(consultasStorage) : defaultConsultas);
      setMedicosData(medicosStorage ? JSON.parse(medicosStorage) : defaultMedicos);
      setMedicamentosData(medicamentosStorage ? JSON.parse(medicamentosStorage) : defaultMedicamentos);
    } catch (error) {
      console.error('Erro ao carregar:', error);
      setConsultasData(defaultConsultas);
      setMedicosData(defaultMedicos);
      setMedicamentosData(defaultMedicamentos);
    }
  };

 const saveData = (type, data) => {
  try {
    localStorage.setItem(`${type}-data`, JSON.stringify(data));
    alert('Dados salvos com sucesso!');
    window.dispatchEvent(new Event('storage-update'));
  } catch (error) {
    console.error('Erro ao salvar:', error);
    alert('Erro ao salvar dados');
  }
};

  const handleAdd = () => {
    setModalMode('add');
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setModalMode('edit');
    setEditingIndex(index);
    
    let data;
    if (activeTab === 'consultas') data = consultasData[index];
    else if (activeTab === 'medicos') data = medicosData[index];
    else data = medicamentosData[index];
    
    setFormData(data);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
    
    if (activeTab === 'consultas') {
      const newData = consultasData.filter((_, i) => i !== index);
      setConsultasData(newData);
      saveData('consultas', newData);
    } else if (activeTab === 'medicos') {
      const newData = medicosData.filter((_, i) => i !== index);
      setMedicosData(newData);
      saveData('medicos', newData);
    } else {
      const newData = medicamentosData.filter((_, i) => i !== index);
      setMedicamentosData(newData);
      saveData('medicamentos', newData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'consultas') {
      let newData;
      if (modalMode === 'add') {
        newData = [...consultasData, formData];
      } else {
        newData = consultasData.map((item, i) => i === editingIndex ? formData : item);
      }
      setConsultasData(newData);
      saveData('consultas', newData);
    } else if (activeTab === 'medicos') {
      let newData;
      if (modalMode === 'add') {
        newData = [...medicosData, formData];
      } else {
        newData = medicosData.map((item, i) => i === editingIndex ? formData : item);
      }
      setMedicosData(newData);
      saveData('medicos', newData);
    } else {
      let newData;
      if (modalMode === 'add') {
        newData = [...medicamentosData, formData];
      } else {
        newData = medicamentosData.map((item, i) => i === editingIndex ? formData : item);
      }
      setMedicamentosData(newData);
      saveData('medicamentos', newData);
    }
    
    setShowModal(false);
    setFormData({});
  };

  const renderForm = () => {
    if (activeTab === 'consultas') {
      return (
        <>
          <div className="form-group">


            <label>Especialidade *</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Local *</label>
            <input
              type="text"
              value={formData.local || ''}
              onChange={(e) => setFormData({...formData, local: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Endereço *</label>
            <input
              type="text"
              value={formData.endereco || ''}
              onChange={(e) => setFormData({...formData, endereco: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Horário *</label>
            <input
              type="text"
              value={formData.horario || ''}
              onChange={(e) => setFormData({...formData, horario: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Status *</label>
            <select
              value={formData.status || 'Disponível'}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option>Disponível</option>
              <option>Indisponível</option>
            </select>
          </div>
        </>
      );
    } else if (activeTab === 'medicos') {
      return (
        <>
          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              value={formData.nome || ''}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>CRM *</label>
            <input
              type="text"
              value={formData.crm || ''}
              onChange={(e) => setFormData({...formData, crm: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Especialidade *</label>
            <input
              type="text"
              value={formData.especialidade || ''}
              onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Local *</label>
            <input
              type="text"
              value={formData.local || ''}
              onChange={(e) => setFormData({...formData, local: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Endereço *</label>
            <input
              type="text"
              value={formData.endereco || ''}
              onChange={(e) => setFormData({...formData, endereco: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Horário *</label>
            <input
              type="text"
              value={formData.horario || ''}
              onChange={(e) => setFormData({...formData, horario: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Status *</label>
            <select
              value={formData.status || 'Disponível'}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option>Disponível</option>
              <option>Indisponível</option>
            </select>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="form-group">
            <label>Nome do Medicamento *</label>
            <input
              type="text"
              value={formData.nome || ''}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Tipo *</label>
            <input
              type="text"
              value={formData.tipo || ''}
              onChange={(e) => setFormData({...formData, tipo: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Indicação *</label>
            <input
              type="text"
              value={formData.indicacao || ''}
              onChange={(e) => setFormData({...formData, indicacao: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Posologia *</label>
            <input
              type="text"
              value={formData.posologia || ''}
              onChange={(e) => setFormData({...formData, posologia: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Status *</label>
            <select
              value={formData.status || 'Disponível'}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option>Disponível</option>
              <option>Indisponível</option>
            </select>
          </div>
        </>
      );
    }
  };

  const currentData = activeTab === 'consultas' ? consultasData : 
                      activeTab === 'medicos' ? medicosData : medicamentosData;

  return (
    <>

    
             <div style={{
                                            position: 'fixed',
                                            top: '20px',
                                            right: '20px',
                                            zIndex: 1000
                                        }}>
                                            <ComponenteAcessibilidade />
                                        </div>
      <CabecalhoAdmin />
      
      <div className="admin-page">
        <div className="admin-header">
          <h1>Painel Administrativo</h1>
          <p>Gerencie consultas, médicos e medicamentos</p>
        </div>

        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'consultas' ? 'active' : ''}`}
            onClick={() => setActiveTab('consultas')}
          >
            📋 Consultas
          </button>
          <button 
            className={`admin-tab ${activeTab === 'medicos' ? 'active' : ''}`}
            onClick={() => setActiveTab('medicos')}
          >
            👨‍⚕️ Médicos
          </button>
          <button 
            className={`admin-tab ${activeTab === 'medicamentos' ? 'active' : ''}`}
            onClick={() => setActiveTab('medicamentos')}
          >
            💊 Medicamentos
          </button>
        </div>

        <div className="admin-controls">
          <button className="add-button" onClick={handleAdd}>
            + Adicionar Novo
          </button>
        </div>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                {activeTab === 'consultas' && (
                  <>
                    <th>Especialidade</th>
                    <th>Local</th>
                    <th>Endereço</th>
                    <th>Horário</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </>
                )}
                {activeTab === 'medicos' && (
                  <>
                    <th>Nome</th>
                    <th>CRM</th>
                    <th>Especialidade</th>
                    <th>Local</th>
                    <th>Horário</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </>
                )}
                {activeTab === 'medicamentos' && (
                  <>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Indicação</th>
                    <th>Posologia</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  {activeTab === 'consultas' && (
                    <>
                      <td>{item.title}</td>
                      <td>{item.local}</td>
                      <td>{item.endereco}</td>
                      <td>{item.horario}</td>
                      <td>
                        <span className={`status-badge ${item.status === 'Disponível' ? 'disponivel' : 'indisponivel'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEdit(index)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️</button>
                      </td>
                    </>
                  )}
                  {activeTab === 'medicos' && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.crm}</td>
                      <td>{item.especialidade}</td>
                      <td>{item.local}</td>
                      <td>{item.horario}</td>
                      <td>
                        <span className={`status-badge ${item.status === 'Disponível' ? 'disponivel' : 'indisponivel'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEdit(index)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️</button>
                      </td>
                    </>
                  )}
                  {activeTab === 'medicamentos' && (
                    <>
                      <td>{item.nome}</td>
                      <td>{item.tipo}</td>
                      <td>{item.indicacao}</td>
                      <td>{item.posologia}</td>
                      <td>
                        <span className={`status-badge ${item.status === 'Disponível' ? 'disponivel' : 'indisponivel'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEdit(index)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalMode === 'add' ? 'Adicionar' : 'Editar'} {
              activeTab === 'consultas' ? 'Consulta' :
              activeTab === 'medicos' ? 'Médico' : 'Medicamento'
            }</h2>
            <form onSubmit={handleSubmit}>
              {renderForm()}
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                  Cancelar
                </button>
                <button type="submit" className="submit-btn">
                  {modalMode === 'add' ? 'Adicionar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Rodape />
    </>
  );
}