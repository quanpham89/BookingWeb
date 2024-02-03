import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import DatePicker from '../../../components/Input/DatePicker';
import {getAllPatientForDoctor, postSendRemedy} from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal'
import './ManagePatient.scss'
import moment from 'moment'
import {toast} from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedy: false,
            dataRemedyModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount (){
        this.getDataPatient()
    }
    getDataPatient = async()=>{ 
        let{user} = this.props;
        let {currentDate} = this.state
        let formatedDate = new Date(currentDate).getTime()
        if(user && user.id ){
            let res = await getAllPatientForDoctor({
                doctorId: user.id,
                date: formatedDate
            })
            if(res && res.errCode === 0){
                this.setState({
                    dataPatient: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.language !== prevProps.language){
        
        }
        
    }

    handleOnChangeDatePicker = (date)=>{
        this.setState({
            currentDate: date[0]
        },async()=>{
            await this.getDataPatient()
        })
    }
    handleConfirm = (item)=>{
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedy: true,
            dataRemedyModal: data
        })
    }
    closeRemedyModal =()=>{
        this.setState({
            isOpenRemedy:false,
            dataRemedyModal: {}
        })
    }
    sendRemedy=async(dataFromRemedyChildModal)=>{
        let {dataRemedyModal} = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            ...dataFromRemedyChildModal,
            doctorId: dataRemedyModal.doctorId,
            patientId: dataRemedyModal.patientId,
            timeType: dataRemedyModal.timeType,
            language: this.props.language,
            patientName: dataRemedyModal.patientName
        })
        if(res && res.errCode ===0){
            toast.success('Send remedy succeed!')
            this.setState({
                isOpenRemedy: false,
                isShowLoading: false
            })
            await this.getDataPatient()

        }else{
            toast.error('Something wrong. Please try again!')
        }
    }
    render() {
        let {dataPatient} = this.state
        console.log(dataPatient)
        let {language} = this.props
        return ( 
            <>
                <div className='manage-patient-container'>
                    <div className='m-p-title'><FormattedMessage id='menu.doctor.manage-patient'/></div>
                    <div className='manage-patient-body row'>
                        <div className='col-4  form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date'/></label>
                            <DatePicker 
                                className='form-control' 
                                onChange={this.handleOnChangeDatePicker}
                                value = { this.state.currentDate}
                                />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table>
                                <tr>
                                    <th><FormattedMessage id='admin.number'/></th>
                                    <th><FormattedMessage id='admin.name'/></th>
                                    <th><FormattedMessage id='manageUser.address'/></th>
                                    <th><FormattedMessage id='manage-schedule.time'/></th>
                                    <th><FormattedMessage id='admin.sex'/></th>
                                    <th><FormattedMessage id='admin.action'/></th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                dataPatient.map((item, index)=>{
                                    return (
                                        <tr key= {index}>
                                            <td>{index+1}</td>
                                            <td>{item.patientData.firstName}</td>
                                            <td>{item.patientData.address}</td>
                                            <td>{language === LANGUAGES.VI ?item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn}</td>
                                            <td>{language === LANGUAGES.VI ?item.patientData.genderData.valueVi : item.patientData.genderData.valueEn}</td>
                                            <td>
                                                <button className='btn btn-primary btn-confirm mx-3' onClick={()=>this.handleConfirm(item)}><FormattedMessage id='booking-modal.confirm'/></button>
                                            </td>
    
                                        </tr>
                                    )
                                }):
                                <td colSpan="6" style={{textAlign:"center"}}>{language === LANGUAGES.VI ? "Không có dữ liệu" : "No data" }</td>
                                }
                                
                                
                            </table>
                        
                        </div>
                    </div>
                </div>
                <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text="Loading..."
                >
                    <RemedyModal isOpenRemedy= {this.state.isOpenRemedy} dataRemedyModal={this.state.dataRemedyModal} closeRemedyModal={this.closeRemedyModal} sendRemedy={this.sendRemedy}/>
                </LoadingOverlay>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
