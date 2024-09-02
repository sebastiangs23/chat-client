import Parse from 'parse';
import { useState, useEffect } from 'react';
import socketConnect from "./config/socket.config"; 
import axios from 'axios';
import { apiClient } from './config/axios.config';
import "./App.css"


function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  /*______________________
  |  USE EFFECT REQUEST */
  useEffect(() => {
    getUsers();
  }, []);

  /*____________________________
  |  USE EFFECT DEL LIVEQUERY */
  useEffect(() => {
    const { client } = socketConnect();

    client.open();

    //aca se concecta ala clase chatMessage que es la coleccion
    const ChatMessage = Parse.Object.extend('chatMessage');
    const query = new Parse.Query(ChatMessage);

    query.subscribe().then(subscription => {

      subscription.on('open', () => {
        console.log('Abierta');
      });

      subscription.on('create', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      subscription.on('close', () => {
        console.log('Subscription closed');
      });
    }).catch(error => {
      console.error('Failed to subscribe', error);
    });

    // Esta vaina se rompe , tengo q verlo
    // return () => {
    //   query.unsubscribe().then(subscription => {
    //     subscription.unsubscribe();
    //     client.close();  // Cierra la conexión WebSocket al desmontar
    //   });
    // };
  }, []);

  /*__________________
  |  SERVER REQUEST */
  async function getUsers(){
    try{
      const response = await apiClient.post(`/functions/getAllUsers`);
      console.log('here -->', response.data.result.users.users)
      setUsers(response.data.result.users.users);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="app-container">
      
      <aside className="sidebar">
        <h2>Usuarios</h2>
        <ul className="user-list">
          {users && users.map((user, index) => (
            <li key={index} className="user-item">
              {user.username}
            </li>
          ))}
        </ul>
      </aside>

      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index}>
            {message.get('text')}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
