import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils';
import {  Modal } from 'reactstrap';
import './BookingModal.scss'
import ProfileDoctor from "../ProfileDoctor"
import _ from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import Select from 'react-select';
import {postPatientBookingAppointment} from '../../../../services/userService'
import {toast} from 'react-toastify';

import moment from 'moment'
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
            email:'',
            address: '',
            reason: '',
            genders:'',
            selectedGender: '',
            doctorId: '',
            birthday: '',
            timeType: '',
            timeString: '',
            isShowLoading: false
        }
    }
    async componentDidMount (){
        await this.props.getGenders()
    }
    async componentDidUpdate(prevProps, prevState){
        if(this.props.language !== prevProps.language){
            this.setState({
                genders: this.buildData(this.props.genders)
            })
        }
        if(this.props.genders !== prevProps.genders){
            this.setState({
                genders: this.buildData(this.props.genders)
            })
        }
        if(this.props.dataTime !== prevProps.dataTime){
            let {dataTime} = this.props
            if(dataTime && !_.isEmpty(dataTime)){
                this.setState({
                    doctorId : dataTime.doctorId,
                    timeType : dataTime.timeType
                })
            }
        }
    }
    buildData = (item)=>{
        let result = [];
        let {language} = this.props
        if(item && item.length>0)
        result = item.map(item=>{
            let obj = {}
            obj.label = language ===LANGUAGES.VI ? item.valueVi : item.valueEn
            obj.value = item.keyMap
            return obj 
        })
        return result
    }
    handleOnchangeInput = (e, id)=>{
        let valueInput = e.target.value;
        let copySate = {...this.state}
        copySate[id] = valueInput
        this.setState({...copySate})
        }
    handleOnChangeDatePicker = (date)=>{
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedOption)=>{
        this.setState({
            selectedGender: selectedOption
        })
    }
    handleConfirmBooking = async()=>{
        let date = new Date(this.state.birthday).getTime()
        let thisDate = new Date(this.props.dataTime.date).getTime()
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let { nameVi, nameEn, language} = this.props
        this.setState({ 
            isShowLoading: true
        })
        let res = await postPatientBookingAppointment({
                name: this.state.name,
                phoneNumber: this.state.phoneNumber,
                email:this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                selectedGender: this.state.selectedGender.value,
                doctorId: this.state.doctorId,
                date: thisDate,
                birthday: date,
                timeType: this.state.timeType,
                language: this.props.language,
                timeString: timeString,
                doctorName: language === LANGUAGES.VI ? nameVi : nameEn
        }) 
        if(res && res.info.errCode === 0){
            toast.success('Booking appointment successful!')
            this.setState({
                isShowLoading: false
            })
            this.props.handleCloseBooking()
        }else{
            toast.error('Something went wrong. Please try again!')
        }
    }
    buildTimeBooking = (dataTime)=>{
        let {language}= this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language===LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language===LANGUAGES.VI ?
                moment.unix(+dataTime.dateStyle / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.dateStyle / 1000).locale('en').format('ddd - MM/DD/YYYY') 
                return `${time} - ${date}`
        }
        return ''
    }
    render() {
        let {dataTime, handleCloseBooking} = this.props
        return ( 
            <LoadingOverlay
            active={this.state.isShowLoading}
            spinner
            text = "Loading..."
            >

            <Modal 
            isOpen={this.props.isOpenBooking} 
            size = "lg"
            className='booking-modal-container'
            centered={true}
            >   
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id="patient.booking-modal.info-booking"/></span>
                        <span className='right' onClick = {handleCloseBooking}><i className='fas fa-times'></i></span>

                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-info'>
                            <ProfileDoctor doctorId = {dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId: ''} dataTime ={dataTime} isShowPrice={true} isShowDoctorDes ={true} />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.name"/></label>
                                <input className='form-control' value={this.state.name} onChange={(e)=>this.handleOnchangeInput(e, 'name')}/>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.phone"/></label>
                                <input className='form-control'value={this.state.phoneNumber} onChange={(e)=>this.handleOnchangeInput(e, 'phoneNumber')}/>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.email"/></label>
                                <input className='form-control'value={this.state.email} onChange={(e)=>this.handleOnchangeInput(e, 'email')}/>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.addr"/></label>
                                <input className='form-control'value={this.state.address} onChange={(e)=>this.handleOnchangeInput(e, 'address')}/>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.gender"/></label>
                                <Select
                                value={this.state.selectedGender}
                                onChange={this.handleChangeSelect}
                                options={this.state.genders}
                            />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.birthday"/></label>
                                <DatePicker 
                                    className='form-control' 
                                    onChange={this.handleOnChangeDatePicker}
                                    value = { this.state.birthday}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.reason"/></label>
                                <input className='form-control'value={this.state.reason} onChange={(e)=>this.handleOnchangeInput(e, 'reason')}/>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn btn-primary btn-booking-confirm' onClick={()=>this.handleConfirmBooking()}>Xác nhận</button>
                        <button className='btn btn-danger btn-booking-cancel' onClick = {handleCloseBooking}>Hủy</button>
                    </div>
                </div>
            </Modal>
            </LoadingOverlay>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: ()=>dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
