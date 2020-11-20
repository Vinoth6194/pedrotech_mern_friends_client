import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const addFriend = () => {
    Axios.post("http://localhost:3001/addFriend", {
      name: name,
      age: age,
    })
      .then(() => {
        alert("Post success");
      })
      .catch(() => {
        alert("Post not succeeded");
      });
  };
  return (
    <div className="App">
      {/* Mern Stack Tutorial from PedroTech */}
      <div className="inputs">
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <button type="submit" onClick={addFriend}>
          Add Friend
        </button>
      </div>
    </div>
  );
}

export default App;
