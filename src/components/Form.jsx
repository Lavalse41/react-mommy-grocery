import { useState } from "react";
import axios from "axios";

function Form({ onAddProduct }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState();
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("ชิ้น");

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "momgrocery-upload");
    formData.append("api_key", import.meta.env.CLOUDINARY_API_KEY);

    const result = await fetch(
      "https://api.cloudinary.com/v1_1/dluc2m7kg/image/upload",
      { method: "POST", body: formData }
    ).then((r) => r.json());

    // console.log(result.secure_url);

    if (!name) return;
    const newProduct = {
      id: Date.now(),
      name,
      img:
        result.secure_url ||
        "https://res.cloudinary.com/dluc2m7kg/image/upload/v1697108748/mommy-grocery/icon/default-bw_a7yblh.jpg",
      price,
      quantity,
      unit,
      bought: false,
    };

    onAddProduct(newProduct);

    setName("");
    setImg();
    setPrice("");
    setQuantity(1);
    setUnit("ชิ้น");
  }

  function handleUploadFile(e) {
    const target = e.target;
    setImg(target.files[0]);
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

          {/* <input id="img" type="file" onChange={handleUploadFile}></input> */}
          <label htmlFor="img">รูป</label>
          <input
            id="img"
            type="file"
            className="file-input w-full max-w-xs"
            onChange={handleUploadFile}
          />

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
