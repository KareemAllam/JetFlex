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

const CommentAssign = props => (
    <Row>
        <p><strong>{props.comment.username.slice(0,15)}</strong>: {props.comment.comment}</p>
    </Row>
)



export default class ViewMovie extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.AddComment = this.AddComment.bind(this);
        this.state = {
            id: "dsa",
            name: 'none',
            director: "director",
            date: 2018-23-2,
            author: 'null',
            heros: 'null',
            description: 'null',
            rate:33,
            isPublished: false,
            type: "Action",
            poster:"./images/movie.svg",
            comments:[],
            AddedComment:""
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => 
            this.main(), 1000);
    }

    
    main() {
        axios.get('http://localhost:4000/movies/'+this.props.match.params.id)            
        .then(response => {          
            if (response.data.name === undefined){
                console.log(response.data.name)
                this.props.history.push('/404');
            }
            else {                 
                this.setState({
                    id: response.data._id,
                    name: response.data.name,
                    author: response.data.author,
                    heros: response.data.heros,
                    director: response.data.director,
                    description: response.data.description,
                    type : response.data.type,
                    rate : response.data.rate,
                    isPublished : response.data.isPublished,
                    date : response.data.date,
                })
                console.log(this.state.id, this.state.name)
                
                if (response.data.poster !== ""){
                    this.setState({
                        poster:response.data.poster
                    });
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        })


     axios.get('http://localhost:4000/movies/comments/'+this.props.match.params.id)
            .then(response => {
                this.setState({comments: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
            console.log(auth)    
}

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    onLogout(){
        localStorage.setItem("Auth",false)
        auth.logout(() => {
            this.props.history.push("/");
        });
    }

    onChangeComment(e) {
        this.setState({
            AddedComment: e.target.value
        });
    }   

    comments() {
        return this.state.comments.map(function(currentTodo, i) {
            return <CommentAssign comment={currentTodo} key={i} />;
        });
    }

    AddComment(){
        console.log(this.state.id)
        const newcomment = {
            movieId: this.state.id,
            username: localStorage.getItem('Username'),
            comment: this.state.AddedComment
        }
        console.log(newcomment)
        axios.post('http://localhost:4000/movies/comments/'+this.props.match.params.id, newcomment)
            .then(res => {
                console.log(res.data);

            });
    }


    render() {
        const logo2 = require(`${this.state.poster}`);
        const date = `${this.state.date}`.slice(0,10)
        const editurl = `/edit/${this.state.id}` 
        return (
            <div className="container" >       
                <nav className="navbar navbar-expand-sm bg-light navbar-light justify-content-end">
                <Link className="navbar-brand" to="/movies" >
                    <img src={logo} width="50" height="50" alt="Flex Logo"/>
                </Link>

                <Link to="/movies" className="jetflex navbar-brand">JetFlex</Link>

                {/* <Link className="hi navbar-brand">hi, {localStorage.getItem("Username")}</Link>
                 */}
            
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
                <Row horizontal='spaced'> 
                    <Column>
                    <h2>Name:</h2>
                    <p>{this.state.name}</p>
                    </Column>
                    {
                        localStorage.getItem('Admin') === "true"  
                        ?(
                            <Column>
                                <Link to={editurl}>
                                    <button type="button" className="fonblk btn btn-danger">Edit Entry</button>
                                </Link>
                            </Column>
                        )
                        :null
                    }
                </Row>             
                <Row justifyContent="space-between">
                    <Column >
                        <h2>Description:</h2>
                        <p>{this.state.description}</p>                                                    
                    </Column>                      
                    <Column>
                        <img src={logo2} width="250" height="250" alt="CodingTheSmartWay.com" />
                    </Column>
                </Row>
                <br/> <br/>
                <Row vertical='center'>
                    <Column flexGrow={1} horizontal='center'>
                        <h3> Director: </h3>
                        <span> {this.state.director} </span>
                    </Column>                 
                    <Column flexGrow={1} horizontal='center'>
                        <h3> Author: </h3>
                        <span> {this.state.author} </span>
                    </Column>                     
                    <Column flexGrow={1} horizontal='center'>
                        <h3> Date: </h3>
                        
                        <span> {date} </span>
                    </Column>
                </Row>
                
                <br/> <br/>
                
                <Row vertical='center'>
                    <Column flexGrow={1} horizontal='center'>
                        <h3> Rating: </h3>
                        <span> {this.state.rate}% </span>
                    </Column>
                    
                    <Column flexGrow={1} horizontal='center'>
                        <h3> Cast: </h3>
                        <span> {this.state.heros} </span>
                    </Column>
                </Row>
                <br/>
                <Column>
                    <Row>
                        <table className="table table-striabtned" style={{ marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th>Comments Section</th>
                                </tr>
                            </thead>
                        </table>
                    </Row>
                    { this.comments() }
                    <Row>
                        <Column>
                        <input  type="text"
                                className="form-control col-sm-"
                                placeholder="add a new comment..."
                                // onChange={this.onChangeMovieName}
                                minLength="5" maxLength="20"
                                size='9999'
                                onChange={this.onChangeComment}
                            />             
                        </Column>
                        <Column>
                        <p>&nbsp;&nbsp;&nbsp;</p>
                        </Column>

                        <Column>
                            <button type="button" onClick={this.AddComment} className="fonblk btn btn-danger">Post</button>
                        </Column>

                    </Row>
                </Column>
                <br/> <br/>             
                
                <Row vertical='center'>
                    <Column  flexGrow={1} horizontal='center'>                       
                        <Link to="/movies">
                            <button type="button" className="fonblk btn btn-danger">Back to main page</button>
                        </Link>
                    </Column>
                </Row>
                <br/> <br/>
            </div>
        )
    }
}