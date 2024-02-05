'use client'
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import classes from './page.module.css';

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');

  return (
    <div className={classes["chat-container"]}>
      <div className={classes["chat-input-container"]}>
        <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Message..." className={classes["chat-input"]} />
        <button onClick={(e) => sendMessage(message)} className={classes["chat-button"]}>Send</button>
      </div>
      <div>
        <ul className={classes["messages-list"]}>
          {messages.map((e, index) => (
            <li key={index} className={classes["message-item"]}>{e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
