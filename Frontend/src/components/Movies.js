import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// CSS Styling
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/jetflex.png"
import './style.css';
// Authentication
import auth from "../main/auth";

const Moviee = props => (
    <tr>
        <td>{props.movie.name.slice(0,15)} </td>
        <td>{props.movie.director}</td>
        <td>{props.movie.author}</td>
        <td> {props.movie.type} </td>
        {
        localStorage.getItem('admin') === "true"  
        ?(
            <td> <Link className="edit" to={"/edit/"+props.movie._id} replace >Edit</Link> </td>
        )
        :null
        }
        <td className="view"> <Link className="view" to={"/view/"+props.movie._id}>View</Link> </td> 
    </tr>
)

export default class MoviesList extends Component {
    constructor() {
        super();
        this.onLogout = this.onLogout.bind(this);
        this.state = { movies: [] };
    }


    componentDidMount() {
    this.interval = setInterval(() => 
        this.main(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    movieList() {
        return this.state.movies.map(function(currentMovie, i) {
            return <Moviee movie={currentMovie} key={i} />;
        });
    }
    
    main() {
        axios.get('http://localhost:4000/movies/')
        .then(response => {
            this.setState({movies: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onLogout(){
        localStorage.setItem("Auth",false)
        auth.logout(() => {
            this.props.history.push("/");
        });
    }
    

    render() {
        return (
            <div className="container" >       
                <nav className="navbar navbar-expand-sm bg-light navbar-light justify-content-end">
                <Link className="navbar-brand" to="/movies" >
                    <img src={logo} width="50" height="50" alt="FlexLogo"/>
                </Link>
                <Link to="/movies" className="jetflex navbar-brand">JetFlex</Link>
                <div className="ml-auto"></div>
                <div className="collapse navbar-collapse flex-grow-0 justify-content-end">
                    <ul className="navbar-nav text-right">
                    {
                        localStorage.getItem('admin') === "true"  
                        ?(
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Movie</Link>
                            </li>
                        )
                        :null
                    }
                    <li className="navbar-item">
                        <Link to="#" className="nav-link" onClick={this.onLogout}>Logout</Link>
                    </li>
                    </ul>
                </div> 
                </nav>

                <br/>
                <h3>Check Our Movies</h3>

                <table className="table table-striabtned" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Director</th>
                            <th>Author</th> 
                            <th>Type</th>
                            {
                                localStorage.getItem('Admin') === "true"  
                                ?(
                                    <th>-</th>
                                )
                                :null
                            }
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.movieList() }
                    </tbody>
                </table>
            </div>
        )
    }
}