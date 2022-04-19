import "./conversation.css";

const Conversation = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <div className="conversation">
      <img
        src={`${PF}/person/1.jpeg`}
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">홍길동</span>
    </div>
  );
};

export default Conversation;
