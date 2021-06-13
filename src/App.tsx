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
import { UserNameProvider } from "./context/UserNameContext";

const App: React.FC = () => {
  return (
    <section className="max-w-screen-lg w-full mx-auto">
      <UserNameProvider>
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
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </UserNameProvider>
    </section>
  );
};

export default App;
