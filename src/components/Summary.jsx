function Summary({ boughtProducts, balance, totalPrice }) {
  return (
    <div className="summary">
      <div>
        <h2>รายการสินค้า</h2>
        <ul>
          {boughtProducts.map((item) => {
            return (
              <li key={item.id}>
                <div>
                  <div className="quantity-container left">{item.quantity}</div>
                  <div className="name-container left">{item.name}</div>
                  <div className="price-container right">
                    {item.quantity > 1 &&
                      Number(item.price)
                        .toLocaleString("en-US", {
                          style: "currency",
                          currency: "THB",
                        })
                        .replace("THB", "")}
                  </div>
                  <div className="total-container right">
                    {(item.price * item.quantity)
                      .toLocaleString("en-US", {
                        style: "currency",
                        currency: "THB",
                      })
                      .replace("THB", "")}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <hr></hr>
        <div className="total">
          <h2>
            ยอดรวม
            <span>{totalPrice.toLocaleString()}</span>บาท
          </h2>
          <h2>
            เงินทอน<span>{balance.toLocaleString()}</span>บาท
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Summary;
