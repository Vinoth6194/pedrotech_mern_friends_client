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
      .then((response) => {
        console.log(response);
        alert("Post success");
        setFriendsList([
          ...friendsList,
          { _id: response.data._id, name: name, age: age },
        ]);
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
          return val._id === id
            ? { _id: id, name: val.name, age: newAge }
            : val;
        })
      );
    });
  };
  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setFriendsList(
        friendsList.filter((val) => {
          return val._id !== id;
        })
      );
    });
    // console.log("askdlk");
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
              <button
                id="removeBrdr"
                onClick={() => {
                  deleteFriend(val._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
