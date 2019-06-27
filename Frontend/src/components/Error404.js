import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
// Authentication
import auth from "../main/auth";


export default class Error404 extends Component {
    constructor() {
        super();
        this.TakeMeBack = this.TakeMeBack.bind(this);
    }    
    TakeMeBack(){
        console.log(auth);
        // if (auth.authenticated) this.props.history.push('/movies')
        this.props.history.push('/movies');
    }

    
    render() {
        return (
            <div>
                <Column vertical='center'>
                    <br/>
                    <Row flexGrow={1} horizontal='center'>
                        <h1>Oops!</h1>
                    </Row>
                    <Row flexGrow={1} horizontal='center'>
                        <h4>Sorry, data couldn't be Found!</h4>
                    </Row>
                    <br/>
                    <Row horizontal='center'>
                        <Link to="#">
                        <button type="button" onClick={this.TakeMeBack} className="btnclr btn btn-danger">Back to main page</button>
                        </Link>
                    </Row>
                </Column>
            </div>
        )
    }
}