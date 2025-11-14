import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Header from '../Vacinacao/Header';
import './Horarios.scss'
import { Link } from 'react-router';


export default function Horarios() {
 const navigate = useNavigate()


 function DataHora() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  return (
    <div style={{
      
    }} >
      <p style={{
        textAlign: "center",
        fontFamily: 'Arial',
        color: "#151546",
        fontWeight: "bold"

        }} >Data: {agora.toLocaleDateString("pt-BR")}</p>
      <p style={{
        textAlign: "center",
        fontFamily: 'Arial',
        color: "#151546",
        fontWeight: "bold"

        }}>Hora: {agora.toLocaleTimeString("pt-BR")}</p>
    </div>
  );
}

  useEffect(() => {
     const existingMap = L.DomUtil.get("map");
     if (existingMap != null) existingMap._leaflet_id = null;
 
     const map = L.map("map", {
       center: [-23.65, -46.63],
       zoom: 12,
       minZoom: 11,
       maxZoom: 18,
       zoomControl: true,
       scrollWheelZoom: true,
       dragging: true,
     });
 
     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
       attribution:
         '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
     }).addTo(map);
 
     const bounds = L.latLngBounds([-23.74, -46.80], [-23.58, -46.50]);
     map.setMaxBounds(bounds);
     map.on("drag", () => map.panInsideBounds(bounds, { animate: false }));
 
     const ubsList = [
       { nome: "UBS Jardim São Luís", coords: [-23.6662, -46.7371], info: "💉 Campanha de vacinação contra dengue ativa." },
       { nome: "UBS Capão Redondo", coords: [-23.6528, -46.7743], info: "🩺 Atendimento ampliado aos sábados." },
       { nome: "UBS Campo Limpo", coords: [-23.6375, -46.7567], info: "💉 Vacinação infantil até 17h." },
       { nome: "UBS Santo Amaro", coords: [-23.6499, -46.7066], info: "🩹 Campanhas finalizadas, aguardando novas datas." },
       { nome: "UBS Vila Andrade", coords: [-23.6215, -46.7312], info: "💉 Nova campanha contra gripe!" },
     ];
 
     ubsList.forEach((ubs) => {
       L.marker(ubs.coords).addTo(map).bindPopup(`<b>${ubs.nome}</b><br>${ubs.info}`);
     });
 
     const group = L.featureGroup(ubsList.map((u) => L.marker(u.coords)));
     map.fitBounds(group.getBounds(), { padding: [20, 20] });
 
     let userMarker = null;
 
     if (navigator.geolocation) {
       navigator.geolocation.watchPosition(
         (pos) => {
           const { latitude, longitude } = pos.coords;
           const userLatLng = [latitude, longitude];
 
           if (!userMarker) {
             const userIcon = L.icon({
               iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
               iconSize: [32, 32],
               iconAnchor: [16, 32],
             });
             userMarker = L.marker(userLatLng, { icon: userIcon })
               .addTo(map)
               .bindPopup("📍 Você está aqui")
               .openPopup();
 
             map.setView(userLatLng, 14);
           } else {
             userMarker.setLatLng(userLatLng);
           }
         },
         (err) => {
           console.warn("Erro ao obter localização:", err.message);
         },
         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
       );
     }
   }, []);

  return (
    <div className="page-container">
      <Header />

      <section className="map-section">
        <h2 className="map-title">UBS da Zona Sul de São Paulo</h2>
        <div id="map" className="map-container"></div>
      </section>

      <main className="main-content">
        

        <div className="date-info">
          <span className="calendar-icon"></span>
          <div>
            <DataHora />
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