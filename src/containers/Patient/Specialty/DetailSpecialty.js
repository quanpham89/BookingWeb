import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash'
import HomeHeader from '../../HomePage/HomeHeader' 
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor//DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getDetailSpecialty, getAllCodeService} from '../../../services/userService'
import './DetailSpecialty.scss' 
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrDoctorId : [],
            dataTime: {},
            detailDoctorSpecialty: {},
            listProvince: []
        }
    }
    async  componentDidMount (){  
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let response = await getDetailSpecialty({
                id: this.props.match.params.id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeService('PROVINCE')
            if(response && response.errCode === 0 && resProvince && resProvince.errCode === 0){
                let data = response.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(response.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.forEach((item)=>{
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if(dataProvince && dataProvince.length > 0){
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type:'PROVINCE',
                        valueEn:'All',
                        valueVi:'Toàn quốc'
                    })
                }
                this.setState({
                    detailDoctorSpecialty: response.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.language !== prevProps.language){
        
        }
        
    }


    handleOnChangeSelect = async(e)=>{
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let location = e.target.value
            let response = await getDetailSpecialty({
                id: this.props.match.params.id,
                location: location
            })
            if(response && response.errCode === 0){
                let data = response.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(response.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.forEach((item)=>{
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                
                this.setState({
                    detailDoctorSpecialty: response.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    
    render() {
        let {arrDoctorId, detailDoctorSpecialty, listProvince} = this.state
        let {language} = this.props
        return (  
            <div className='detail-specialty-container'><FormattedMessage id="homepage.outstanding-medical-facilities"/>
                <HomeHeader/>
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {detailDoctorSpecialty && !_.isEmpty(detailDoctorSpecialty) &&
                            <div contentEditable='false' dangerouslySetInnerHTML={{ __html: detailDoctorSpecialty.descriptionHTML}}></div>

                        }
                    </div>
                    <div className='search-sp-doctor'>
                        <select onChange={(e)=>this.handleOnChangeSelect(e)}> 
                            {
                                listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index)=>{
                                    return (
                                        <option key = {index} value = {item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.En}</option>
                                    )
                                })
                            }
                            
                        </select>
                    </div>
                    <div className='schedule-content-left' >
                        {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index)=>{
                            return (
                                <div className='each-doctor'  key={index}>
                                    <div className='dt-content-left'>
                                        <ProfileDoctor doctorId={item} isShowDoctorDes = {true} isShowLinkDetail = {true} isShowPrice={false} dataTime= {this.state.dataTime}/>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'><DoctorSchedule doctorId={item} /></div>
                                        <div className='doctor-extra-info'><DoctorExtraInfo doctorId={item}/></div>
                                    </div>
                                </div>
                            )
                        })
                        } 
                        
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
