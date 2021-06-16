import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./views/Login/Login";
import Header from "./components/Header/Header";
import AuthGuard from "./guards/AuthGuard";
import { UserNameProvider } from "./context/UserNameContext";
import GamesLobby from "./views/GamesLobby/GamesLobby";
import Game from "./views/Game/Game";

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
            <Route exact path="/games">
              <AuthGuard>
                <GamesLobby />
              </AuthGuard>
            </Route>
            <Route path="/games/:id">
              <AuthGuard>
                <Game />
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
