import React, { useState } from "react";
import CharacterList from "./components/character-list";
import "./App.css";

const App = () => {
  const [searchUrl, setSearchUrl] = useState("people?page=1");
  const [searchText, setSearchText] = useState("");

  const handleKeyUp = e => {
    if (e.key === "Enter") {
      setSearchUrl("people/?search=" + searchText);
    }
  };

  const handleChange = e => {
    setSearchText(e.target.value);
  };
  return (
    <div className="container">
      <img className="logo" src="./logo.png" alt="star wars" />
      <header className="Header">

        <div className="search-title">Search Results </div>
        <input
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          type="search"
          placeholder="Search for a character..."
        />

      </header>
      <CharacterList url={searchUrl} />
    </div>
  );
};

export default App;
