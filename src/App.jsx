import Parse from "parse";
import { useState, useEffect } from "react";
import socketConnect from "./config/socket.config";
import axios from "axios";
import { apiClient } from "./config/axios.config";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [chatSelecter, setChatSelected] = "";
  const [currentMessage, setCurrentMessage] = useState("");

  //UseEffect Livequery
  useEffect(() => {
    getUsers();
    getRooms();
  }, []);

  //UseEffect Livequery
  useEffect(() => {
    const { client } = socketConnect();

    client.open();

    //aca se concecta ala clase chatMessage que es la coleccion
    const ChatMessage = Parse.Object.extend("chatMessage"); //Filtrarlo por el numero de sala
    const query = new Parse.Query(ChatMessage);

    query
      .subscribe()
      .then((subscription) => {
        subscription.on("open", () => {
          console.log("Abierta");
        });

        subscription.on("create", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        subscription.on("close", () => {
          console.log("Subscription closed");
        });
      })
      .catch((error) => {
        console.error("Failed to subscribe", error);
      });
  }, []);

  //Funciones
  async function getUsers() {
    try {
      const response = await apiClient.post(`/functions/getAllUsers`);
      setUsers(response.data.result.users.users);

    } catch (error) {
      console.log(error);
    }
  }

  async function getRooms() {
    try {
      const response = await apiClient.post(
        `/functions/getAllChatGroupsRooms`,
        {
          page: 20,
        }
      );

      setChatRooms(response.data.result.data.chatrooms);
    } catch (error) {
      console.log(error);
    }
  }

  function selectedChat(item){
    setCurrentMessage(item)
    console.log(item)
  }

  
  return (
    <div className="app-container">
      {/* USUARIOS */}
      <aside className="sidebar">
        <h2>Usuarios</h2>
        <ul className="user-list">
          {users &&
            users.map((user, index) => (
              <li key={index} className="user-item" onClick={() => selectedChat(user)} >
                {user.username}
              </li>
            ))}
        </ul>
      </aside>

      {/* GRUPOS */}
      <aside className="sidebar">
        <h2>Grupos</h2>
        <ul className="user-list">
          {chatRooms &&
            chatRooms.map((item, index) => (
              <li key={index} className="user-item" onClick={() => selectedChat(item)} >
                {item.name}
              </li>
            ))}
        </ul>
      </aside>

      {/* CHAT */}
      <main className="main-content">
        <h1>CHAT CLIENTE</h1>
        {chatSelecter ? (
          <div className="chat-container">
            <div className="messages">
              {messages &&
                messages.map((message) => (
                  <div key={message.id} className="message">
                    {message.text}
                  </div>
                ))}
            </div>
            <div className="input-container">
              <input
                type="text"
                value={currentMessage}
                //onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
              />
              <button
              //onClick={handleSendMessage}
              >
                Enviar
              </button>
            </div>
          </div>
        ) : (
          <h2>No se ha seleccionado ningun chat</h2>
        )}
      </main>
    </div>
  );
}

export default App;
