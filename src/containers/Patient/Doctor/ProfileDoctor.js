import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment'
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import {getProfileDoctorById} from '../../../services/userService'
import NumericFormat  from 'react-number-format';
import {Link} from 'react-router-dom'
import './ProfileDoctor.scss'

class ProfileDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount (){
        let {doctorId} = this.props
        let data = await this.getInfoDoctor(doctorId)
        this.setState({
            dataProfile: data
        })
        
    }
    async componentDidUpdate(prevProps, prevState){
        if(this.props.language !== prevProps.language){
        
        }
        if(this.props.doctorId !== prevProps.doctorId){
            let data  = await this.getInfoDoctor(this.props.doctorId)
            this.setState({
                dataProfile: data
            })
        }
        
    }

    getInfoDoctor = async(id)=>{
        let result = {}
        if(id) {
            let res = await getProfileDoctorById(id)
            if(res && res.errCode ===0){
                result = res.data
            }
            return result

        }
    }
    render() {
        let { dataProfile} = this.state
        console.log(this.props)
        let {language, isShowDoctorDes, dataTime, isShowLinkDetail, isShowPrice, doctorId}= this.props
        let nameVi, nameEn = ''
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} ` 
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}` 
        }
        let date = language === LANGUAGES.VI ? moment(new Date(dataTime.date)).format('dddd - DD/MM/YYYY') : moment(new Date(dataTime.date)).locale('en').format('ddd - MM/DD/YYYY');

        return ( 
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left' style={{backgroundImage: `url(${dataProfile.image && dataProfile ? dataProfile.image:''})`}}>
                    {isShowLinkDetail &&
                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`}>
                            <FormattedMessage id="homepage.more-info"/>
                        </Link>
                    </div>
                }
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi: nameEn }
                        </div>
                        <div className='down'>
                            {isShowDoctorDes &&
                            <>
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description 
                            && 
                            <span>{dataProfile.Markdown.description} </span>
                            }
                            </>
                            }
                        </div>
                        
                    </div>
                </div>
                
                {isShowPrice &&
                    <div className='price'>
                        <FormattedMessage id="patient.booking-modal.price"/>
                        <span>
                            {dataProfile && dataProfile.DoctorInfo && language === LANGUAGES.VI &&
                            <NumericFormat displayType="text" className='currency' value={dataProfile.DoctorInfo.priceTypeData.valueVi}  thousandSeparator="," suffix={'VND'} />
                            }
                        </span>
                        <span>
                            {dataProfile && dataProfile.DoctorInfo && language === LANGUAGES.EN &&
                            <NumericFormat displayType="text" className='currency' value={dataProfile.DoctorInfo.priceTypeData.valueEn}  thousandSeparator="," suffix={'$'} />
                            }
                        </span>
                    </div>   
                }
                <div className='time'>
                    {dataTime && !_.isEmpty(dataTime) ? date : ''}

                    <div className=''>
                        {dataTime && !_.isEmpty(dataTime) && language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : ''}
                        {dataTime && !_.isEmpty(dataTime) && language === LANGUAGES.EN ? dataTime.timeTypeData.valueEn : ''}
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
