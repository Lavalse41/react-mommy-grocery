import { imageSrc } from "../data/imageSrc.js";
import { useContext } from "react";
import { UserInputContext } from "../App.jsx";

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

export default Chatbox;
