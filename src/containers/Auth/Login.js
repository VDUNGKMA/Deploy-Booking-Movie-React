import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { GoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";
import { handleLoginApi } from '../../services/userService';
import * as actions from "../../store/actions";
import './Login.scss';
import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassWord: false,
            err: ''
        };
    }

    handleLogin = async () => {
        this.setState({ err: '' });
        try {
            const data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.status === "fail") {
                toast.error(data.errMessage);
                this.setState({ err: data.errMessage });
            }
            if (data && data.status === "success") {
                toast.success("Login Succeeded");
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                this.props.userLoginSuccess(data.data.user);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({ err: error.response.data.errMessage });
            }
        }
    };

    handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google-login`, {
                token: credentialResponse.credential,
            });

            if (response.data.status === 'success') {
                toast.success('Đăng nhập Google thành công!');
                localStorage.setItem('token', response.data.token);
                this.props.userLoginSuccess(response.data.data.user);
            }
        } catch (error) {
            toast.error('Đăng nhập Google thất bại!');
            console.error('Google login error:', error);
        }
    };

    handleGoogleFailure = (error) => {
        toast.error('Đăng nhập Google thất bại!');
        console.error('Google login failure:', error);
    };

    handleShowHidePassword = () => {
        this.setState({ isShowPassWord: !this.state.isShowPassWord });
    };

    handleOnChangeUserName = (event) => {
        this.setState({ username: event.target.value });
    };

    handleOnChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    };

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='text-login'>Login</div>
                        <div className='form-group login-input-email'>
                            <label>Địa chỉ Email</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username@gmail.com"
                                onChange={this.handleOnChangeUserName}
                            />
                        </div>
                        <div className='form-group login-input-password'>
                            <label>Mật khẩu</label>
                            <input
                                type={this.state.isShowPassWord ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                onChange={this.handleOnChangePassword}
                                onKeyDown={this.handleKeyDown}
                            />
                            <span onClick={this.handleShowHidePassword}>
                                <i className={this.state.isShowPassWord ? "far fa-eye" : "far fa-eye-slash"}></i>
                            </span>
                        </div>
                        <div className='form-group' style={{ color: 'red' }}>
                            {this.state.err}
                        </div>
                        <button className='btn-login' onClick={this.handleLogin}>Đăng nhập</button>
                        <span
                            className="forgot-password-link"
                            onClick={() => this.props.navigate('/forgot-password')}
                        >
                           Quên mật khẩu
                        </span>

                        <div className='social-login'>
                            <GoogleLogin
                                onSuccess={this.handleGoogleSuccess}
                                onError={this.handleGoogleFailure}
                                render={(renderProps) => (
                                    <button className="btn-google-login" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        <i className="fab fa-google"></i> Đăng nhập bằng Google
                                    </button>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
