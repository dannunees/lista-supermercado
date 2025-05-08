import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Carrinho from "./pages/Carrinho.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrinho" element={<Carrinho />} />
    </Routes>
  </BrowserRouter>
);
