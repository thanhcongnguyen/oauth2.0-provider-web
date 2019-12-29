import React from 'react';

export default class ConfirmLogin extends React.Component{
    render(){
        return(
            <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                    <div className="login100-form validate-form">
                        <span className="login100-form-title p-b-55">
                            We Can Talk
                        </span>
    
                        <div className="contact100-form-checkbox" style={{textAlign: 'center'}}>
                            <h4>Bạn có muốn chia sẻ:</h4>
                        </div>

                        <div className="contact100-form-checkbox">
                            1. Thông tin cá nhân: email, phone, address,...
                        </div>
                        <div className="contact100-form-checkbox">
                            2. Ảnh avatar
                        </div>
                        
                        <div className="container-login100-form-btn p-t-25">
                            <button 
                                className="login100-form-btn"
                                onClick={this.props.onAllow}
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}