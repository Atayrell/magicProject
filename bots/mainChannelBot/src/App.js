import "./App.css";
import React from "react";

const tg = window.Telegram.WebApp;
function App() {
  React.useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      work
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
