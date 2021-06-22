import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateRoom from './pages/CreateRoom';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/new" component={CreateRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
