export default function InfoBox({ type, title, content }) {
  return (
    <div className={`info-box ${type}`}>
      <h5>{title}</h5>
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
  );
}
