import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Provider from './pages/Provider';
import FindNotFound from './pages/FindNotFound';



export default function Routes() {
    return (
      <Router>
          <Switch>
            <Route exact path="/oauth/v2/authorize">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/provider-register">
              <Provider />
            </Route>
            <Route path="*">
              <FindNotFound />
            </Route>
          </Switch>
      </Router>
    );
}