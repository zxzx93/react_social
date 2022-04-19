import "./Messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

const Messenger = () => {
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
            <Conversation />
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>

            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="writing someting.... "
              ></textarea>
              <button className="chatSubmitButton">send</button>
            </div>
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
