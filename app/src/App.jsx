import React from "react";
import BoardContainer from "./containers/BoardContainer";
import { BoardProvider } from "./contexts/boardContext";
import { ConfirmationProvider } from "./contexts/confirmationContext";

function App() {
  return (
    <BoardProvider>
      <ConfirmationProvider>
        <BoardContainer />
      </ConfirmationProvider>
    </BoardProvider>
  );
}

export default App;
