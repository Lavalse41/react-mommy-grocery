import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputPage({ onUserInput }) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    onUserInput(name, budget);
    navigate("/grocery");
  }

  return (
    <div className="app">
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
            className="init"
            type="text"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
              setBudget(e.target.value);
            }}
          ></input>
        </div>
        <button className="start-button">ไปซื้อของกัน!</button>
      </form>
    </div>
  );
}

export default InputPage;
