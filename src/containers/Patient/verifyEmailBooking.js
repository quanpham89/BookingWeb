import React, { Component } from 'react';
import { connect } from 'react-redux';
import {verifyBookAppointment} from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader'
import './verifyEmailBooking.scss'
class verifyEmailBooking extends Component {
    constructor(props){
        super(props);
        this.state = {
            statusVerify : false,
            errCode: 0
        }
    }
    async componentDidMount (){

        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await verifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if(res && res.errCode === 0){
                this.setState({
                    statusVerify:true,
                    errCode: res.errCode
                })
            }else{
                this.setState({
                    statusVerify:true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.language !== prevProps.language){
        
        }
        
    }

    
    render() {
        let {statusVerify,errCode} = this.props;
        return ( 
            < >
                <HomeHeader/>
                <div className='verify-email-container'>
                    {statusVerify 
                    ? 
                        <div>
                            {+errCode === 0 ?
                                <div  className='info-booking'>Xác nhận lịch hẹn thành công</div >
                                : 
                                <div className='info-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận  </div>
                            }
                        </div>
                    : 
                    <div className='info-booking'>Lịch hẹn đã được xác nhận!</div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmailBooking);
