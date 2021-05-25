import { BrowserRouter as Router } from "react-router-dom"
import Headers from "./components/headers/Headers";
import { DataProvider } from "./GlobalState"
import Pages from './components/mainPages/Pages';



function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Headers />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;


