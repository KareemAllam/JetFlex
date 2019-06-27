import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { Column, Row } from 'simple-flexbox';
// CSS Styling
import './style.css'
// Authentication
import auth from "../main/auth";


export default class Login extends Component{
    constructor() {        
        super()
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit1 = this.onSubmit1.bind(this);
        
        this.state = {
            Username:'username',
            Password:'password',
            message:"",
            Login: false
        }
    }
    
 
    onChangeUsername(e) {
        this.setState({
            Username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user= {
            username: this.state.Username,
            password: this.state.Password
        }
        axios.post('http://localhost:4000/movies/Logina', user)
            .then(res => {
                this.setState({
                    message:res.data
                })
                if (res.data[0] === "Valid Login"){
                    auth.login(() => {
                        console.log(auth)
                        localStorage.setItem('Auth', auth.authenticated);
                        localStorage.setItem('Username', res.data[1]);
                        localStorage.setItem('admin', true);
                        localStorage.setItem('user', false);
                        this.props.history.push('/movies');
                    });
                }
            });
    }

    onSubmit1(e){
        e.preventDefault();
        const user= {
            username: this.state.Username,
            password: this.state.Password
        }
        axios.post('http://localhost:4000/movies/Loginu', user)
            .then(res => {
                this.setState({
                    message:res.data
                })
                if (res.data[0] === "Valid Login"){
                    auth.login(() => {
                        console.log(auth)
                        localStorage.setItem('Auth', auth.authenticated);
                        localStorage.setItem('Username', res.data[1]);
                        localStorage.setItem('admin', false);
                        localStorage.setItem('user', true);
                        this.props.history.push('/movies');
                    });
                }
            });
    }





    render() {
        return (
           <div>
            <br/><br/>
            <h3 style={{textAlign:"center"}}>Welcome to JetFlex</h3>
            <br/>
            <form onSubmit={this.onSubmit}>
                <Column horizontal="center">
                    <Row className="form-group">
                        <input  type="text"
                                className="form-control"
                                placeholder="Username"
                                size='50'
                                onChange={this.onChangeUsername}
                                />
                    </Row>             
                    <Row className="form-group">
                        <input  type="password"
                                className="form-control"
                                placeholder="Password"
                                size="50"
                                onChange={this.onChangePassword}
                                />
                    </Row>                              
                </Column>
                <br/>
                <Row horizontal='center'>
                    <Column>
                        <input type="submit" value="Admin Login" className="btnclr btn btn-danger"/>
                    </Column>                    

                    <Column>
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </Column>     
                    <Column>                      
                            <button  onClick={this.onSubmit1} className="btnclr btn btn-danger">User login</button>
                    </Column> 

                    <Column>
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </Column> 
                     
                    <Column>
                        <Link to='/register' replace>
                            <button className="btnclr btn btn-danger">Register now</button>
                        </Link>
                    </Column>  
                   

                    
                      
                                 
                </Row>
                <br/>
                <Row horizontal='center'>
                    <label className="edit">{this.state.message}</label>
                </Row>
            </form>
            </div>
        )
    }
}