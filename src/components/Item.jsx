function Item({
  item,
  index,
  onAddQuantity,
  onSubtractQuantity,
  onDeleteProduct,
  onToggleProduct,
  displayOption,
}) {
  return (
    <div
      className={
        displayOption === "card"
          ? `grocery-container ${item.bought ? "bought" : ""}`
          : `item-list ${item.bought ? "bought-list" : ""}`
      }
    >
      {/* checkbox */}
      <div className={displayOption === "card" ? `toggle` : ``}>
        <input
          type="checkbox"
          className="check-input card-button"
          id="customCheckbox"
          value={item.bought}
          onChange={() => onToggleProduct(item.id)}
        ></input>
      </div>

      {/* image */}
      {displayOption === "card" ? <img src={item.img}></img> : ""}

      <div
        className={
          displayOption === "card"
            ? `detail-container`
            : `detail-container-list`
        }
      >
        {/* name */}
        <div className={displayOption === "list" ? `margin-left` : ``}>
          <span>{item.name}</span>
          <span className={displayOption === "card" ? `` : `price-list`}>
            {parseFloat(item.price).toLocaleString("en-US")}
            .-
          </span>
        </div>

        {/* + - quantity */}
        <div>
          {displayOption === "card" ? (
            <button
              className={`card-button add ${item.bought && "bought-button"}`}
              onClick={item.bought ? undefined : () => onAddQuantity(index)}
            >
              <span>+</span>
            </button>
          ) : (
            ""
          )}

          <span
            className={displayOption === "card" ? `quantity` : `quantity-list`}
          >
            {item.quantity}
          </span>

          {displayOption === "card" ? (
            <button
              className={`card-button subtract ${
                item.bought && "bought-button"
              }`}
              onClick={
                item.bought ? undefined : () => onSubtractQuantity(index)
              }
            >
              <span>-</span>
            </button>
          ) : (
            ""
          )}

          <span className={displayOption === "card" ? `unit` : `unit-list`}>
            {item.unit}
          </span>
        </div>
      </div>

      {/* delete */}
      <button
        className={
          displayOption === "card"
            ? `card-button delete`
            : `card-button delete-list`
        }
        onClick={() => onDeleteProduct(index)}
      >
        <span>❌</span>
      </button>
    </div>
  );
}

export default Item;
