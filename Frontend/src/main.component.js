import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import Login from "./components/Login.component";
import CreateMovie from "./components/create-movie.component";
import EditMovie from "./components/edit-movie.component";
import MoviesList from "./components/movies-list.component";
import ViewMovie from "./components/view-movie.component";
import Error404 from "./components/error404.component";

import logo from "./jetflex.png";


class App extends Component {
  render() {
    return (
      <Router>

        <div className="container" >       
          <nav className="navbar navbar-expand-sm bg-light navbar-light justify-content-end">
            <a className="navbar-brand" href="http://localhost:3000" >
              <img src={logo} width="50" height="50" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="jetflex navbar-brand">JetFlex</Link>
            <div className="ml-auto"></div>
            <div className="collapse navbar-collapse flex-grow-0 justify-content-end">
              <ul className="navbar-nav text-right">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">View Movies</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Movie</Link>
                 </li>
              </ul>
            </div> 
          </nav>

          <Switch>
            <Route path="/" exact component={MoviesList} />
            <Route path="/view/:id" exact component={ViewMovie}/>
            <Route path="/edit/:id" component={EditMovie}/>
            <Route path="/create" component={CreateMovie}/>
            <Route component={Error404} />
          </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App;
