import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.svg'
import { LANGUAGE } from '../../utils/constant'
import { CHANGE_LANGUAGE_APP } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
class HomePage extends Component {
    changeLanguage = (language) => {
        this.props.CHANGE_LANGUAGE_APP_REDUX(language)
    }
    returnToHomePage = () => {
        this.props.history.push(`/home`)
    }
    render() {
        console.log("check log:", this.props.language);
        return (
            <Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} onClick={() => this.returnToHomePage()} 
                            title='Booking Care'/>

                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id='homeheader.speciality' /></b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.search_doctor' /></div>
                            </div>

                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id='homeheader.Health_facilities' /></b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.select_room' /></div>

                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id='homeheader.doctor' /></b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.select_doctor' /></div>

                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id='homeheader.fee' /></b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.General_health_check' /></div>
                            </div>
                        </div>

                        <div className='right-content'>
                            <div className='support'> <i className="fas fa-question-circle"> <FormattedMessage id='homeheader.support' /></i></div>
                            <div className={this.props.language === LANGUAGE.VI ? 'language-vn active' : 'language-vn'}><span onClick={() => { this.changeLanguage(LANGUAGE.VI) }}>VN</span></div>
                            <div className={this.props.language === LANGUAGE.EN ? 'language-en active' : 'language-en'}><span onClick={() => { this.changeLanguage(LANGUAGE.EN) }}>EN</span></div>

                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1" /></div>
                            <div className='titel2'><FormattedMessage id="banner.title2" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh'></input>
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='option'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fa fa-heartbeat"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fa fa-stethoscope"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fa fa-medkit"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child6" /></div>
                                </div>

                            </div>
                        </div>


                    </div>
                }
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        CHANGE_LANGUAGE_APP_REDUX: (language) => dispatch(CHANGE_LANGUAGE_APP(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
