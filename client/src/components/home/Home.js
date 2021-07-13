import React, { useEffect, useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import axios from '../../axios'

function Home({ socket }) {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");

  const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname });
    } else {
      alert("username and roomname are must !");
    }
  };

  const sendRequest = () => {
    axios.post('/api/testCall', { name: 'hello' })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <div className="homepage">
      <h1>Welcome</h1>
      <input
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <input
        placeholder="Enter room name"
        value={roomname}
        onChange={(e) => setroomname(e.target.value)}
      ></input>
      <Link to={`/chat/${roomname}/${username}`}>
        <button onClick={sendData}>Join</button>
      </Link>
    </div>
  );
}

export default Home;