import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES} from '../../../utils/constant';
import  './DoctorExtraInfo.scss';
import {getExtraInfoDoctorById} from '../../../services/userService'
import NumericFormat  from 'react-number-format';

class DoctorExtraInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo:{}
            
        }
    }
    async componentDidMount (){
        if(this.props.doctorId){
            let res = await getExtraInfoDoctorById(this.props.doctorId);
                if(res && res.errCode === 0){
                    this.setState({
                        extraInfo: res.data
                    })
                }
        }
    }
    async componentDidUpdate(prevProps, prevState){
        if(this.props.doctorId !== prevProps.doctorId){
            let res = await getExtraInfoDoctorById(this.props.doctorId);
            if(res && res.errCode === 0){
                this.setState({
                    extraInfo: res.data
                })
            }
        }
        if(prevProps.language !== this.props.language){
        }
    }

    handleShowHide = ()=>{
        this.setState({
            isShowDetailInfo: !this.state.isShowDetailInfo
        })
    }
    render() {
        let {isShowDetailInfo, extraInfo} = this.state
        let {language} = this.props
        return ( 
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <h6 className='text-address' ><FormattedMessage id='patient.extra-doctor-info.text-address'/></h6>
                    <p className='name-clinic'>{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : '' }</p>
                    <p className='detail-address'>{extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : '' }</p>
                </div>
                <div className='content-down'>
                    {!isShowDetailInfo  ?
                        <div className='short-info'> 
                        <FormattedMessage id='patient.extra-doctor-info.price'/>  
                        {extraInfo && extraInfo.priceTypeData && language ===LANGUAGES.VI &&
                            <NumericFormat displayType="text" className='currency' value={extraInfo.priceTypeData.valueVi}  thousandSeparator="," suffix={'VND'} />
                        }
                        {extraInfo && extraInfo.priceTypeData && language ===LANGUAGES.EN &&
                            <NumericFormat displayType="text" className='currency' value={extraInfo.priceTypeData.valueEn}  thousandSeparator="," suffix={'$'} />
                        }

                            <span onClick={()=>this.handleShowHide()}><strong><FormattedMessage id='patient.extra-doctor-info.detail'/></strong></span>
                        </div>
                    :
                    <>
                        {/* <div className='title-price'><FormattedMessage id='patient.extra-doctor-info.price'/></div> */}
                        <div className='detail-info'> 
                            <div className='price'>
                                <span className='left'><FormattedMessage id='patient.extra-doctor-info.price'/></span> 
                                <span className='right'> 
                                {extraInfo && extraInfo.priceTypeData && language ===LANGUAGES.VI &&
                                    <NumericFormat displayType="text" className='currency' value={extraInfo.priceTypeData.valueVi}  thousandSeparator="," suffix={'VND'} />
                                }
                                {extraInfo && extraInfo.priceTypeData && language ===LANGUAGES.EN &&
                                    <NumericFormat displayType="text" className='currency' value={extraInfo.priceTypeData.valueEn}  thousandSeparator="," suffix={'$'} />
                                }
                                </span>
                            </div>
                            <div className='note'>{extraInfo && extraInfo.note ? extraInfo.note : '' }</div>
                        </div>
                        <div className='payment'>
                        <FormattedMessage id='patient.extra-doctor-info.payment'/>
                            {extraInfo && extraInfo.paymentTypeData && language ===LANGUAGES.VI && extraInfo.paymentTypeData.valueVi  }
                            {extraInfo && extraInfo.paymentTypeData && language ===LANGUAGES.EN && extraInfo.paymentTypeData.valueEn  }

                        </div>
                        <div className='hide-price' > <span onClick={()=>this.handleShowHide()}><strong><FormattedMessage id='patient.extra-doctor-info.hide-price'/></strong></span></div>
                    </>

                    }
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
        // fetchAllDoctors: ()=> dispatch(actions.fetchAllDoctors()),
        // saveDetailDoctors: (data)=> dispatch(actions.saveDetailDoctors(data)),
        // getAllRequireDoctorInfo: ()=> dispatch(actions.getRequireDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
