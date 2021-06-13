import React from "react";
import "./App.css";
import GamesList from "./components/GamesList/GamesList";
import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <section>
      <Header />
      <GamesList />
    </section>
  );
};

export default App;
