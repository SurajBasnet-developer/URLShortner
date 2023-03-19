import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import LinkShortner from "./components/LinkShortner";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <LinkShortner />
      </ChakraProvider>
    </div>
  );
}

export default App;
