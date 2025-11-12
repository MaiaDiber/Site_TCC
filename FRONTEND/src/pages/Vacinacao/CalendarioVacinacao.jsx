
import Header from './Header.jsx';
import VaccineCard from "./VaccineCard.jsx";
import InfoBox from "./InfoBox.jsx";
import "./calendario.scss";
import { useEffect } from "react";
import ComponenteAcessibilidade from '../Cadastro/Acessibilidade.jsx';
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function CalendarioVacinacao() {
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
    <div className="calendario-container">

         <div style={{
          position: 'fixed',
       top: '20px',
         right: '20px',
         zIndex: 1000
         }}>
        <ComponenteAcessibilidade />
        </div>

      <Header />

      
      <section className="map-section">
        <h2 className="map-title">UBS da Zona Sul de São Paulo</h2>
        <div id="map" className="map-container"></div>
      </section>

      
      <section className="hero">
        <h2>Calendário Nacional de Vacinação</h2>
        <p>Vacinas disponíveis gratuitamente no SUS</p>
      </section>

      
      <InfoBox
        type="alert"
        title="Importante"
        content="Leve seu Cartão Nacional de Vacinação (ou Caderneta de Vacinação) e documento de identidade com CPF. Todas as vacinas do Calendário Nacional são oferecidas gratuitamente nas UBS do SUS. Consulte a unidade mais próxima para verificar disponibilidade e horários."
      />

      
      <section className="vacinas-section">
        <h3>Vacinas para Adolescentes, Adultos e Idosos</h3>
        <div className="vacina-grid">
          <VaccineCard title="Hepatite B" status="Rotina" publico="Todas as faixas etárias" info="Esquema de 3 doses. Disponível em todas as UBS." />
          <VaccineCard title="Febre Amarela" status="Rotina" publico="A partir de 9 meses de idade" info="Dose única. Recomendada para residentes ou viajantes em áreas com risco." />
          <VaccineCard title="Tríplice Viral (Sarampo, Caxumba e Rubéola)" status="Rotina" publico="Crianças e adultos até 49 anos" info="Duas doses. Comprovação por meio da Caderneta de Vacinação." />
          <VaccineCard title="dT (Difteria e Tétano) ou dTpa" status="Rotina" publico="A partir de 7 anos" info="Reforço a cada 10 anos. Gestantes devem realizar a partir da 20ª semana." />
          <VaccineCard title="Influenza (Gripe)" status="Campanha anual" publico="Grupos prioritários" info="Idosos, gestantes, puérperas, crianças de 6m a 5a, profissionais da saúde e outros." />
          <VaccineCard title="COVID-19" status="Rotina" publico="Toda a população a partir de 6 meses" info="Esquema vacinal conforme faixas etárias e doses anteriores." />
        </div>
      </section>

      
      <section className="vacinas-section">
        <h3>Vacinas Infantis (0 a 10 anos)</h3>
        <div className="vacina-grid">
          <VaccineCard title="BCG" status="Ao nascer" info="Previne formas graves de tuberculose." />
          <VaccineCard title="Hepatite B" status="Ao nascer" info="Primeira dose nas 24 horas de vida." />
          <VaccineCard title="Pentavalente (DTP, Hib, Hepatite B)" status="Rotina infantil" info="Protege contra difteria, tétano, coqueluche, Haemophilus e hepatite B." />
          <VaccineCard title="Rotavírus" status="Rotina infantil" info="Protege contra diarreias por rotavírus." />
        </div>
      </section>

      
      <InfoBox
        type="tips"
        title="Informações Importantes sobre Vacinação no SUS"
        content={`✓ Gratuidade: Todas as vacinas do Calendário Nacional são gratuitas.<br/>
          ✓ Caderneta: Mantenha seu cartão de vacinação atualizado.<br/>
          ✓ Horários: Consulte a UBS mais próxima.<br/>
          ✓ Contraindicações: Informe alergias e condições de saúde.`}
      />
    </div>
  );
}
