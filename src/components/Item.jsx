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
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {displayOption === "card" ? (
            <svg
              className="quantity-button"
              fill={item.bought ? "#d3dba4" : "#b5c750"}
              onClick={item.bought ? undefined : () => onAddQuantity(index)}
              viewBox="0 0 512 512"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>add-circle-filled</title>{" "}
                <g
                  id="Page-1"
                  stroke-width="0.00512"
                  fill="none"
                  fill-rule="evenodd"
                >
                  {" "}
                  <g
                    id="drop"
                    fill={item.bought ? "#d3dba4" : "#b5c750"}
                    transform="translate(42.666667, 42.666667)"
                  >
                    {" "}
                    <path
                      d="M213.333333,3.55271368e-14 C269.912851,3.55271368e-14 324.175019,22.4761259 364.18278,62.4838867 C404.190541,102.491647 426.666667,156.753816 426.666667,213.333333 C426.666667,331.15408 331.15408,426.666667 213.333333,426.666667 C95.5125867,426.666667 3.55271368e-14,331.15408 3.55271368e-14,213.333333 C3.55271368e-14,95.5125867 95.5125867,3.55271368e-14 213.333333,3.55271368e-14 Z M234.666667,106.666667 L192,106.666667 L192,192 L106.666667,192 L106.666667,234.666667 L192,234.666 L192,320 L234.666667,320 L234.666,234.666 L320,234.666667 L320,192 L234.666,192 L234.666667,106.666667 Z"
                      id="add-workorder"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          ) : (
            ""
          )}

          <span
            className={displayOption === "card" ? `quantity` : `quantity-list`}
          >
            {item.quantity}
          </span>

          {displayOption === "card" ? (
            <svg
              id="subtract"
              className="quantity-button"
              onClick={
                item.bought ? undefined : () => onSubtractQuantity(index)
              }
              fill={item.bought ? "#d3dba4" : "#b5c750"}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11H7v-2h10v2z"></path>
              </g>
            </svg>
          ) : (
            ""
          )}

          <span className={displayOption === "card" ? `unit` : `unit-list`}>
            {item.unit}
          </span>
        </div>
      </div>

      {/* delete */}
      <svg
        className={displayOption === "card" ? `delete` : `delete-list`}
        fill="#000000"
        onClick={() => onDeleteProduct(index)}
        viewBox="-102.4 -102.4 1228.80 1228.80"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#000000"
        stroke-width="0.01024"
      >
        <g
          id="SVGRepo_bgCarrier"
          stroke-width="0"
          transform="translate(194.56,194.56), scale(0.62)"
        >
          <rect
            x="-102.4"
            y="-102.4"
            width="1228.80"
            height="1228.80"
            rx="614.4"
            fill="#ffff"
            strokewidth="0"
          ></rect>
        </g>
        <g
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
          stroke-width="2.048"
        ></g>
        <g>
          <path
            d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
            fill=""
          ></path>
          <path
            d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"
            fill=""
          ></path>
          <path d="M328 340.8l32-31.2 348 348-32 32z" fill=""></path>
        </g>
      </svg>
    </div>
  );
}

export default Item;
