import { useState } from "react";
import { imageSrc } from "../data/imageSrc.js";
// import { groceries } from "../data/groceries.js";
import { useContext } from "react";
import { UserInputContext } from "../App.jsx";
import Chatbox from "../components/Chatbox.jsx";

function AppPage() {
  const [products, setProducts] = useState([]);

  //add product to list
  function addProduct(newProduct) {
    setProducts([...products, newProduct]);
  }

  //toggle bought or not
  function handleToggleProduct(id) {
    setProducts((products) =>
      products.map((product) =>
        product.id === id ? { ...product, bought: !product.bought } : product
      )
    );
  }

  //delete product
  function deleteProduct(index) {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  }

  //add product quantity
  function addQuantity(index) {
    const newProducts = [...products];
    newProducts[index].quantity++;
    setProducts(newProducts);
  }

  //subtract product quantity
  function subtractQuantity(index) {
    const newProducts = [...products];
    if (newProducts[index].quantity !== 1) {
      newProducts[index].quantity--;
      setProducts(newProducts);
    }
  }

  //calculate balance and total price
  const context = useContext(UserInputContext);
  let balance = Number(context.userBudget);

  const newProducts = [...products];
  const boughtProducts = newProducts.filter((item) => item.bought === true);
  const totalPrice = boughtProducts.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  balance = (balance - totalPrice).toLocaleString();

  return (
    <div className="app">
      <div>
        <Chatbox />
        <Summary
          totalPrice={totalPrice}
          balance={balance}
          boughtProducts={boughtProducts}
        />
      </div>
      <div className="form">
        <img id="backpages" src={imageSrc.backpage}></img>
        <div>
          <img id="balance-stamp" src={imageSrc.circle}></img>
          <Balance balance={balance} />
        </div>
        <div id="form-paper">
          <Header />
          <Form onAddProduct={addProduct} />
          <GroceryList
            products={products}
            onAddQuantity={addQuantity}
            onSubtractQuantity={subtractQuantity}
            onDeleteProduct={deleteProduct}
            onToggleProduct={handleToggleProduct}
          />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <div>
        <h1>Notes</h1>
        <h2>อย่าลืมซื้อของให้แม่ที่ตลาดด้วย</h2>
      </div>
      <p>12/08/2566 BE</p>
    </div>
  );
}

function Balance({ balance }) {
  return (
    <div className="balance-container">
      <p>เงินคงเหลือ</p>
      <h3>{balance}</h3>
    </div>
  );
}

function Form({ onAddProduct }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("ชิ้น");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;
    const newProduct = {
      id: Date.now(),
      name,
      img,
      price,
      quantity,
      unit,
      bought: false,
    };

    onAddProduct(newProduct);

    setName("");
    setImg("");
    setPrice("");
    setQuantity(1);
    setUnit("ชิ้น");
  }

  return (
    <div className="">
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">ชื่อ</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label htmlFor="img">รูป</label>
          <input
            id="img"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          ></input>
          <label htmlFor="price">ราคา (ชิ้น)</label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <label htmlFor="quantity">จำนวน</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
          <label htmlFor="unit">หน่วย</label>
          <input
            id="unit"
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          ></input>
        </div>
        <div>
          <button id="send-button">Send</button>
        </div>
      </form>
    </div>
  );
}

function GroceryList({
  products,
  onAddQuantity,
  onSubtractQuantity,
  onDeleteProduct,
  onToggleProduct,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedProducts;

  if (sortBy === "input") {
    sortedProducts = products;
  }

  if (sortBy === "alphabet") {
    sortedProducts = products
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "bought") {
    sortedProducts = products
      .slice()
      .sort((a, b) => Number(b.bought) - Number(a.bought));
  }

  return (
    <div>
      <div className="grocery-list">
        {sortedProducts.map((item, index) => {
          return (
            <Item
              key={item.id}
              item={item}
              index={index}
              onAddQuantity={onAddQuantity}
              onSubtractQuantity={onSubtractQuantity}
              onDeleteProduct={onDeleteProduct}
              onToggleProduct={onToggleProduct}
            />
          );
        })}
      </div>
      <div className="sort-checkout">
        <div>back forth</div>
        <SortList setSortBy={setSortBy} />
        <button className="checkout-button">รวมบิล</button>
      </div>
    </div>
  );
}

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
            className={`card-button add ${item.bought ? "bought-button" : ""}`}
            onClick={item.bought ? undefined : () => onAddQuantity(index)}
          >
            +
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            className={`card-button subtract ${
              item.bought ? "bought-button" : ""
            }`}
            onClick={item.bought ? undefined : () => onSubtractQuantity(index)}
          >
            -
          </button>
          <span className="unit">{item.unit}</span>
        </div>
      </div>
      <button
        className="card-button delete"
        onClick={() => onDeleteProduct(index)}
      >
        X
      </button>
    </div>
  );
}

function SortList({ setSortBy }) {
  return (
    <select className="sort" onChange={(e) => setSortBy(e.target.value)}>
      <option value="input">เรียงตามลำดับ</option>
      <option value="alphabet">เรียงตามตัวอักษร</option>
      <option value="bought">เรียงตามสถานะ</option>
    </select>
  );
}

function Summary({ boughtProducts, balance, totalPrice }) {
  return (
    <div className="summary">
      <div>
        <h2>รายการสินค้า</h2>
        <ol>
          {boughtProducts.map((item) => {
            return (
              <li key={item.id}>
                <div>
                  <div>
                    {item.name}
                    <span id="quantity">x</span>
                    {item.quantity}
                  </div>
                  <div id="price">{item.price}.-</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="total">
        <h2>
          ยอดรวม<span>{totalPrice}</span> บาท
        </h2>
        <h2>
          เงินทอน<span>{balance}</span> บาท
        </h2>
      </div>
    </div>
  );
}

export default AppPage;
