import react, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const addFriend = () => {
    alert(name + age);
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
