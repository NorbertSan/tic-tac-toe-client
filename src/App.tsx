import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./views/Login/Login";
import Lobby from "./views/Lobby/Lobby";
import Header from "./components/Header/Header";
import AuthGuard from "./guards/AuthGuard";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/list">
          <AuthGuard>
            <Lobby />
          </AuthGuard>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
