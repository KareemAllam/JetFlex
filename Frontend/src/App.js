import React, { Component } from 'react';
import { BrowserRouter as Router, Route, HashRouter, Switch} from "react-router-dom";
// Custome Route
import { ProtectedRoute } from "./main/protected.route";
// CSS Styling 
import "bootstrap/dist/css/bootstrap.min.css";
import "./main/style.css";
// Components
import Login from "./components/Login.component";
import MoviesList from "./components/movies-list.component";
import ViewMovie from "./components/view-movie.component";
import CreateMovie from "./components/create-movie.component";
import EditMovie from "./components/edit-movie.component";
import Error404 from "./components/error404.component";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/movies" component={MoviesList} />
          <Route path="*" component={Error404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
