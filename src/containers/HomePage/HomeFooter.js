import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
class HomeFooter extends Component {

    render() {
     
        return (
            <div className='home-footer text-center'>
              <p>&copy; 2023 BookingCare.clone. More Infomation.
              <a  href='https://github.com/VDUNGKMA' target="_blank">
                &#8594;Plz press here &#8592; 
                </a>


              </p>
            </div>

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
