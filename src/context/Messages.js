import React from "react";
import { ContactContext } from "./Contact";

export const MessagesContext = React.createContext({
  messages: [],
  sendMessage: () => Promise.reject(),
});

export const MessagesContextProvider = ({ children }) => {
  const { contact } = React.useContext(ContactContext);
  const [messages, setMessages] = React.useState([]);
  const [isSending, setIsSending] = React.useState(false);

  const addMessage = React.useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const resetMessages = React.useCallback(() => {
    setMessages([]);
  }, []);

  const sendMessage = React.useCallback(
    async (message) => {
      if (!message) return;

      setIsSending(true);

      addMessage({ author: "User", message });
      const newMessages = messages.concat({ author: "User", message });

      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, messages: newMessages }),
      });

      const { output } = await response.json();

      addMessage({ author: contact, message: output });
      setIsSending(false);
    },
    [contact, messages]
  );

  const value = { messages, sendMessage, resetMessages, isSending };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};
