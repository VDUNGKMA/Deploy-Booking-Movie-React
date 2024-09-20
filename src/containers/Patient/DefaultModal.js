import React, { Component } from 'react';
import { connect } from "react-redux";
import *  as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
class DefaultModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
           
        }
    }
    async componentDidMount() {



    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        

    }
  
    render() {
       
        return (
           <div>defaultmodal</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultModal);
