function Info({ tag, value, afterValue }) {
  if (value)
    return (
      <div className="info-item">
        <h6 className="h6">{tag}</h6>
        {Array.isArray(value) ? (
          value.map((item, index) => <><span className="secondary" key={item}>{item}</span><br /></>)
        ) : (
          <p>{value}{afterValue}</p>
        )}
      </div>
    )
}

export default Info