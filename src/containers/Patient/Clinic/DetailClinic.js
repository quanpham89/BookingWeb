import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import HomeHeader from '../../HomePage/HomeHeader' 
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor//DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getDetailClinic} from '../../../services/userService'
import './DetailClinic.scss' 

class DetailClinic extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrDoctorId : [],
            dataTime: {},
            dataClinic: {},
        }
    }
    async  componentDidMount (){  
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let response = await getDetailClinic({
                id: this.props.match.params.id,
            })
            console.log(response)
            if(response && response.errCode === 0 ){
                let data = response.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(response.data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length > 0){
                        arr.forEach((item)=>{
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                
                this.setState({
                    dataClinic: response.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.language !== prevProps.language){
        
        }
        
    }


    
    render() {
        let {arrDoctorId, dataClinic } = this.state
        return (  
            <div className='detail-specialty-container'>
                <HomeHeader/>
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataClinic && !_.isEmpty(dataClinic) &&


                            <>
                                <div className=''>{dataClinic.name}</div>
                                <div contentEditable='false' dangerouslySetInnerHTML={{ __html: dataClinic.descriptionHTML}}></div>
    
                            </>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
