import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllHandbook} from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { withRouter } from 'react-router-dom';

class Handbook extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataHandbook: [],
        }
    }
    async componentDidMount (){
        let res = await getAllHandbook();
        if(res && res.errCode === 0){
            this.setState({dataHandbook: res.data ? res.data : []})
        }
    }
    componentDidUpdate(){

    }
    handleViewHandbook = (item)=>{
        if(this.props.history){
            this.props.history.push(`/detail-handbook/${item.id}`)
        }
    }
    render() {
        let {dataHandbook} = this.state
        return (
            <div className='section-share section-handbook '>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.handbook"/></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-info"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider{...this.props.settings}>
                        {dataHandbook && dataHandbook.length > 0 &&
                            dataHandbook.map((item, index)=>{
                                return (
                                    <div className='section-customize' key={ index} onClick={()=>this.handleViewHandbook(item)}>
                                        <div className='bg-img img-handbook'style={{backgroundImage: `url(${item.image})` }}></div>
                                        <div className='handbook-title'>{item.title}</div >
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
