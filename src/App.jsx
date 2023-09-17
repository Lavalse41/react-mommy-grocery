import React from "react";
import AppPage from "./page/AppPage.jsx";
import InputPage from "./page/InputPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./appPage.css";
import "./root.css";
export const UserInputContext = React.createContext();

function App() {
  const [userName, setUserName] = useState("");
  const [userBudget, setUserBudget] = useState("");

  function handleUserInput(name, budget) {
    setUserName(name);
    setUserBudget(budget);
  }


  return (
    <UserInputContext.Provider value={{ userName, userBudget }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<InputPage onUserInput={handleUserInput} />}
          />
          <Route path="/grocery" element={<AppPage />} />
        </Routes>
      </BrowserRouter>
    </UserInputContext.Provider>
  );
}

export default App;
