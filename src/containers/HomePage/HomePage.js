import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import Handbook from './Section/Handbook';
// import About from './Section/About';
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
                <p className='note-backend'><i >Khi truy cập trang web lần đầu tiên, phía back-end cần một chút thời gian (3-4 phút) để khởi động lại (vì không hoạt động 24/7) nhưng kể từ lần thứ hai sẽ không phải chờ lâu như vậy !</i></p>                <Specialty settings= {settings}/>
                <MedicalFacility settings= {settings} />
                <OutstandingDoctor settings= {settings}/>
                <Handbook settings= {settings}/>
                {/* <About /> */}
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
