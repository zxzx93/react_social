import { useContext, useEffect, useState, useRef } from "react";
import Axios from "axios";
import "./Messenger.css";
import { io } from "socket.io-client";

import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  //socket
  const socket = useRef(io("ws://localhost:8900"));
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log("유저정보", users);
    });
  }, [user]);

  useEffect(() => {
    socket.current  = io("ws://localhost:8900");
  }, [ ]);
  

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await Axios.get(`/api/conversations/${user._id}`);
        // console.log("메세지 가져오기", res);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await Axios.get("/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const handleSubmit = async () => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await Axios.post("/api/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //새로운 메세지로 스크롤 이동시킴
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              className="chatMenuInput"
              type="text"
              placeholder="친구를 검색하세요."
            />
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation currentUser={user} conversation={conversation} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef} key={message._id}>
                      <Message
                        own={message.sender === user._id}
                        message={message}
                      />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="writing someting.... "
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                open a conversation to chat
              </span>
            )}
          </div>
        </div>

        <div className="chatOline">
          <div className="chatOlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
