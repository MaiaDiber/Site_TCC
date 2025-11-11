import Header from "../components/Header";
import VaccineCard from "../components/VaccineCard";
import InfoBox from "../components/InfoBox";
import "../styles/calendario.css";

export default function CalendarioVacinacao() {
  return (
    <div className="calendario-container">
      <Header />

      {/* Seção de título */}
      <section className="hero">
        <h2>Calendário Nacional de Vacinação</h2>
        <p>Vacinas disponíveis gratuitamente no SUS</p>
      </section>

      {/* Aviso importante */}
      <InfoBox
        type="alert"
        title="Importante"
        content="Leve seu Cartão Nacional de Vacinação (ou Caderneta de Vacinação) e documento de identidade com CPF. Todas as vacinas do Calendário Nacional são oferecidas gratuitamente nas UBS do SUS. Consulte a unidade mais próxima para verificar disponibilidade e horários."
      />

      {/* Seção de vacinas */}
      <section className="vacinas-section">
        <h3>Vacinas para Adolescentes, Adultos e Idosos</h3>
        <div className="vacina-grid">
          <VaccineCard
            title="Hepatite B"
            status="Rotina"
            publico="Todas as faixas etárias"
            info="Esquema de 3 doses. Disponível em todas as UBS."
          />
          <VaccineCard
            title="Febre Amarela"
            status="Rotina"
            publico="A partir de 9 meses de idade"
            info="Dose única. Recomendada para residentes ou viajantes em áreas com risco."
          />
          <VaccineCard
            title="Tríplice Viral (Sarampo, Caxumba e Rubéola)"
            status="Rotina"
            publico="Crianças e adultos até 49 anos"
            info="Duas doses. Comprovação por meio da Caderneta de Vacinação."
          />
          <VaccineCard
            title="dT (Difteria e Tétano) ou dTpa"
            status="Rotina"
            publico="A partir de 7 anos"
            info="Reforço a cada 10 anos. Gestantes devem realizar a partir da 20ª semana."
          />
          <VaccineCard
            title="Influenza (Gripe)"
            status="Campanha anual"
            publico="Grupos prioritários"
            info="Idosos, gestantes, puérperas, crianças de 6m a 5a, profissionais da saúde e outros."
          />
          <VaccineCard
            title="COVID-19"
            status="Rotina"
            publico="Toda a população a partir de 6 meses"
            info="Esquema vacinal conforme faixas etárias e doses anteriores."
          />
        </div>
      </section>

      {/* Vacinas infantis */}
      <section className="vacinas-section">
        <h3>Vacinas Infantis (0 a 10 anos)</h3>
        <div className="vacina-grid">
          <VaccineCard
            title="BCG"
            status="Ao nascer"
            info="Previne formas graves de tuberculose."
          />
          <VaccineCard
            title="Hepatite B"
            status="Ao nascer"
            info="Primeira dose nas 24 horas de vida."
          />
          <VaccineCard
            title="Pentavalente (DTP, Hib, Hepatite B)"
            status="Rotina infantil"
            info="Protege contra difteria, tétano, coqueluche, Haemophilus e hepatite B."
          />
          <VaccineCard
            title="Rotavírus"
            status="Rotina infantil"
            info="Protege contra diarreias por rotavírus."
          />
        </div>
      </section>

      {/* Documentos necessários */}
      <InfoBox
        type="docs"
        title="Documentos Necessários"
        content={`
          • Cartão Nacional de Vacinação<br/>
          • Documento de identidade com foto<br/>
          • Cartão Nacional de Saúde (CNS) ou CPF<br/>
          • Comprovante de residência (para primeiro atendimento)
        `}
      />

      {/* Informações adicionais */}
      <InfoBox
        type="tips"
        title="Informações Importantes sobre Vacinação no SUS"
        content={`
          ✓ Gratuidade: Todas as vacinas do Calendário Nacional são gratuitas.<br/>
          ✓ Caderneta: Mantenha seu cartão de vacinação atualizado.<br/>
          ✓ Horários: Consulte a UBS mais próxima.<br/>
          ✓ Contraindicações: Informe alergias e condições de saúde.
        `}
      />
    </div>
  );
}
