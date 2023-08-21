import AppPage from "./page/AppPage.jsx";
import InputPage from "./page/InputPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import "./root.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/grocery" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
