import React from 'react';
import {Helmet} from "react-helmet";
import _ from 'lodash';
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
        return axios.post(`${hostname}/user/login`, {
            email,
            password,
            client_id,
            redirect_uri,
            response_type,
            state,
            scope
        })
        .then( (response) => {
            this.setState({
                data: response.data.data
            });
        })
        .catch( (error) => {
            let errorMessage = _.get(error, 'response.data.error');
            let errors = ['user not exits!', 'invalid password!', 'error_uri'];
            let { redirect_uri } = this.state;
            if( redirect_uri ){
                if(errors.indexOf(errorMessage) === -1){
                    let url = `${this.state.redirect_uri}/redirect?error=${errorMessage}`;
                    this.props.history.replace(url);
                }
            }  
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
        let url = `${this.state.redirect_uri}/redirect?error=access_denied`;
        this.props.history.replace(url);
    }

    onAllow = () => {
        let url = `${this.state.redirect_uri}/redirect?code=${this.state.data.code}&state=${this.state.data.state}`;
        this.props.history.replace(url);
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