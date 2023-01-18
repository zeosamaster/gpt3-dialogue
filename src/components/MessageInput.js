import React from "react";
import { ContactContext } from "../context/Contact";
import { MessagesContext } from "../context/Messages";
import styles from "./MessageInput.module.css";

export function MessageInput() {
  const { contact } = React.useContext(ContactContext);
  const { sendMessage, resetMessages, isSending } =
    React.useContext(MessagesContext);

  const [userInput, setUserInput] = React.useState("");

  React.useEffect(() => {
    setUserInput("");
    resetMessages();
  }, [contact, resetMessages]);

  const onFormSubmit = React.useCallback(
    (message) => {
      sendMessage(message);
      setUserInput("");
    },
    [sendMessage]
  );

  React.useEffect(() => {
    function keyDown(e) {
      if (!(e.keyCode == 13 && e.metaKey)) return;
      onFormSubmit(userInput);
    }
    document.body.addEventListener("keydown", keyDown);
    return () => document.body.removeEventListener("keydown", keyDown);
  }, [onFormSubmit, userInput]);

  return (
    <form
      className={styles["prompt-container"]}
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit(userInput);
      }}
    >
      <textarea
        className={styles["prompt-input"]}
        value={userInput}
        placeholder={`Write a message`}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <button className={styles["prompt-submit"]} disabled={isSending}>
        {isSending ? (
          <span className={styles["loader"]}></span>
        ) : (
          <img height="16" width="16" src="/send.png" />
        )}
      </button>
    </form>
  );
}
