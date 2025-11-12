import React, { useState } from 'react';
import { MapPin, Building2, AlertCircle, Phone, Menu, X } from 'lucide-react';
import ComponenteAcessibilidade from '../Cadastro/Acessibilidade';
import { useNavigate } from 'react-router';
import './upa.scss'

export default function UPAs (){
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
      
      const existingMap = L.DomUtil.get("map");
      if (existingMap != null) {
        existingMap._leaflet_id = null;
      }
  
      
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
  
      
      const bounds = L.latLngBounds(
        [-23.74, -46.80], 
        [-23.58, -46.50]  
      );
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

  return (
    <section className="via-saude">

                          <div style={{
                                position: 'fixed',
                                top: '20px',
                                right: '20px',
                                zIndex: 1000
                            }}>
                                <ComponenteAcessibilidade />
                            </div>

      <header >
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/public/assets/images/logo_ViaSaúde.png" height={90} alt="" />

              <Link className="voltar" onClick={() => navigate(-1)}>
                          ← Voltar
                      </Link>
            </div>
           
          </div>
        </div>
      </header>

      
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <MapPin className="hero-icon" size={48} />
            <h1>Unidades de Saúde</h1>
            <p>Como encontrar a unidade de saúde mais próxima de você</p>
          </div>
        </div>
      </section>

     
      <section className="info-alert">
        <div className="container">
          <div className="alert-box">
            <AlertCircle className="alert-icon" size={24} />
            <div className="alert-content">
              <h3>Como encontrar sua UBS:</h3>
              <p>
                Para localizar a Unidade Básica de Saúde mais próxima da sua residência, 
                consulte o site da Secretaria Municipal de Saúde da sua cidade ou entre em 
                contato pelo telefone da prefeitura. Cada município organiza suas unidades 
                de forma diferente.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="health-unit">
        <div className="container">
          <div className="unit-card ubs">
            <div className="unit-header">
              <Building2 className="unit-icon" size={32} />
              <div>
                <h2>UBS - Unidade Básica de Saúde (Posto de Saúde)</h2>
                <span className="badge urgencia">Urgência e Emergência</span>
              </div>
            </div>
            
            <p className="unit-description">
              O que é: É a porta de entrada do SUS, responsável pela atenção primária à saúde. 
              Também conhecida como "posto de saúde" ou "postinho".
            </p>

            <div className="services">
              <h3>Serviços oferecidos:</h3>
              <ul>
                <li>Consultas médicas e de enfermagem</li>
                <li>Vacinação</li>
                <li>Pré-natal</li>
                <li>Puericultura (acompanhamento de crianças)</li>
                <li>Dispensação de medicamentos básicos</li>
                <li>Curativos</li>
                <li>Prevenção de doenças crônicas (hipertensão, diabetes)</li>
                <li>Exames básicos</li>
                <li>Planejamento familiar</li>
                <li>Atividades educativas em saúde</li>
              </ul>
            </div>

            <div className="tip-box">
              <strong>Dica:</strong> Procure a UBS mais próxima da sua casa para fazer seu 
              cadastro e o acompanhamento regular de saúde com a equipe de Saúde da Família.
            </div>
          </div>
        </div>
      </section>

      
      <section className="health-unit">
        <div className="container">
          <div className="unit-card upa">
            <div className="unit-header">
              <Building2 className="unit-icon" size={32} />
              <div>
                <h2>UPA - Unidade de Pronto Atendimento</h2>
                <span className="badge urgencia">Urgência e Emergência</span>
              </div>
            </div>
            
            <p className="unit-description">
              O que é: Atende casos de urgência e emergência de complexidade intermediária. 
              Funciona 24 horas por dia, todos os dias da semana.
            </p>

            <div className="services">
              <h3>Quando procurar:</h3>
              <ul>
                <li>Febre alta persistente</li>
                <li>Fraturas, cortes e queimaduras</li>
                <li>Dificuldade respiratória moderada</li>
                <li>Dores intensas</li>
                <li>Vômitos e diarreia persistentes</li>
                <li>Pressão alta ou baixa com sintomas</li>
              </ul>
            </div>

            <div className="important-box">
              <strong>Importante:</strong> A UPA não substitui a UBS. Para acompanhamento 
              regular de saúde, procure a Unidade Básica de Saúde.
            </div>
          </div>
        </div>
      </section>

      
      <section className="health-unit">
        <div className="container">
          <div className="unit-card hospital">
            <div className="unit-header">
              <Building2 className="unit-icon" size={32} />
              <div>
                <h2>Pronto-Socorro e Hospitais</h2>
                <span className="badge alta">Alta Complexidade</span>
              </div>
            </div>
            
            <p className="unit-description">
              O que é: Atendem emergências graves que necessitam de atendimento hospitalar, 
              cirurgias e internações.
            </p>

            <div className="services">
              <h3>Quando procurar:</h3>
              <ul>
                <li>Dor no peito com suspeita de infarto</li>
                <li>AVC (derrame) - perda súbita de movimentos ou fala</li>
                <li>Dificuldade respiratória grave</li>
                <li>Hemorragias graves</li>
                <li>Perda de consciência</li>
                <li>Traumatismos graves (acidentes)</li>
                <li>Convulsões</li>
              </ul>
            </div>

            <div className="emergency-box">
              <strong>Em caso de emergência grave, ligue:</strong> SAMU 192 (Serviço de 
              Atendimento Móvel de Urgência)
            </div>
          </div>
        </div>
      </section>

      
      <section className="health-unit">
        <div className="container">
          <div className="unit-card specialized">
            <div className="unit-header">
              <Building2 className="unit-icon" size={32} />
              <div>
                <h2>Unidades Especializadas</h2>
                <span className="badge media">Média Complexidade</span>
              </div>
            </div>
            
            <p className="unit-description">
              O que são: Oferecem atendimento especializado em determinadas áreas da saúde.
            </p>

            <div className="services">
              <h3>Exemplos de unidades especializadas:</h3>
              <ul>
                <li>Centros de Especialidades Odontológicas (CEO)</li>
                <li>Centros de Atenção Psicossocial (CAPS)</li>
                <li>Policlínicas</li>
                <li>Centros de Referência em Saúde do Trabalhador</li>
                <li>Serviços de reabilitação física</li>
              </ul>
            </div>

            <div className="access-box">
              <strong>Como acessar:</strong> O encaminhamento para unidades especializadas 
              é feito pela UBS, após avaliação médica.
            </div>
          </div>
        </div>
      </section>

      
      <section className="find-unit">
        <div className="container">
          <h2 className="section-title">
            <MapPin size={24} />
            Como Encontrar a Unidade de Saúde Mais Próxima
          </h2>
          
          <div className="find-grid">
            <div className="find-card">
              <div className="find-number">1</div>
              <h3>Site da Secretaria Municipal de Saúde</h3>
              <p>
                Acesse o site da prefeitura da sua cidade (seção de saúde) e procure por 
                "Unidades de Saúde" ou "Rede de Atenção à Saúde". Geralmente há um mapa ou 
                lista com endereços.
              </p>
            </div>

            <div className="find-card">
              <div className="find-number">2</div>
              <h3>Ligue para a Secretaria de Saúde do seu município</h3>
              <p>
                Entre em contato com a prefeitura ou Secretaria Municipal de Saúde e pergunte 
                qual é a UBS responsável pela sua região (área de abrangência).
              </p>
            </div>

            <div className="find-card">
              <div className="find-number">3</div>
              <h3>Disque Saúde 136</h3>
              <p>
                Ligue gratuitamente para o 136 e solicite informações sobre as unidades de 
                saúde da sua região.
              </p>
            </div>

            <div className="find-card">
              <div className="find-number">4</div>
              <h3>Aplicativo Conecte SUS Cidadão</h3>
              <p>
                Disponível para Android e iOS, o app permite localizar unidades de saúde 
                próximas e acessar seus dados de saúde.
              </p>
            </div>

            <div className="find-card">
              <div className="find-number">5</div>
              <h3>Pergunte na comunidade</h3>
              <p>
                Vizinhos e agentes comunitários de saúde podem informar qual é a UBS que 
                atende sua região.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="territory-info">
        <div className="container">
          <div className="info-card">
            <AlertCircle className="info-icon" size={24} />
            <div>
              <h3>Territorialização: Cada Bairro tem sua UBS</h3>
              <p>
                O SUS funciona por <strong>territorialização</strong>. Ou seja, cada Unidade 
                Básica de Saúde é responsável por atender a população de uma área geográfica 
                específica (bairros ou região).
              </p>
              <p>
                <strong>Por isso, você deve procurar a UBS mais próxima da sua casa para se 
                cadastrar.</strong> A equipe de Saúde da Família ficará responsável pelo seu 
                acompanhamento de saúde.
              </p>
              <p>
                <strong>Cadastro:</strong> Leve um CPF, comprovante de residência e Cartão 
                Nacional de Saúde (se já tiver). Se não tiver o Cartão do SUS, ele será 
                emitido na própria UBS.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="contacts">
        <div className="container">
          <h2 className="section-title">
            <Phone size={24} />
            Contatos Úteis
          </h2>
          
          <div className="contacts-grid">
            <div className="contact-card">
              <Phone className="contact-icon" size={24} />
              <h3>Disque Saúde 136</h3>
              <p>Ligação gratuita. Atendimento 24 horas para informações sobre o SUS, 
              unidades de saúde, medicamentos e dúvidas sobre saúde em geral.</p>
            </div>

            <div className="contact-card emergency">
              <Phone className="contact-icon" size={24} />
              <h3>SAMU 192</h3>
              <p>Emergências médicas. Atendimento móvel de urgência 24 horas.</p>
            </div>

            <div className="contact-card">
              <Building2 className="contact-icon" size={24} />
              <h3>Site oficial do Ministério da Saúde</h3>
              <p>www.gov.br/saude - Informações oficiais sobre políticas de saúde, 
              campanhas e serviços do SUS.</p>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <div className="logo-icon">+</div>
              <div className="logo-text">
                <span className="logo-via">VIA</span>
                <span className="logo-saude">SAÚDE</span>
              </div>
            </div>
            <p>Informações sobre saúde pública no Brasil</p>
          </div>
        </div>
      </footer>

    </section>
  )
};
