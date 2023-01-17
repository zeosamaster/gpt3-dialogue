import React from "react";
import Head from "next/head";
import { Input } from "../components/Input";
import { Message } from "../components/Message";

const Home = () => {
  const [character, setCharacter] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const addMessage = React.useCallback((message) => {
    setMessages((prev) => [message, ...prev]);
  }, []);

  const onCharacterSelect = React.useCallback((e) => {
    e.preventDefault();
    setMessages([]);
    setCharacter(e.target.value);
  }, []);

  const post = React.useCallback(
    async (message) => {
      if (!message) return;

      addMessage({ author: "User", message });
      const newMessages = messages.concat({ author: "User", message });

      setIsLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ character, messages: newMessages }),
      });

      const { output } = await response.json();

      addMessage({ author: character, message: output.text });
      setIsLoading(false);
    },
    [character, messages]
  );

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Dialogue</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>GPT-3 Dialogue</h1>
          </div>
          <div className="header-subtitle">
            <h2>Start a conversation with your favorite personality!</h2>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            textAlign: "center",
          }}
        >
          <label>Chosen character</label>
          <input
            value={character}
            onChange={onCharacterSelect}
            style={{
              height: "3em",
              fontSize: "1em",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          />
        </div>

        <Input onSubmit={post} isLoading={isLoading} />

        {messages.map(({ author, message }) => (
          <Message author={author} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Home;
