import React, {Component} from 'react';
import {Link} from "react-router-dom";

import axios from 'axios';
import { Column, Row } from 'simple-flexbox';
import './style.css'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            Username:'username',
            Password:'password',
            message: ''
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
        axios.post('http://localhost:4000/movies/Register', user)
            .then(res => {
                if (res.data === "User Already Exists"){
                    this.setState({
                        message:res.data + "! Try again with different Username."
                    })
                }
                else 
                    this.props.history.push('/');
                }
            );

    }

render() {
    return (
        <div>
        <br/><br/>
        <h3 style={{textAlign:"center"}}>Register to JetFlex</h3>
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
                    <Link to='/' replace>
                        <button className="btnclr btn btn-danger">Login Page</button>
                    </Link>
                </Column>                    

                <Column>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                </Column>     

                <Column>
                    <button onClick={this.props.onSubmit} className="btnclr btn btn-danger">Submit</button>
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