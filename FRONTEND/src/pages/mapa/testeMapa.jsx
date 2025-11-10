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
      minZoom: 11,
      maxZoom: 18,
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
    });

    // Tile base gratuito (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    // 🔹 Limite aproximado da Zona Sul
    const bounds = L.latLngBounds(
      [-23.74, -46.80], // sudoeste
      [-23.58, -46.50]  // nordeste
    );
    map.setMaxBounds(bounds);
    map.on("drag", () => map.panInsideBounds(bounds, { animate: false }));

    // 🔹 UBSs de exemplo
    const ubsList = [
      { nome: "UBS Jardim São Luís", coords: [-23.6662, -46.7371], info: "💉 Campanha de vacinação contra dengue ativa." },
      { nome: "UBS Capão Redondo", coords: [-23.6528, -46.7743], info: "🩺 Atendimento ampliado aos sábados." },
      { nome: "UBS Campo Limpo", coords: [-23.6375, -46.7567], info: "💉 Vacinação infantil até 17h." },
      { nome: "UBS Santo Amaro", coords: [-23.6499, -46.7066], info: "🩹 Campanhas finalizadas, aguardando novas datas." },
      { nome: "UBS Vila Andrade", coords: [-23.6215, -46.7312], info: "💉 Nova campanha contra gripe!" },
    ];

    // Adiciona marcadores de UBS
    ubsList.forEach((ubs) => {
      L.marker(ubs.coords).addTo(map).bindPopup(`<b>${ubs.nome}</b><br>${ubs.info}`);
    });

    // 🔹 Agrupa UBSs para centralizar visualização inicial
    const group = L.featureGroup(ubsList.map((u) => L.marker(u.coords)));
    map.fitBounds(group.getBounds(), { padding: [20, 20] });

    // 🔹 Mostra localização atual do usuário
    let userMarker = null;

    if (navigator.geolocation) {
      // rastreamento em tempo real
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const userLatLng = [latitude, longitude];

          if (!userMarker) {
            // cria marcador azul
            const userIcon = L.icon({
              iconUrl:
                "https://cdn-icons-png.flaticon.com/512/64/64113.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            });
            userMarker = L.marker(userLatLng, { icon: userIcon })
              .addTo(map)
              .bindPopup("📍 Você está aqui")
              .openPopup();

            map.setView(userLatLng, 14);
          } else {
            // atualiza posição se mover
            userMarker.setLatLng(userLatLng);
          }
        },
        (err) => {
          console.warn("Erro ao obter localização:", err.message);
          alert("⚠️ Não foi possível obter sua localização.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocalização não é suportada neste navegador.");
    }
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