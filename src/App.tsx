import React from "react";
import Navbar from "./components/navbar";
import { AppContext } from "./context/context";
const App = () => {
  const [state, setState] = React.useState({});
  return (
    <div className="App">
      <AppContext.Provider value={{ state, setState }}>
        <Navbar />
      </AppContext.Provider>
    </div>
  );
};

export default App;
