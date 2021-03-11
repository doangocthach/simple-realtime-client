import './App.css';
import socketIOClient from "socket.io-client";
import { useEffect, useRef, useState } from 'react';
const socket = socketIOClient("http://localhost:8080/");
function App() {
  const ref = useRef(false);
  const [state, setstate] = useState([]);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (ref.current === false) {
      socket.emit("show_message");
      socket.on("get_data", data => getData(data));
      ref.current = true;
    }
    return () => {
      socket.off("show_message")
      socket.off("add_message")
    }
  }, [])
  const getData = data => {
    setstate(data)
  }
  const sendData = () => {
    socket.emit("add_message", msg)
    socket.emit("show_message");
    setMsg("")
  }
  const changeText = e => {
    setMsg(e.target.value)
  }
  return (
    <div className="App">
      <input value={msg} onChange={changeText} />
      <button onClick={sendData}>send</button>
      <ul>
        {
          state.map(e => {
            return <li>{e.msg}</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
