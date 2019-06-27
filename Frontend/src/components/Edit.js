import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { Column, Row } from 'simple-flexbox';
// CSS Styling
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/jetflex.png"
import './style.css';
// Authentication
import auth from "../main/auth";

export default class EditMovie extends Component {

    constructor(props) {
        super(props);
        this.onChangeMovieName = this.onChangeMovieName.bind(this);
        this.onChangeMovieDescription = this.onChangeMovieDescription.bind(this);
        this.onChangeMovieDirector = this.onChangeMovieDirector.bind(this);
        this.onChangeisPublished = this.onChangeisPublished.bind(this);
        this.onChangeMovieHeros = this.onChangeMovieHeros.bind(this);
        this.onChangeMovieAuthor = this.onChangeMovieAuthor.bind(this);
        this.onChangeMovieRate = this.onChangeMovieRate.bind(this);
        this.onChangeMovieType = this.onChangeMovieType.bind(this);
        this.onChangeMovieDate = this.onChangeMovieDate.bind(this);
        this.onLogout = this.onLogout.bind(this);   
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
           name: '',
            date:Date('2019/5/5'),
            description: '',
            director: '',
            isPublished: false,
            rate: 22,
            author: '',
            heros: '',
            poster: '',
            type: 'Action'
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/movies/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    director: response.data.director,
                    isPublished: response.data.isPublished,
                    author: response.data.author,
                    rate: response.data.rate,
                    heros: response.data.heros,
                    date: response.data.date
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    onChangeMovieName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeMovieDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeMovieRate(e) {
        this.setState({
            rate: e.target.value
        });
    }
    onChangeMovieHeros(e) {
        this.setState({
            heros: e.target.value
        });
    }
    onChangeMovieAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }
    onChangeMovieDate(e) {
        this.setState({
            date: e.target.value
        });
    }
    onChangeMovieDirector(e) {
        this.setState({
            director: e.target.value
        });
    }
    onChangeMovieType(e) {
        this.setState({
            type: e.target.value
        });
    }
    onChangeisPublished(e) {
        this.setState({
            isPublished: !this.state.isPublished
        });
    }   

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            description: this.state.description,
            director: this.state.director,
            author: this.state.author,          
            date: this.state.date,
            heros: this.state.heros,
            rate: this.state.rate,
            type: this.state.type,
            isPublished: this.state.isPublished
        };
        axios.put('http://localhost:4000/movies/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
            this.props.history.push('/');
    }

    onLogout(){
        auth.logout(() => {
            this.props.history.push("/");
        });
    }

render() {
    return (
        <div className="container" >       
                <nav className="navbar navbar-expand-sm bg-light navbar-light justify-content-end">
                <Link className="navbar-brand" to="/movies" >
                    <img src={logo} width="50" height="50" alt="Flex Logo"/>
                </Link>
                <Link to="/movies" className="jetflex navbar-brand">JetFlex</Link>
                <div className="ml-auto"></div>
                <div className="collapse navbar-collapse flex-grow-0 justify-content-end">
                    <ul className="navbar-nav text-right">
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Movie</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="#" className="nav-link" onClick={this.onLogout}>Logout</Link>
                    </li>
                    </ul>
                </div> 
                </nav>
                <br/>
            <h3>Update a Movie</h3>
            <br/>
            <form onSubmit={this.onSubmit}>
                <Row horizontal="spaced">
                <Column className="form-group">
                    <label>Name: </label>
                    <input  type="text"
                            className="form-control col-sm-"
                            value={this.state.name} 
                            onChange={this.onChangeMovieName}
                            minLength="5" maxLength="20"
                            size='130'
                             />
                </Column>      
                <Row>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Row>
                                          
                <Column className="form-group">
                    <label>Rate: </label>
                    <input  type="number"
                            className="form-control col-sm-"
                            min="0" max="100"
                            value={this.state.rate} 
                            onChange={this.onChangeMovieRate}
                             />
                </Column>                              
                </Row>
                <Row horizontal='spaced'>
                    <Column>
                        <div className="form-group">
                            <label>Director: </label>
                            <input  type="text"
                                    className="form-control"
                                    minLength="5" maxLength="20"
                                    value={this.state.director}
                                    onChange={this.onChangeMovieDirector}
                                />
                        </div>
                    </Column>
                    <Column>
                        <div className="form-group">
                            <label>Author: </label>
                            <input  type="text"
                                    className="form-control"
                                    value={this.state.author}
                                    onChange={this.onChangeMovieAuthor}
                                />
                        </div>
                    </Column>                       
                    <Column>
                        <div className="form-group">
                            <label>Cast: </label>
                            <input  type="text"
                                    className="form-control"
                                    size="50"
                                    value={this.state.heros}
                                    onChange={this.onChangeMovieHeros}
                                />
                        </div>
                    </Column>
                </Row>

                <div className="form-group" style={{heigt:30}}>
                    <label>Description: </label>
                    <input  type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeMovieDescription}
                             />
                </div>
                <Row horizontal="spaced">
                    <Column>
                    <Row>
                        <Column>
                            <label>Date:&nbsp;</label>
                        </Column>

                        <Column>
                            <input type="date" className="Date" 
                            value={this.state.date}
                            className="calender"
                            onChange={this.onChangeMovieDate}
                            />
                        </Column>
                    </Row>
                    </Column>

                    <Column>
                        <Row>
                            <Column>
                                <label>Category:&nbsp;&nbsp;</label>
                            </Column>
                            
                            <Column>
                                <select 
                                onChange={this.onChangeMovieType}
                                ref={ref => {
                                    this._select = ref
                                }}
                                value={this.state.type}
                                class="form-control-sm">
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Horror">Horror</option>
                                <option value="Tragic">Tragic</option>
                                </select>
                            </Column> 
                        </Row>
                    </Column>
                </Row>  
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Row horizontal='center'>
                        <div className="form-group">
                            <input type="submit" value="Update" className="fonblk btn btn-danger" />
                        </div>   
                </Row>
            </form>
        </div>
    )
}
}
