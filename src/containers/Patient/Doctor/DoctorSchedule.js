import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss' 
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal'
import {getScheduleByDate} from '../../../services/userService'
class DoctorSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            allDays: [],
            allAvailableTimes: [],
            isOpenBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if(this.props.language !== prevProps.language){
            let arrDate = this.getArrDays()
            this.setState({
                allDays: arrDate
            })
        }
        if(this.props.doctorId !== prevProps.doctorId){
            let doctorId = this.props.doctorId;
            let arrDate = this.getArrDays()
            let res = await getScheduleByDate(doctorId,arrDate[0].value)
            this.setState({
                allAvailableTimes: res.data ? res.data : []
            })
        }
    }
    async componentDidMount(){
        let arrDate = this.getArrDays()
        if(this.props.doctorId){
            let res = await getScheduleByDate(this.props.doctorId,arrDate[0].value)
                this.setState({
                    allAvailableTimes: res.data ? res.data : []
                })

        }
        this.setState({
            allDays: arrDate,
        })
    }
    
    upperCaseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    formatDayOfWeek = (dayOfWeek) =>{
        switch (dayOfWeek) {
            case 'Monday':
                return 'Thứ Hai';
            case 'Tuesday':
                return 'Thứ Ba';
            case 'Wednesday':
                return 'Thứ Tư';
            case 'Thursday':
                return 'Thứ Năm';
            case 'Friday':
                return 'Thứ Sáu';
            case 'Saturday':
                return 'Thứ Bảy';
            case 'Sunday':
                return 'Chủ Nhật';
            default:
                return "";
        }
    }
    getArrDays = ()=>{
        let arrDate= []
        for(let i = 0;i < 7; i++){
            let obj = {} 
            if(this.props.language === LANGUAGES.VI){
                if(i===0){
                    let labelViToday = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${labelViToday}`
                    obj.label = today
                }else{
                    let dayOfWeek = moment().add(i, 'days').format('dddd');
                    let labelVi = moment(new Date()).add(i, 'days').format('DD/MM');
                    let day = `${this.formatDayOfWeek(dayOfWeek)}  - ${labelVi}`
                    obj.label = this.upperCaseFirstLetter(day)
                }
            }else{
                if(i===0){
                    let labelViToday = moment(new Date()).format('DD/MM');
                    let today = `Today - ${labelViToday}`
                    obj.label = today
                }else{
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj)
        }
        return arrDate
    }
    handleOnChangeSelect = async(e)=>{
        if(this.props.doctorId  && this.props.doctorId !== -1){
            let doctorId = this.props.doctorId;
            let dateStyle =  e.target.value
            let response = await getScheduleByDate(doctorId,dateStyle)
            if(response && response.errCode === 0){
                this.setState({
                    allAvailableTimes : response ? response.data : []
                })
            }
            
        }
    }
    handleClickSchedule = (time)=>{
        this.setState({
            isOpenBooking: true,
            dataScheduleTimeModal: time
        })
    }
    handleCloseBooking= ()=>{
        this.setState({
            isOpenBooking: false,
            
        })
    }
    render() {
        let {allDays, allAvailableTimes, dataScheduleTimeModal}= this.state
        let {language, nameVi, nameEn} = this.props
        // console.log(allAvailableTimes)
        // console.log(this.state.allDays)

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(e)=>this.handleOnChangeSelect(e)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index)=>(
                                    <option key = {index} value = {item.value}>{item.label}</option>
                                ))
                            }
                        </select>
                    
                    </div>
                    <div className='all-available-time'>
                        <div className='calendar'>
                            <i className="fas fa-calendar-alt"> <span>{<FormattedMessage id="patient.detail-doctor.schedule"/>}</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTimes && allAvailableTimes.length >0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvailableTimes.map((item,index)=>{
                                            let timeLanguage = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return(
                                                <button key = {index} className={language === LANGUAGES.VI ? 'btn btn-vi' : 'btn btn-en'} onClick={()=>this.handleClickSchedule(item)}>{timeLanguage }</button>
                                            )
                                        })}
                                    </div>
                                    <p className='book-free'>
                                        <span><FormattedMessage id='patient.detail-doctor.choose-book'/><i class="fas fa-hand-point-up"></i></span>
                                    </p >
                                </>
                                : 
                                <p className='no-schedule'><FormattedMessage id='patient.detail-doctor.no-schedule'/></p>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal 
                isOpenBooking={this.state.isOpenBooking} 
                handleCloseBooking={this.handleCloseBooking}
                dataTime={dataScheduleTimeModal}
                nameVi={nameVi}
                nameEn={nameEn}

                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
