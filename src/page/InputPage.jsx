import { useState } from "react";

function InputPage() {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <div className="app">
      <div className="input-container">
        <div>
          คุณชื่อ <input className="init" type="text"></input>
          <br></br>
          แม่ให้เงินมา <input className="init" type="text"></input>
        </div>
        <button className="start-button">ไปซื้อของกัน!</button>
      </div>
    </div>
  );
}

export default InputPage;
