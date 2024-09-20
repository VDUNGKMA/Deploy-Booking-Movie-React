import React, { Component } from 'react';
import { connect } from "react-redux";
import *  as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import './ProfileDoctors.scss'
import { getProfileDoctorById } from '../../../services/userService';
import _ from 'lodash'
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import { Link } from "react-router-dom";
class ProfileDoctors extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }
    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }


    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGE.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGE.VI ? moment.unix(+dataTime.date / 1000).format("dddd - MM/DD/YYYY")
                : moment.unix(+dataTime.date / 1000).locale('en').format("ddd - DD/MM/YYYY")

            return (

                <>
                    <div>{time} - {date} </div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking" /></div>
                </>
            )
        }
    }

    render() {

        let { dataProfile } = this.state
        let { language, isShowDescriptionDoctor, dataTime,
            isShowLinkDetail, isShowPrice, doctorId } = this.props
        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        console.log('check props', dataTime);
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{
                            backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`
                        }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGE.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>{dataProfile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>

                    </div>

                </div>
                {isShowLinkDetail === true &&
                    <div className='view-detail-doctor'>
                           <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                 
                    </div>

                }
                {isShowPrice === true &&
                    <div className='price'> <FormattedMessage id="patient.booking-modal.price" />
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGE.VI &&
                            <NumericFormat
                                className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                thousandSeparator={true}
                                displayType="text"
                                suffix={'VND'}
                            />
                        }
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGE.EN &&
                            <NumericFormat
                                className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                thousandSeparator={true}
                                displayType="text"
                                prefix={'$'}
                            />
                        }

                    </div>
                }
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctors);
