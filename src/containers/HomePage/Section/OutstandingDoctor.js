
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions"
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';


class OutStandingDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrDoctors: []
        }
    }
    
    componentDidMount(){
        this.props.loadTopDoctors()
    }

    handleViewDetailDoctor = (doctor)=>{
        if(this.props.history){
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    componentDidUpdate(preProps, preState){
        if(preProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    render() {
        let allDoctors = this.state.arrDoctors
        let {language} = this.props
        return ( 
            <div className='section-share section-outstanding-doctor'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'><FormattedMessage id = 'homepage.out-standing-doctor'/></span>
                    {/* <button className='btn-section'><FormattedMessage id = 'homepage.more-info'/></button> */}
                </div>
                <div className='section-body'>
                    <Slider {...this.props.settings}>
                        
                        {allDoctors && allDoctors.length>0 &&
                        allDoctors.map((item)=>{
                            // let imgBase64 = ''
                            // if(item.image){
                            //     if(item.image){
                            //         imgBase64 = new Buffer(item.image,'base64').toString('binary')
                            //     }
                            // }
                            let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} ` 
                            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}` 

                            return (
                                <div className='section-customize' onClick={()=> this.handleViewDetailDoctor(item)}>
                                    <div className='custom-border'>
                                        <div className='outer-background'>
                                            <div className='bg-img img-outstanding-doctor' style={{backgroundImage: `url(${item.image})` }}></div>
                                        </div>
                                        <div className='position text-center'>
                                            <div >{language === LANGUAGES.VI ? nameVi : nameEn}</div >
                                            {/* <div >Cơ xương khớp </div > */}
                                        </div >
                                    </div>
                                </div>
                            )
                        })
                        }
                    </Slider>

                </div>
            </div>
        </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: ()=> dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)) ;
