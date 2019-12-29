import React from 'react';
import {Helmet} from "react-helmet";
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { hostname } from '../../constants';
import FormLogin from './form';
import ConfirmLogin from './confirm';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            redirect_uri: '',
            client_id: '',
            response_type: '',
            state: '',
            scope: '',
            data: '',
        }
    }

    componentDidMount = () => {
        const parsed = queryString.parse(this.props.history.location.search);
        this.setState({
            client_id: parsed.client_id,
            redirect_uri: parsed.redirect_uri,
            response_type: parsed.response_type,
            scope: parsed.scope,
            state: parsed.state
        });
    } 

    onLogin = async () => {
        let { email , password, client_id, redirect_uri, response_type, state, scope } = this.state;
        if(!email || !password){
            return;
        }
        axios.post(`${hostname}/user/login`, {
            email,
            password,
            client_id,
            redirect_uri,
            response_type,
            state,
            scope
        })
        .then( (response) => {
            console.log('response.data.data', response.data.data);
            this.setState({
                data: response.data.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onInputEmail = (value) => {
        this.setState({
            email: value
        });
    }

    onInputPassword = (value) => {
        this.setState({
            password: value
        });
    }

    onDeny = () => {

    }

    onAllow = () => {

    }

    render(){
        return(
        <React.Fragment>
        <Helmet>
        <title>Đăng nhập</title>
        </Helmet>
            {
                this.state.data === '' 
                && <FormLogin 
                    onInputEmail = {this.onInputEmail} 
                    onInputPassword = {this.onInputPassword}
                    onLogin = {this.onLogin}
                />
            }

            {
                this.state.data !== '' 
                && <ConfirmLogin 
                    onDeny={this.onDeny}
                    onAllow={this.onAllow}
                />
            }
        </React.Fragment>)
    }
}

export default withRouter(Login);