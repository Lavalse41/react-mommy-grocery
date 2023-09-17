function Item({
  item,
  index,
  onAddQuantity,
  onSubtractQuantity,
  onDeleteProduct,
  onToggleProduct,
}) {
  return (
    <div className={`grocery-container ${item.bought ? "bought" : ""}`}>
      <input
        type="checkbox"
        className="card-button toggle"
        value={item.bought}
        onChange={() => onToggleProduct(item.id)}
      ></input>
      <img src={item.img}></img>
      <div className="detail-container">
        <div>
          <span>{item.name}</span>
          <span className="price">{item.price}.-</span>
        </div>
        <div>
          <button
            className={`card-button add ${item.bought && "bought-button"}`}
            onClick={item.bought ? undefined : () => onAddQuantity(index)}
          >
            <span>+</span>
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            className={`card-button subtract ${item.bought && "bought-button"}`}
            onClick={item.bought ? undefined : () => onSubtractQuantity(index)}
          >
            <span>-</span>
          </button>
          <span className="unit">{item.unit}</span>
        </div>
      </div>
      <button
        className="card-button delete"
        onClick={() => onDeleteProduct(index)}
      >
        x
      </button>
    </div>
  );
}

export default Item;
