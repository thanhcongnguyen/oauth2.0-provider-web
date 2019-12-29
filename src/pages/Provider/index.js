import React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import _ from 'lodash';
import { hostname } from '../../constants';
import './provider.css';

export default class Provider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            client_id: '',
            redirect_uri: '',
            client_secret: '',
            data: '',
            error: ''
        }
    }

    onRegister = () => {
        let { client_id, redirect_uri, client_secret } =  this.state;
        if(!client_id || !redirect_uri || !client_secret){
            this.setState({
                error: 'Vui lòng nhập đầy đủ thông tin!'
            });
            return;
        };

        return axios.post(`${hostname}/provider/create`, {
            client_id,
            redirect_uri,
            client_secret
        })
        .then( (response) => {
            this.setState({
                data: response.data.data,
                error: ''
            });
        })
        .catch( (error) => {
            let errorMessage = _.get(error, 'response.data.error');

            if(errorMessage == 'user exists!'){
                this.setState({
                    error: 'Tài khoản đã tồn tại!'
                });
                return;
            }

            if(errorMessage == 'invalid_request'){
                this.setState({
                    error: 'Yêu cầu không hợp lệ!'
                });
                return;
            }

        });
    }

    onInputClientId = (value) => {
        this.setState({
            client_id: value
        });
    }

    onInputClientSecret = (value) => {
        this.setState({
            client_secret: value
        });
    }

    onInputReURI = (value) => {
        this.setState({
            redirect_uri: value
        });
    }

    goBack = () => {
        window.location.href = '/register';
    }

    render(){
        return(
        <React.Fragment>
            <Helmet>
            <title>Wecantalk.vn - Đăng ký ứng dụng</title>
            </Helmet>
            {
                this.state.data === ''
                && <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title p-b-55">
                                We Can Talk
                            </span>
                            <div class="title-register"><h5>Đăng ký ứng dụng</h5></div>
        
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid email is required: ex@abc.xyz">
                                <input 
                                    className="input100" 
                                    type="text" 
                                    name="Client_Id" 
                                    id="Client_Id" 
                                    placeholder="Id của ứng dụng"
                                    onChange = {(e) => this.onInputClientId(e.target.value)}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-envelope"></span>
                                </span>
                            </div>
        
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                                <input 
                                    className="input100" 
                                    type="text"  
                                    placeholder="Mã bí mật của ứng dụng" 
                                    onChange = {(e) => this.onInputClientSecret(e.target.value)}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-lock"></span>
                                </span>
                            </div>
    
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                                <input 
                                    className="input100" 
                                    type="text" 
                                    placeholder="Domain của ứng dụng" 
                                    onChange = {(e) => this.onInputReURI(e.target.value)}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-lock"></span>
                                </span>
                            </div>
    
                            {this.state.error && <div style={{color: '#ed2049'}}>{this.state.error}</div>}
                            <div className="container-login100-form-btn p-t-25">
                                <button 
                                    className="login100-form-btn"
                                    onClick={this.onRegister}
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
            }
            

            {
                this.state.data !== ''
                && <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title p-b-55">
                                We Can Talk
                            </span>
                            <div className="message-success">Đăng ký ứng dụng thành công!</div>
                            <div className="container-login100-form-btn p-t-25">
                                <button 
                                    className="login100-form-btn"
                                    onClick={this.goBack}
                                >
                                    Tiếp tục
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
            }
            
        </React.Fragment>
        )
    }
}