import React from "react";

export const ContactContext = React.createContext({
  contact: "",
  setContact: () => {},
});

export const ContactContextProvider = ({ children }) => {
  const [contact, setContact] = React.useState("");

  const value = { contact, setContact };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};
