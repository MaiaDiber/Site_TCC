import { useNavigate } from 'react-router';
import './Horarios.scss'
import { Link } from 'react-router';


export default function Horarios() {
 const navigate = useNavigate()

  return (
    <div className="page-container">
      <header className="header">
        <img src="/public/assets/images/logo_ViaSaúde.png" alt="Vicenteof Logo" height={150} className="logo" />

        <Link className="voltar" onClick={() => navigate(-1)}>
            ← Voltar
        </Link>
        
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="clock-icon"></div>
          <h1 className="page-title">Horários de Atendimento</h1>
          <p className="subtitle">Informações sobre funcionamento das Unidades Básicas de Saúde (UBS)</p>
        </section>

        <div className="date-info">
          <span className="calendar-icon"></span>
          <div>
            <div className="date">Sábado, 09/11/2025</div>
            <div className="time">Horário atual: 16:18</div>
          </div>
        </div>

        <div className="alert-box">
          <span className="alert-icon"></span>
          <div className="alert-content">
            <strong>Atenção:</strong> Os horários apresentados são exemplos típicos de funcionamento das UBS no Brasil.
            Para consultar o horário exato da sua unidade de saúde, entre em contato diretamente com a UBS, ligue para a
            Secretaria Municipal de Saúde do seu município ou acesse o site da prefeitura.
          </div>
        </div>

        <section className="schedule-section">
          <h2 className="section-title">Horários Típicos de Funcionamento das UBS</h2>
          
          <div className="schedule-card">
            <div className="card-header">
              <h3>Horário Padrão</h3>
              <span className="badge">MAIS COMUM NO PAÍS</span>
            </div>
            <p className="card-subtitle">Maioria das Unidades Básicas de Saúde</p>
            
            <div className="schedule-item">
              <span className="icon"></span>
              <div>
                <strong>Segunda a Sexta-feira:</strong> 7:00 às 17:00
              </div>
            </div>
            
            <div className="schedule-item">
              <span className="icon"></span>
              <div>
                <strong>Sábados, Domingos e Feriados:</strong> Fechado
              </div>
            </div>

            <div className="info-box">
              <span className="info-icon">ℹ️</span>
              <p>Este é o horário de funcionamento mais comum nas UBS. A distribuição de senhas geralmente inicia às 7h ou quando a unidade abre. Recomenda-se chegar cedo.</p>
            </div>
          </div>

          <div className="schedule-card">
            <div className="card-header">
              <h3>Horário Estendido</h3>
              <span className="badge">DISPONÍVEL</span>
            </div>
            <p className="card-subtitle">Algumas unidades em municípios maiores</p>
            
            <div className="schedule-item">
              <span className="icon"></span>
              <div>
                <strong>Segunda a Sexta-feira:</strong> 7:00 às 19:00
              </div>
            </div>
            
            <div className="schedule-item">
              <span className="icon"></span>
              <div>
                <strong>Sábados, Domingos e Feriados:</strong> Fechado
              </div>
            </div>

            <div className="info-box">
              <span className="info-icon">ℹ️</span>
              <p>Algumas UBS funcionam em horário estendido para atender melhor a população. Verifique se há unidades com esse horário em seu município.</p>
            </div>
          </div>

          <div className="schedule-card">
            <div className="card-header">
              <h3>Algumas UBS com Atendimento aos Sábados</h3>
              <span className="badge">DISPONÍVEL</span>
            </div>
            <p className="card-subtitle">Iniciativa de alguns municípios</p>
            
            <div className="schedule-item">
              <span className="icon"></span>
              <div>
                <strong>Segunda a Sexta-feira:</strong> 7:00 às 17:00
              </div>
            </div>
            
            <div className="schedule-item">
              <span className="icon"></span>
              <div>
                <strong>Sábado:</strong> 8:00 às 12:00
              </div>
            </div>
            
            <div className="schedule-item">
              <span className="icon"></span>
              <div>
                <strong>Domingos e Feriados:</strong> Fechado
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-title">Informações Importantes</h2>
          
          <div className="info-card">
            <span className="info-number">ℹ️</span>
            <div>
              <strong>Distribuição de senhas:</strong> As senhas para atendimento são distribuídas no início do expediente (geralmente a partir das 7h). É importante chegar cedo para garantir o atendimento, pois o número de senhas é limitado.
            </div>
          </div>

          <div className="info-card">
            <span className="info-number">ℹ️</span>
            <div>
              <strong>Documentos necessários:</strong> Sempre leve seu Cartão Nacional do SUS (CNS), documento de identidade com foto (RG ou CNH) e comprovante de residência atualizado.
            </div>
          </div>

          <div className="info-card">
            <span className="info-number">ℹ️</span>
            <div>
              <strong>Feriados nacionais e municipais:</strong> As Unidades Básicas de Saúde não funcionam em feriados. Para emergências, procure o serviço de Pronto Atendimento mais próximo (UPA, Pronto Socorro).
            </div>
          </div>

          <div className="info-card">
            <span className="info-number">ℹ️</span>
            <div>
              <strong>Atendimento prioritário:</strong> Têm direito ao atendimento prioritário: idosos (60 anos ou mais), gestantes, lactantes (mulheres amamentando), pessoas com crianças de colo e pessoas com deficiência.
            </div>
          </div>

          <div className="info-card">
            <span className="info-number">ℹ️</span>
            <div>
              <strong>Consultas agendadas:</strong> Muitas UBS trabalham com sistema de agendamento para consultas eletivas. Consulte na sua unidade como funciona o sistema de agendamento.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}