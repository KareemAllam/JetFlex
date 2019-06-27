import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';


export default class Forbidden extends Component {
    render() {
        return (
            <div>
                <Column vertical='center'>
                    <br/>
                    <Row flexGrow={1} horizontal='center'>
                        <h1>Oops!</h1>
                    </Row>
                    <Row flexGrow={1} horizontal='center'>
                        <h4>You currently don't have access to this page.</h4>
                    </Row>
                    <br/>
                    <Row horizontal='center'>
                        <Link to="/">
                        <button type="button" className="btnclr btn btn-danger">Login Screen</button>
                        </Link>
                    </Row>
                </Column>
            </div>
        )
    }
}