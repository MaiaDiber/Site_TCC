export default function VaccineCard({ title, status, publico, info }) {
  return (
    <div className="vaccine-card">
      <h4>{title}</h4>
      <span className="status">{status}</span>
      {publico && <p><strong>Público-alvo:</strong> {publico}</p>}
      <p className="info">{info}</p>
    </div>
  );
}