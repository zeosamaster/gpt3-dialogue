import React from "react";
import { Home } from "../screens/Home";
import { ContactContextProvider } from "../context/Contact";
import { MessagesContextProvider } from "../context/Messages";

const HomePage = () => {
  return (
    <ContactContextProvider>
      <MessagesContextProvider>
        <Home />
      </MessagesContextProvider>
    </ContactContextProvider>
  );
};

export default HomePage;
