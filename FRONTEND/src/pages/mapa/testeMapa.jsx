import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function TesteMapa() {
  useEffect(() => {
    // ✅ Corrige recriação do mapa
    const existingMap = L.DomUtil.get("map");
    if (existingMap != null) {
      existingMap._leaflet_id = null;
    }

    // Cria o mapa centralizado na Zona Sul de SP
    const map = L.map("map", {
      center: [-23.65, -46.63],
      zoom: 12,
      minZoom: 11, // 🔹 Impede que afaste demais
      maxZoom: 18, // 🔹 Impede que aproxime demais
      zoomControl: true, // 🔹 Mostra controle de zoom (+ / -)
      scrollWheelZoom: true, // 🔹 Permite zoom com scroll do mouse
      dragging: true, // 🔹 Permite arrastar o mapa
    });

    // Mapa base gratuito (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    // 🔹 Limite aproximado da Zona Sul
    const bounds = L.latLngBounds(
      [-23.74, -46.80], // sudoeste
      [-23.58, -46.50]  // nordeste
    );

    // Define os limites e mantém o foco dentro
    map.setMaxBounds(bounds);
    map.on("drag", function () {
      map.panInsideBounds(bounds, { animate: false });
    });

    // 🔹 Lista de UBS (exemplo)
    const ubsList = [
      {
        nome: "UBS Jardim São Luís",
        coords: [-23.6662, -46.7371],
        info: "💉 Campanha de vacinação contra dengue ativa.",
      },
      {
        nome: "UBS Capão Redondo",
        coords: [-23.6528, -46.7743],
        info: "🩺 Atendimento ampliado aos sábados.",
      },
      {
        nome: "UBS Campo Limpo",
        coords: [-23.6375, -46.7567],
        info: "💉 Vacinação infantil até 17h.",
      },
      {
        nome: "UBS Santo Amaro",
        coords: [-23.6499, -46.7066],
        info: "🩹 Campanhas finalizadas, aguardando novas datas.",
      },
      {
        nome: "UBS Vila Andrade",
        coords: [-23.6215, -46.7312],
        info: "💉 Nova campanha contra gripe!",
      },
    ];

    // 🔹 Adiciona marcadores com popup
    ubsList.forEach((ubs) => {
      L.marker(ubs.coords).addTo(map).bindPopup(`
        <b>${ubs.nome}</b><br>${ubs.info}
      `);
    });

    // 🔹 Centraliza para ver todas as UBS
    const group = L.featureGroup(ubsList.map((u) => L.marker(u.coords)));
    map.fitBounds(group.getBounds(), { padding: [20, 20] });
  }, []);

  // Renderiza o mapa
  return (
    <div style={{ height: "100vh", width: "100%", padding: "10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        🗺️ UBS da Zona Sul de São Paulo
      </h2>
      <div
        id="map"
        style={{
          height: "90%",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      ></div>
    </div>
  );
}