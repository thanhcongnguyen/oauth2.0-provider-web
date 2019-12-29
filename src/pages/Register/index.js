import React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import _ from 'lodash';
import { hostname } from '../../constants';
import './register.css';

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            re_password: '',
            data: '',
            error: ''
        }
    }

    onRegister = () => {
        let { email, password, re_password } =  this.state;
        if(!email || !password || !re_password){
            this.setState({
                error: 'Vui lòng nhập đầy đủ thông tin!'
            });
            return;
        };

        if(password !== re_password){
            this.setState({
                error: 'Mật khẩu không giống nhau!'
            });
            return; 
        }

        return axios.post(`${hostname}/user/register`, {
            email,
            password
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

    onInputRePassword = (value) => {
        this.setState({
            re_password: value
        });
    }

    goBack = () => {
        window.history.back();
    }

    render(){
        return(
        <React.Fragment>
            <Helmet>
            <title>Wecantalk.vn - Đăng ký</title>
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
                            <div class="title-register"><h5>Đăng ký tài khoản</h5></div>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid email is required: ex@abc.xyz">
                                <input 
                                    className="input100" 
                                    type="text" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Email"
                                    onChange = {(e) => this.onInputEmail(e.target.value)}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-envelope"></span>
                                </span>
                            </div>
        
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                                <input 
                                    className="input100" 
                                    type="password" 
                                    name="pass" 
                                    id="Password" 
                                    placeholder="Mật khẩu" 
                                    onChange = {(e) => this.onInputPassword(e.target.value)}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-lock"></span>
                                </span>
                            </div>
    
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                                <input 
                                    className="input100" 
                                    type="password" 
                                    name="pass" 
                                    id="re-password" 
                                    placeholder="Nhập lại mật khẩu" 
                                    onChange = {(e) => this.onInputRePassword(e.target.value)}
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
                            <div className="message-success">Đăng ký tài khoản thành công!</div>
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