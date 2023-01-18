import React from "react";
import { MessagesContext } from "../context/Messages";
import styles from "./Message.module.css";

export function Message({ author, message }) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.scrollIntoView();
  }, []);

  return (
    <div className={styles["row"]} ref={ref}>
      <div
        className={[
          styles["message"],
          author === "User" ? styles["right"] : styles["left"],
        ].join(" ")}
      >
        {message}
      </div>
    </div>
  );
}

export const Messages = () => {
  const { messages } = React.useContext(MessagesContext);

  return (
    <div className={styles["container"]}>
      {messages.map(({ author, message }) => (
        <Message key={message} author={author} message={message} />
      ))}
    </div>
  );
};
