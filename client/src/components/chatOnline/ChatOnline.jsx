import "./chatOnline.css";

const ChatOnline = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={`${PF}/person/1.jpeg`} alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <div className="chatOnlineName">vicjky </div>
      </div>
    </div>
  );
};

export default ChatOnline;
