import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGE, USER_ROLE } from '../../utils/constant'
import _ from 'lodash'
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.CHANGE_LANGUAGE_APP_REDUX(language)
    }
    componentDidMount() {
        let { userInfo } = this.props
        console.log("check user Info ",userInfo)
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.role_id
            if (role === 1) {
                menu = adminMenu
            } else if (role === 2) {
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, language, userInfo, isLoggedIn } = this.props;
      console.log("check user info", userInfo.username)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                {/* Languages*/}
                <div className='languages'>
                    <span className='Welcome'>
                        <FormattedMessage id={"homeheader.Welcome"} />
                        {userInfo && userInfo.username ? userInfo.username : ''}
                    </span>
                    <span className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.handleChangeLanguage(LANGUAGE.VI)}>VN</span>
                    <span className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'} onClick={() => this.handleChangeLanguage(LANGUAGE.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" title='Logout' onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>




            </div>
        );
    }

}

const mapStateToProps = state => {
    console.log('Redux state in Header:', state);
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        CHANGE_LANGUAGE_APP_REDUX: (language) => dispatch(actions.CHANGE_LANGUAGE_APP(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
