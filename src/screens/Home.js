import React from "react";
import { ContactInput } from "../components/ContactInput";
import { MessageInput } from "../components/MessageInput";
import { Messages } from "../components/Message";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["contact"]}>
          <ContactInput />
        </div>

        <div className={styles["messages"]}>
          <Messages />
        </div>
        <div className={styles["input-space"]} />
      </div>
      <div className={styles["input"]}>
        <MessageInput />
      </div>
    </>
  );
};
