import React from "react";
import { ContactContext } from "../context/Contact";
import styles from "./ContactInput.module.css";

export const ContactInput = () => {
  const { contact, setContact } = React.useContext(ContactContext);

  return (
    <div className={styles["contact"]}>
      <img width="50" height="50" src="/user.png" />
      <input
        className={styles["input"]}
        value={contact}
        placeholder="Choose a contact"
        onChange={(e) => setContact(e.target.value)}
      />
    </div>
  );
};
