function Info({ tag, value }) {
  return (
    <div className="info-item">
      <h6 className="h6">{tag}</h6>
      {Array.isArray(value) ? (
        value.map((item, index) => <><span className="secondary" key={item}>{item}</span><br /></>)
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}

export default Info;