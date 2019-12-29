import React from 'react';

export default class FormLogin extends React.Component{
    render(){
        return(
            <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                    <div className="login100-form validate-form">
                        <span className="login100-form-title p-b-55">
                            We Can Talk
                        </span>
    
                        <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid email is required: ex@abc.xyz">
                            <input 
                                className="input100" 
                                type="text" 
                                name="email" 
                                id="email" 
                                placeholder="Email"
                                onChange = {(e) => this.props.onInputEmail(e.target.value)}
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
                                onChange = {(e) => this.props.onInputPassword(e.target.value)}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <span className="lnr lnr-lock"></span>
                            </span>
                        </div>
                        {this.props.error && <div style={{color: '#ed2049'}}>{this.props.error}</div>}
                        <div className="container-login100-form-btn p-t-25">
                            <button 
                                className="login100-form-btn"
                                onClick={this.props.onLogin}
                            >
                                Đăng nhập
                            </button>
                        </div>
    
                        <div className="text-center w-full p-t-50">
                            <span className="txt1">
                                Chưa có tài khoản?
                            </span>
    
                            <a className="txt1 bo1 hov1" href="/register">
                                Đăng ký							
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}