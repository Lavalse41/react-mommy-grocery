import { imageSrc } from "../data/imageSrc.js";
import { useContext } from "react";
import { UserInputContext } from "../App.jsx";

function Chatbox() {
  const context = useContext(UserInputContext);
  const formattedBalance = Number(context.userBudget).toLocaleString();

  return (
    <div className="chatbox">
      <div className="msg-outer-wrapper">
        <img src={imageSrc.mommy}></img>
        <div className="msg-wrapper">
          <div className="msg first">
            <p>
              {context.userName} อยู่ข้างนอกใช่มั้ย
              ขากลับแวะตลาดซื้อของให้แม่หน่อย
            </p>
          </div>

          <div className="msg-tail f1"></div>
          <div className="msg-tail b1"></div>

          <div className="msg">
            ฝากซื้อตามนี้ โอนไปให้แล้ว {formattedBalance} นะ
            เอาบิลกับเงินทอนมาคืนด้วย
          </div>
          <div className="msg">
            <div id="phone-container">
              <img
                id="phone"
                src="https://img.icons8.com/ios-filled/50/000000/phone.png"
                alt="phone"
              />
            </div>
            <span>Voice call</span>
            <span>2:50</span>
          </div>
        </div>
      </div>

      <div className="msg-outer-wrapper right">
        <div className="msg-tail f2"></div>
        <div className="msg-tail b2"></div>
        <div className="msg first user">🥒👌👌</div>
        <img src={imageSrc.child}></img>
      </div>
    </div>
  );
}

export default Chatbox;
