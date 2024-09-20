import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import Header from '../../Header/Header';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctors from '../Doctor/ProfileDoctors';
import { getAllDetailSpecialtyById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGE } from '../../../utils';
class DetailSpecialty extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }
    async componentDidMount() {
       
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
          
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeService('PROVINCE')
            console.log('check resProvince', resProvince.data);
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
            let dataProvince = resProvince.data
            if(dataProvince && dataProvince.length){
                dataProvince.unshift({
                    createdAt: null,
                    keyMap: 'ALL',
                    type: 'PROVINCE',
                    valueEn: 'ALL',
                    valueVi: 'Toàn quốc'
                })
            }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince
                })
            }

        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }


    }
    handleOnchangeSelect = async(event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = event.target.value
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            })
          
            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
            
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                   
                })
            }
        }
    }
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state
        console.log('check ', this.state);
        let { language } = this.props
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-specialty-body'>

                        <div className='description-specialty'>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div
                                    dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}
                                />
                            }
                        </div>
                        <div className='search-specialty-by-province'>
                            <select onChange={(event) => this.handleOnchangeSelect(event)}>
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                }



                            </select>
                        </div>
                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='detail-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctors
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                    isShowLinkDetail ={true}
                                                    isShowPrice ={false}
                                                //  dataTime={dataTime}

                                                />
                                            </div>
                                        </div>
                                        <div className='detail-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}

                                                />
                                            </div>
                                            <div className='doctor-extra-infor'>
                                                <DoctorExtraInfo
                                                    doctorIdFromParent={item}
                                                />
                                            </div>

                                        </div>
                                    </div>

                                )
                            })}
                    </div>
                </div>

            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
