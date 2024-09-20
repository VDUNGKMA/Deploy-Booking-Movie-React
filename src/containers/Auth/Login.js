import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../../redux';
import './Login.scss';
import { handleLoginApi } from '../../services/userService'
import { userLoginSuccess } from '../../store/actions/userActions';
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
class Login extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            username: '',
            password: '',
            isShowPassWord: false,
            err: ''
        }
    }
    handleLogin = async () => {
        this.setState({
            err: ''
        })
        try {
            const data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.status === "fail") {
                toast.error(data.errMessage);
                this.setState({
                    err: data.errMessage
                })
                console.log(data.errMessage);
            }
            if (data && data.status == "success") {
                toast.success("Login Succeed");
                // Lưu token vào localStorage
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    console.log('Token saved to localStorage:', data.token);
                }
                console.log("chekdl:",data.data.user)
                this.props.userLoginSuccess(data.data.user);
                console.log("Login succeed");

            }
        } catch (error) {

            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        err: error.response.data.errMessage
                    })
                }
            }
            console.log('test: ', error.response);
        }


    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord
        })
    }
    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        });
    };
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleKeyDown = (event) => {
        console.log('check envent ', event);
        if (event.key === 'Enter'|| event.keyCode ===13) {
            this.handleLogin()
        }
    }
    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='text-login'>Login</div>
                        <div className='form-group login-input-email'>
                            <label>Email Address</label>
                            <input type="text" name="username" placeholder="Username@gmail.com"
                                onChange={this.handleOnChangeUserName} />
                        </div>
                        <div className='form-group login-input-password'>
                            <label>Password</label>
                            <input type={this.state.isShowPassWord ? 'text' : 'password'} name="password" placeholder="password"
                                onChange={this.handleOnChangePassword}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            />

                            <span onClick={this.handleShowHidePassword}>

                                <i className={this.state.isShowPassWord ? "far fa-eye" : "far fa-eye-slash"}></i>


                            </span>
                        </div>
                        <div className='form-group' style={{ color: 'red' }}>
                            {this.state.err}
                        </div>
                        <button className='btn-login' onClick={this.handleLogin}>Login</button>

                        <span
                            className="forgot-password-link"
                            onClick={() => this.props.navigate('/forgot-password')}
                        >
                            Forgot your Password
                        </span>

                        <div className='social-login'>

                            <i className="fab fa-facebook"></i>

                            <i className="fab fa-google-plus"></i>


                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
