import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import'./HomePage.scss';
class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinity: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        }
        return (
            <>
                <HomeHeader isShowBanner = {true}/>
                <Specialty settings= {settings}/>
                <MedicalFacility settings= {settings} />
                <OutstandingDoctor settings= {settings}/>
                <Handbook settings= {settings}/>
                <About />
                <HomeFooter/>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);