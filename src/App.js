import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [friendsList, setFriendsList] = useState([]);
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
  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        //console.log(response.data);
        setFriendsList(response.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);
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
      {friendsList.map((val) => {
        return (
          <div>
            {/* {val.name}
            {val.age} */}
            <ul>
              <li>
                {val.name} {val.age}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
