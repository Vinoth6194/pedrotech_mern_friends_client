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
        setFriendsList([...friendsList, { name: name, age: age }]);
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
  const updateFriend = (id) => {
    const newAge = prompt("Your new age please");
    Axios.put("http://localhost:3001/update", {
      newAge: newAge,
      id: id,
    }).then(() => {
      setFriendsList(
        friendsList.map((val) => {
          return val._id == id ? { _id: id, name: val.name, age: newAge } : val;
        })
      );
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
      <div className="listOfFriends">
        {friendsList.map((val) => {
          return (
            <div className="friendContainer">
              <div className="friend">
                <h3>Name: {val.name}</h3>
                <h3>Age:{val.age}</h3>
              </div>
              <button
                onClick={() => {
                  updateFriend(val._id);
                }}
              >
                Update
              </button>
              <button id="removeBrdr">Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
