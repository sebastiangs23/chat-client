import { useState, useEffect } from "react";
import io from "socket.io-client";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const socket = io("http://localhost:2337/server", {
  withCredentials: true,
});

function App() {
  useEffect(() => {
    handleConnection();
  }, []);

  async function handleConnection() {
    try {
      socket.on("chat message", () => {
        console.log("socket.connected -->", socket.connected); //deberia darme true
        console.log("Aca deberia esta el ID: ", socket.id);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>CHAT CLIENTE</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
  );
}

export default App;
