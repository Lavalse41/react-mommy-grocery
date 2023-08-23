import { useState } from "react";

function Form({ onAddProduct }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState(
    "https://i.ibb.co/cLMMVfk/mango-sticky-rice.jpg"
  );
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
    setImg("https://i.ibb.co/cLMMVfk/mango-sticky-rice.jpg");
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

export default Form;
