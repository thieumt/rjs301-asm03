import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showChatLive, hideChatLive } from "../../store/store";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "./LiveChat.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", { transports: ["websocket"] });

const LiveChat = () => {
  const [message, setMessage] = useState({
    chat: "",
  });

  const [messages, setMessages] = useState([]);
  const [errorInput, setErrorInput] = useState(false);
  const [newMess, setNewMess] = useState(false);

  const isMessage = useSelector((state) => state.chat.isChatLive);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.length === 0) {
      setMessage((val) => ({ ...val, [name]: value }));
    } else {
      setMessage((val) => ({ ...val, [name]: value }));
      setErrorInput(false);
    }
  };
console.log(messages)
  const sendMessage = (e) => {
    e.preventDefault();

    let valid = false;
    if (message.chat === "") {
      setErrorInput(true);
      valid = true;
    } else {
      setErrorInput(false);
      valid = false;
    }

    if (!valid) {
      const data = {
        message: message.chat,
        user: "kh",
      };
      setMessages((messages) => [...messages, data]);
      socket.emit("message", { message: message.chat, user: "kh" });

      setMessage({
        chat: "",
      });
    }
  };

  socket.on("receiver_message", (data) => {
    setNewMess(true);
    setTimeout(() => {
      setMessages((messages) => [...messages, data]);
    }, 1000);
  });

  useEffect(() => {
    setTimeout(() => {
      setNewMess(false);
    }, 1000);
  }, [newMess]);

  // handle show or hiden popup
  const handleMessage = () => {
    if (isMessage === true) {
      dispatch(hideChatLive());
    } else {
      dispatch(showChatLive());
    }
  };
  return (
    <div className="chat_app">
      {isMessage ? (
        <div className="chat_container">
          <div className="chat_content-main">
            <h3 className="chat_title">chat live</h3>
            <button
              type="button"
              className="chat_btn-mess-close"
              onClick={() => {
                dispatch(hideChatLive());
              }}
            >
              X
            </button>
            <div className="chat_content">
              {messages &&
                messages.map((message, index) =>
                  message.user === "kh" ? (
                    <p key={index} className="chat_content-kh">
                      You: 
                      {message.message}
                    </p>
                  ) : (
                    <p key={index} className="chat_content-admin">
                      Admin: {message.message}
                    </p>
                  )
                )}
            </div>
            <div className="chat_form">
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  name="chat"
                  placeholder="Message..."
                  value={message.chat}
                  onChange={handleChange}
                  className="chat_form-input"
                />
                <button
                  className="chat_form-btn"
                  onClick={sendMessage}
                  type="submit"
                >
                  Send
                </button>
              </form>
              {errorInput && (
                <p className="chat_error-input">Enter your input</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <button
        type="button"
        className="chat_btn-mess-on"
        onClick={handleMessage}
      >
        <FontAwesomeIcon icon={faMessage} />
      </button>
    </div>
  );
};

export default LiveChat;
