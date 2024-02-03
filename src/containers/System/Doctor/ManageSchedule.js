import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES} from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash'
import './ManageSchedule.scss'
import {saveBulkScheduleDoctor, getScheduleForDoctor} from '../../../services/userService'
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        const currentDate = new Date()
        currentDate.setHours(0,0,0,0)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: currentDate,
            rangeTime: [],
            allTimeRegistration: [],
            today:"",
            dateStyle: "",
        }
    }
    componentDidMount (){
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
        this.setState({
            dateStyle: new Date(this.state.currentDate).getTime()
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInput(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            if (data && data.length > 0){
                data.forEach(item =>{
                    item.isSelected = false;
                })
            }
            this.setState({
                rangeTime: data
            })
        }
        if(prevProps.language !== this.props.language){
            this.setState({
                today: this.props.language === LANGUAGES.VI ? moment(new Date(this.state.dateStyle)).format('dddd - DD/MM/YYYY') : moment(new Date(this.state.dateStyle)).locale('en').format('ddd - MM/DD/YYYY')
            })
        }
        if(prevState.currentDate !== this.state.currentDate){
            this.setState({
                dateStyle: new Date(this.state.currentDate).getTime()
            })
        }
    }
    buildDataInput = (inputData)=>{
        let result = [];
        let language = this.props.language;
        if(inputData && inputData.length>0){
            result = inputData.map((item, index)=>{
                let obj = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                obj.label = language ===LANGUAGES.VI ? labelVi : labelEn;
                obj.value =  item.id
                return obj;
            })

        }
        return result
    }
    handleChangeSelect = async(selectedDoctor) => {
        this.setState({ 
            selectedDoctor,
        })
    };
    handleOnChangeDatePicker = (date)=>{
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time)=>{
        let { rangeTime } = this.state;
        if(rangeTime && rangeTime.length>0){
            rangeTime.forEach(item => {
                if(item.id === time.id) {
                    item.isSelected = !item.isSelected
                }
            })
            this.setState({ 
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async()=>{
        let {rangeTime, selectedDoctor, currentDate} = this.state
        let result = []
        if(!currentDate){
            toast.error('Invalid Date')
            return
        }
        if(!selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Invalid selected doctor !')
            return
        }
        let formattedDate = new Date(currentDate).getTime();
        if(rangeTime && rangeTime.length> 0){
            let selectedTime = rangeTime.filter(item => item.isSelected)
            if(selectedTime && selectedTime.length>0){
                result = selectedTime.map(schedule =>{
                    let obj = {}
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formattedDate;
                    obj.timeType = schedule.keyMap;
                    obj.dateStyle =  ''+formattedDate
                    return obj
                })
            }else{
                toast.error('Invalid selected Time !')
            return
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate,
        })
        if(res && res.errCode === 0){
            toast.success('Save success!')
        }else{
            toast.error('Error save Time!')
            console.log('error', res)
        }
    }
    handleShowSchedule = async()=>{
        let {language} = this.props
        if(this.state.selectedDoctor.value){
            let dataScheduleForDoctor = await getScheduleForDoctor(this.state.selectedDoctor.value, this.state.dateStyle);
                let objRangeTime = []
                dataScheduleForDoctor.data.forEach((item,idx)=>{
                    objRangeTime.push({
                        date: item.date,
                        valueVi: item.timeTypeData.valueVi
                    })
                })
                this.setState({
                    allTimeRegistration: objRangeTime,
                    today: language === LANGUAGES.VI ? moment(new Date(this.state.dateStyle)).format('dddd - DD/MM/YYYY') : moment(new Date(this.state.dateStyle)).locale('en').format('ddd - MM/DD/YYYY')
                })
            console.log(this.state)
        }else{
            toast.error('Please select Doctor!')

        }
    }
    render() {
        let {rangeTime, allTimeRegistration} = this.state
        let {language} = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1))
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title"/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor'/></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6'>
                            <label><FormattedMessage id='manage-schedule.choose-date'/></label>
                            <DatePicker 
                            className='form-control' 
                            onChange={this.handleOnChangeDatePicker}
                            value = { this.state.currentDate}
                            minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length>0 &&
                            rangeTime.map((item,index)=>{
                                return (
                                    <button key ={index} className={item.isSelected ? 'btn btn-schedule active': 'btn btn-schedule'}  onClick={()=>this.handleClickBtnTime(item)}>
                                        {language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                    </button>
                                )
                            })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary mt-4 btn-save-schedule' onClick={()=>this.handleSaveSchedule()}>
                                <FormattedMessage id='manage-schedule.save'/>
                            </button>
                            <button className='btn btn-warning mt-4 btn-show-schedule' onClick={()=>this.handleShowSchedule()}>
                                <FormattedMessage id='manage-schedule.show-schedule'/>
                            </button>
                        </div>
                        <div className='col-12 list-time'>
                            <table>
                                <tr>
                                    <th><FormattedMessage id='manage-schedule.date'/></th>
                                    <th><FormattedMessage id='manage-schedule.time'/></th>
                                </tr>
                                <tr>
                                    <td>{allTimeRegistration && allTimeRegistration.length > 0 && this.state.today}</td>
                                    <td>
                                {allTimeRegistration &&
                                allTimeRegistration.length > 0 &&
                                allTimeRegistration.map((item,idx)=>{
                                    return(
                                        <button className='btn btn-schedule' key={idx}>
                                            { item.valueVi}
                                        </button>
                                    )
                                })
                                }
                                    </td>
                                </tr>
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: ()=> dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: ()=> dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
