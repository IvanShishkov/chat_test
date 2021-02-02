import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Main, Login, Register, Invite } from "./pages";
import { Alert } from "./components/Alert/Alert";
import { PrivateRoute } from "./utils/helpers/PrivateRoute";
import { IsAuthRoute } from "./utils/helpers/IsAuthRoute";

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Alert />
        <Switch>
          <IsAuthRoute path="/login" component={Login} exact />
          <IsAuthRoute path="/register" component={Register} exact />
          <PrivateRoute path="/invite/:id" component={Invite} />
          <PrivateRoute path="/chats/:id" component={Main} />
          <PrivateRoute path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
};
