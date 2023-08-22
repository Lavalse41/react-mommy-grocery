import { useState } from "react";
import { imageSrc } from "../data/imageSrc.js";
import { groceries } from "../data/groceries.js";
import { useContext } from "react";
import { UserInputContext } from "../App.jsx";

function AppPage() {
  const [products, setProducts] = useState([]);

  function addProduct(newProduct) {
    setProducts([...products, newProduct]);
  }

  function handleToggleProduct(id) {
    setProducts((products) =>
      products.map((product) =>
        product.id === id ? { ...product, bought: !product.bought } : product
      )
    );
  }

  function deleteProduct(index) {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  }

  function addQuantity(index) {
    const newProducts = [...products];
    newProducts[index].quantity++;
    setProducts(newProducts);
  }

  function subtractQuantity(index) {
    const newProducts = [...products];
    if (newProducts[index].quantity !== 1) {
      newProducts[index].quantity--;
      setProducts(newProducts);
    }
  }

  return (
    <div className="app">
      <div>
        <Chatbox />
        <Summary />
      </div>
      <div className="form">
        <img id="backpages" src={imageSrc.backpage}></img>
        <div>
          <img id="balance-stamp" src={imageSrc.circle}></img>
          <Balance />
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

function Chatbox() {
  const context = useContext(UserInputContext);
  const formattedBalance = Number(context.userBudget).toLocaleString();

  return (
    <div className="chatbox">
      <div className="msg-outer-wrapper">
        <img width="70px" height="70px" src={imageSrc.mommy}></img>
        <div className="msg-wrapper">
          <div className="msg first">
            <p>{context.userName} อยู่ข้างนอกใช่มั้ย ขากลับแวะตลาดหน่อย</p>
          </div>

          <div className="msg-tail f1"></div>
          <div className="msg-tail b1"></div>

          <div className="msg">
            ฝากซื้อของตามนี้ โอนไปให้แล้ว {formattedBalance} นะ
            เอาบิลกับเงินทอนมาให้ด้วย
          </div>
          <div className="msg">..โทร</div>
        </div>
      </div>

      <div className="msg-outer-wrapper right">
        <div className="msg-tail f2"></div>
        <div className="msg-tail b2"></div>
        <div className="msg first user">emoji</div>
        <img width="70px" height="70px" src={imageSrc.child}></img>
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

function Balance() {
  const context = useContext(UserInputContext);
  const formattedBalance = Number(context.userBudget).toLocaleString();

  return (
    <div className="balance-container">
      <p>เงินคงเหลือ</p>
      <h3>{formattedBalance}</h3>
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
  return (
    <div>
      <div className="grocery-list">
        {products.map((item, index) => {
          return (
            <Item
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
        <SortList />
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

function SortList() {
  return (
    <select className="sort">
      <option value="เรียงตามลำดับ">เรียงตามลำดับ</option>
      <option>เรียงตามตัวอักษร</option>
      <option>เรียงตามสถานะ</option>
    </select>
  );
}

function Summary() {
  return (
    <div className="summary">
      <div>
        <h2>รายการสินค้า</h2>
        <ul>
          <li>
            กล้วยหอม<span>60.-</span>
          </li>
        </ul>
      </div>

      <div className="total">
        <h2>
          ยอดรวม<span>0</span> บาท
        </h2>
        <h2>
          เงินทอน<span>0</span> บาท
        </h2>
      </div>
    </div>
  );
}

export default AppPage;
