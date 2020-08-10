import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../components/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";

const NotFound = () => {
  return <div>404 Not Found</div>;
};

function Routing() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/main" component={() => <Main />} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Routing;
