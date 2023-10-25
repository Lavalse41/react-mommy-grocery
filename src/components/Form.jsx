import { useState } from "react";
import axios from "axios";
import Warning from "./warning";

function Form({ onAddProduct }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState();
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("ชิ้น");
  const [isNameError, setIsNameError] = useState(false);
  const [isPriceError, setIsPriceError] = useState(false);
  const [isQuantityError, setIsQuantityError] = useState(false);
  const [isNameExist, setIsNameExist] = useState(false);
  const [isPriceExist, setIsPriceExist] = useState(false);
  const [isQuantityExist, setIsQuantityExist] = useState(false);
  const [isUnitExist, setIsUnitExist] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "momgrocery-upload");
    formData.append("api_key", import.meta.env.CLOUDINARY_API_KEY);

    let res;

    try {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/dluc2m7kg/image/upload",
        formData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    //name character must not exceed 20
    setIsNameError(name.length > 20 ? true : false);

    //price and quantity have to be number
    function isNumber(s) {
      const pattern = /^\d+$/;
      return pattern.test(s);
    }

    if (!isNumber(price) && price.length > 0) {
      setIsPriceError(true);
    } else {
      setIsPriceError(false);
    }

    if (!isNumber(quantity) && quantity.length > 0) {
      setIsQuantityError(true);
    } else {
      setIsQuantityError(false);
    }

    //all inputs must exist
    setIsNameExist(!name ? true : false);
    setIsPriceExist(!price ? true : false);
    setIsQuantityExist(!quantity || quantity === 0 ? true : false);
    setIsUnitExist(!unit ? true : false);

    if (
      !name ||
      !price ||
      !quantity ||
      quantity === 0 ||
      !unit ||
      name.length > 20 ||
      !isNumber(quantity) ||
      !isNumber(price)
    )
      return;

    const newProduct = {
      id: Date.now(),
      name,
      img: res
        ? res.data.secure_url
        : "https://res.cloudinary.com/dluc2m7kg/image/upload/v1697108748/mommy-grocery/icon/default-bw_a7yblh.jpg",
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
        {/* validation message */}

        {isNameError && (
          <div class="container" id="name-error">
            <div class="arrow">
              <div class="outer"></div>
              <div class="inner"></div>
            </div>
            <div className="message-body">
              <p>โปรดใส่ชื่อไม่เกิน 20 ตัวอักษร</p>
            </div>
          </div>
        )}

        {isPriceError && (
          <div class="container" id="price-error">
            <div class="arrow">
              <div class="outer"></div>
              <div class="inner"></div>
            </div>
            <div className="message-body">
              <p>โปรดใส่ตัวเลข</p>
            </div>
          </div>
        )}

        {isQuantityError && (
          <div class="container" id="quantity-error">
            <div class="arrow">
              <div class="outer"></div>
              <div class="inner"></div>
            </div>
            <div className="message-body">
              <p>โปรดใส่ตัวเลข</p>
            </div>
          </div>
        )}

        <div style={{ position: "relative" }}>
          <label htmlFor="name">ชื่อ</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsNameExist(false);
            }}
          ></input>
          {isNameExist && <Warning />}
        </div>

        <label htmlFor="img">รูป</label>
        <div className="file-input-container">
          <span className="file-name">{img && `${img.name}`}</span>
          <label htmlFor="img" className="file-input-label">
            Upload
          </label>
          <input
            id="image"
            type="file"
            onChange={handleUploadFile}
            className="input-file"
          ></input>
        </div>

        <div style={{ position: "relative" }}>
          <label htmlFor="price">ราคา (ชิ้น)</label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setIsPriceExist(false);
            }}
          ></input>
          {isPriceExist && <Warning />}
        </div>

        <div style={{ position: "relative" }}>
          <label htmlFor="quantity">จำนวน</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setIsQuantityExist(false);
            }}
            onMouseEnter={() => setIsQuantityExist(false)}
            min="1"
          ></input>
          {isQuantityExist && <Warning />}
        </div>

        <div style={{ position: "relative" }}>
          <label htmlFor="unit">หน่วย</label>
          <input
            id="unit"
            type="text"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
              setIsUnitExist(false);
            }}
          ></input>
          {isUnitExist && <Warning />}
        </div>

        <div>
          <button id="send-button">Send</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
