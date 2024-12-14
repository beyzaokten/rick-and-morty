import React from "react";
import Header from "./components/Header";
import CharacterList from "./components/CharacterList";
import background from "./assets/background.png";
import rick from "./assets/rick.png";
import morty from "./assets/morty.png";
import "./index.css";

const App = () => {
  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <Header />
      <img src={rick} alt="Rick" className="rick" />
      <img src={morty} alt="Morty" className="morty" />
      <CharacterList />
    </div>
  );
};

export default App;
