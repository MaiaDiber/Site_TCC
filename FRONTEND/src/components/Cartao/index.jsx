import React, { useState } from "react";
import { FaPills, FaMapMarkerAlt, FaInfoCircle, FaTimes } from "react-icons/fa";
import "./index.scss";

export default function MedicamentoCard({ nome, ubs, estoque, ultimaAtualizacao, data_validade }) {
  const [modalOpen, setModalOpen] = useState(false);
  const disponivel = estoque > 5;
  const estoqueBaixo = estoque > 0 && estoque <= 5;

  return (
    <>
      <div className={`med-card ${disponivel ? "disponivel" : estoqueBaixo ? "estoque-baixo" : "indisponivel"}`}>
        <div className="card-header">
          <FaPills className="icon-med" />
          <h2>{nome}</h2>
          <span className="status-badge">
            {disponivel ? "Disponível" : estoqueBaixo ? "Estoque Baixo" : "Indisponível"}
          </span>
        </div>

        <div className="card-body">
          <p><FaMapMarkerAlt className="icon-ubs" /> <strong>UBS:</strong> {ubs}</p>
          <div className="estoque-info">
            <p className="estoque-text">
              {disponivel && <><span className="estoque-num">{estoque}</span> unidades disponíveis</>}
              {estoqueBaixo && <><span className="estoque-num">{estoque}</span> unidades restantes!</>}
              {!estoque && "Indisponível no momento"}
            </p>
          </div>
          <p className="data">Última atualização: {ultimaAtualizacao}</p>
        </div>

        <div className="card-actions">
          <button className="btn-mapa">
            <FaMapMarkerAlt /> Ver no mapa
          </button>
          <button className="btn-detalhes" onClick={() => setModalOpen(true)}>
            <FaInfoCircle /> Detalhes
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <FaPills className="modal-icon" />
              <h3>Detalhes do Medicamento</h3>
              <button className="btn-close" onClick={() => setModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Nome:</strong> {nome}</p>
              <p><strong>UBS:</strong> {ubs}</p>
              <p><strong>Estoque:</strong> {estoque} unidades</p>
              <p><strong>Data de Validade:</strong> {data_validade}</p>
              <p><strong>Última Atualização:</strong> {ultimaAtualizacao}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
