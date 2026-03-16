import { useState } from "react";
import ClientePage from "./pages/ClientePage";
import CozinhaPage from "./pages/CozinhaPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("cliente");
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div className={`app-shell ${theme}`}>
      <header className="topbar">
        <h1 className="topbar-title">Restaurant App</h1>

        <div className="topbar-actions">
          <nav className="topbar-nav">
            <button
              className={`nav-button ${currentPage === "cliente" ? "active" : ""}`}
              onClick={() => setCurrentPage("cliente")}
            >
              Cliente
            </button>

            <button
              className={`nav-button ${currentPage === "cozinha" ? "active" : ""}`}
              onClick={() => setCurrentPage("cozinha")}
            >
              Cozinha
            </button>
          </nav>

          <button className="theme-button" onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </header>

      {currentPage === "cliente" ? <ClientePage /> : <CozinhaPage />}
    </div>
  );
}

export default App;