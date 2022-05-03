import Home from "./page/home"
import Join from "./page/join"
import Create from "./page/create"
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
function App() {
  return (
    <div color-scheme="dark" className="App">
    <BrowserRouter>
    <Switch>
    <Route exact path="/">
    <Home/>
    </Route>
    <Route  exact path="/creategame">
    <Create/>
    </Route>
    <Route  exact path="/joingame">
    <Join/>
    </Route>
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
