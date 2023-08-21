import { useState } from "react";
import { imageSrc } from "../data/imageSrc.js";
import { groceries } from "../data/groceries.js";

function AppPage({ userName, userBudget }) {
  return (
    <div className="app">
      <div>
        <Chatbox userName={userName} userBudget={userBudget} />
        <Summary />
      </div>
      <div className="form">
        <img id="backpages" src={imageSrc.backpage}></img>
        <div>
          <img id="balance-stamp" src={imageSrc.circle}></img>
          <Balance userBudget={userBudget} />
        </div>
        <div id="form-paper">
          <Header />
          <Form />
          <GroceryList />
        </div>
      </div>
    </div>
  );
}

function Chatbox({ userName, userBudget }) {
  return (
    <div className="chatbox">
      <div className="msg-outer-wrapper">
        <img width="70px" height="70px" src={imageSrc.mommy}></img>
        <div className="msg-wrapper">
          <div className="msg first">
            <p>{userName} อยู่ข้างนอกใช่มั้ย ขากลับแวะตลาดหน่อย</p>
          </div>

          <div className="msg-tail f1"></div>
          <div className="msg-tail b1"></div>

          <div className="msg">
            ฝากซื้อของตามนี้ โอนไปให้แล้ว {userBudget} นะ
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

function Balance({ userBudget }) {
  return (
    <div className="balance-container">
      <p>เงินคงเหลือ</p>
      <h3>{userBudget}</h3>
    </div>
  );
}

function Form() {
  return (
    <div className="">
      <form className="form-wrapper" onSubmit="">
        <div>
          <label>ชื่อ</label>
          <input id="name" type="text"></input>
          <label>รูป</label>
          <input id="image" type="text"></input>
          <label>ราคา (ชิ้น)</label>
          <input id="price" type="text"></input>
          <label>จำนวน</label>
          <input id="number" type="number"></input>
          <label>หน่วย</label>
          <input id="measure" type="text"></input>
        </div>
        <div>
          <button id="send-button">Send</button>
        </div>
      </form>
    </div>
  );
}

function GroceryList() {
  return (
    <div>
      <Item />
      <div className="sort-checkout">
        <div>back forth</div>
        <SortList />
        <button className="checkout-button">รวมบิล</button>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="grocery-list">
      {groceries.map((item) => {
        return (
          <div className="grocery-container" key={item.id}>
            <button className="card-button toggle"> / </button>
            <img src={item.image}></img>
            <div className="detail-container">
              <div>
                <span>{item.name}</span>
                <span className="price">{item.price}.-</span>
              </div>
              <div>
                <button className="card-button add">+</button>
                <span className="number">{item.number}</span>
                <button className="card-button subtract">-</button>
                <span className="measure">{item.unit}</span>
              </div>
            </div>
            <button className="card-button delete">X</button>
          </div>
        );
      })}
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
          ยอดรวม<span>850.-</span>
        </h2>
        <h2>
          เงินทอน<span>150.-</span>
        </h2>
      </div>
    </div>
  );
}

export default AppPage;
