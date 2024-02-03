import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import HomeHeader from "../../HomePage/HomeHeader"
import './DetailDoctor.scss' 
import {getDetailInfoDoctors} from '../../../services/userService'
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';

class DetailDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            detailDoctor : {},
            currentDoctorId: -1
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let response = await getDetailInfoDoctors(this.props.match.params.id)
            // this.setState({
            //     currentDoctorId: this.props.match.params.id
            // })
            if(response && response.errCode === 0){
                this.setState({
                    detailDoctor : response.data,
                    currentDoctorId: this.props.match.params.id
                })
            }
        }
    }
    render() {
        let {language} = this.props
        let {detailDoctor} = this.state
        let nameVi, nameEn = ''
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} ` 
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName} ` 

        }
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{backgroundImage: `url(${detailDoctor.image && detailDoctor ? detailDoctor.image:''})`}}></div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi: nameEn }
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description 
                                && 
                                <span>{detailDoctor.Markdown.description} </span>
                                }
                            </div>
                        </div>
                    </div>
                    
                    <div className='schedule-doctor'>
                        <div className='schedule-content-left'>
                            <DoctorSchedule doctorId={this.state.currentDoctorId} nameVi={nameVi} nameEn= {nameEn}/>
                        </div>
                        <div className='schedule-content-right'>
                            <DoctorExtraInfo doctorId={this.state.currentDoctorId}/>
                        </div>
                    </div>
                    <div className='detail-doctor-info'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div contentEditable='false' dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML}}></div>

                        }
                    </div>
                    <div className='comment-doctor'></div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
