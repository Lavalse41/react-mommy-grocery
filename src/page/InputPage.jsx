import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../inputPage.css";

function InputPage({ onUserInput }) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (name && budget) {
      onUserInput(name, budget);
      navigate("/grocery");
    } else {
      setIsError(true);
    }
  }

  return (
    <div className="app">
      <div className="input-page">
        <div className="logo-wrapper">
          <span className="logo" id="emoji1">
            🥗
          </span>
          <span className="logo" id="emoji4">
            🛒
          </span>
          <span className="logo" id="emoji5">
            🍤
          </span>
          <span className="logo-text">
            Mommy <br></br>Grocery
          </span>
          <span className="logo" id="emoji2">
            🥓
          </span>
          <span className="logo" id="emoji3">
            🤦‍♀️
          </span>
          <span className="logo" id="emoji6">
            🍠
          </span>
        </div>
        <form onSubmit={handleSubmit} className="input-container">
          <div>
            <label htmlFor="name">คุณชื่อ</label>
            <input
              id="name"
              className="init"
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <br></br>
            <label htmlFor="budget">แม่ให้เงินมา</label>
            <input
              id="budget"
              className="init budget-width"
              type="text"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setBudget(e.target.value);
              }}
            ></input>
            <span>บาท</span>
          </div>
          {isError && <div className="error">โปรดใส่ชื่อและจำนวนเงิน</div>}
          <button className="start-button">ไปซื้อของกัน!</button>
        </form>
      </div>
    </div>
  );
}

export default InputPage;
