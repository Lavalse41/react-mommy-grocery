import AppPage from "./page/AppPage.jsx";
import InputPage from "./page/InputPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./app.css";
import "./root.css";
// export const InputContext = React.createContext();

function App() {
  const [userName, setUserName] = useState("");
  const [userBudget, setUserBudget] = useState("");

  function handleUserInput(name, budget) {
    setUserName(name);
    setUserBudget(budget);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPage onUserInput={handleUserInput} />} />
        <Route
          path="/grocery"
          element={<AppPage userName={userName} userBudget={userBudget} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
