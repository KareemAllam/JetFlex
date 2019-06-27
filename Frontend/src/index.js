import React from "react";
import ReactDOM from "react-dom";
import { ProtectedRoute } from "./main/protected.route";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// CSS Styling 
import "bootstrap/dist/css/bootstrap.min.css";
import "./main/style.css";
// Components
import Login from "./components/Login";
import Register from "./components/Register";
import MoviesList from "./components/Movies";
import ViewMovie from "./components/View";
import CreateMovie from "./components/Create";
import EditMovie from "./components/Edit";
import Error404 from "./components/Error404";
import Forbidden from "./components/Forbidden";

function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <ProtectedRoute  path="/movies" component={MoviesList} />
            <ProtectedRoute path="/edit/:id" component={EditMovie} />
            <ProtectedRoute path="/view/:id" component={ViewMovie} />
            <ProtectedRoute path="/create" component={CreateMovie} />
            <Route exact path='/Forbidden' component={Forbidden} />
            <Route path="*" component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
