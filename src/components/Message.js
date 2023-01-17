import React from "react";

export function Message({ author, message }) {
  return (
    <li className="message-container">
      <div
        className={["message", author === "User" ? "right" : "left"].join(" ")}
      >
        {message}
      </div>
    </li>
  );
}
