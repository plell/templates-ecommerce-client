import { BrowserRouter } from "react-router-dom";
import Dynamic from "./components/dynamic";
import Core from "./components/core";

function App() {
  return (
    <BrowserRouter>
      <Core />
      <Dynamic />
    </BrowserRouter>
  );
}

export default App;
