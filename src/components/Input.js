import React from "react";

export function Input({ onSubmit, isLoading }) {
  const [userInput, setUserInput] = React.useState("");

  const onFormSubmit = React.useCallback(
    (message) => {
      onSubmit(message);
      setUserInput("");
    },
    [onSubmit]
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
      className="prompt-container"
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit(userInput);
      }}
    >
      <textarea
        placeholder="(e.g. climate change and its effects on the environment)"
        className="prompt-box"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <div className="prompt-buttons">
        <button className="generate-button" disabled={isLoading}>
          <div className="generate">
            {isLoading ? <span className="loader"></span> : <p>Generate</p>}
          </div>
        </button>
      </div>
    </form>
  );
}
