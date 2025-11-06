import React from "react";
import "./MedicamentoCard.scss";

export default function MedicamentoCard({ nome, ubs, estoque, ultimaAtualizacao }) {
  const disponivel = estoque > 5;
  const estoqueBaixo = estoque > 0 && estoque <= 5;

  return (
    <>
      <div className={`med-card ${ disponivel ? "disponivel" : estoqueBaixo ? "estoque-baixo" : "indisponivel"
        }`}
      >
        <h2>{nome}</h2>
        <p><strong>UBS:</strong> {ubs}</p>

        {disponivel && <p>🟢 {estoque} unidades disponíveis</p>}
        {estoqueBaixo && <p>🟡 Apenas {estoque} unidades restantes!</p>}
        {!estoque && <p>🔴 Indisponível no momento</p>}

        <p className="data">Última atualização: {ultimaAtualizacao}</p>

       <div className="card-actions">
          <button className="btn-mapa">Ver no mapa</button>
          <button className="btn-detalhes">Detalhes</button>
        </div>
      </div>
    </>
  );
}
