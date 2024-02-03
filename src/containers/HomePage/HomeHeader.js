import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './HomeHeader.scss'
import { LANGUAGES } from '../../utils/constant';
import  {changeLanguageApp} from '../../store/actions';
// import { Link, withRouter } from 'react-router';
import { Link, withRouter } from 'react-router-dom';


class HomeHeader extends Component {
    changeLanguage = (language)=>{
        this.props.changeLanguageAppRedux(language)
    }
    returnToHome =()=>{
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                        {/* <i className="fas fa-bars"></i> */}
                        <div className='header-logo' title={language === LANGUAGES.EN ?'Nhấn để trở về trang chủ' : 'Click to return homepage'} onClick={()=>this.returnToHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='childcontent'>
                                <div className=''><b><FormattedMessage id="homeHeader.speciality"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeHeader.searchDoctor"/></div>
                            </div>
                            <div className='childcontent'>
                                <div className=''><b><FormattedMessage id="homeHeader.healthFacility"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeHeader.selectRoom"/></div>
                            </div>
                            <div className='childcontent'>
                                <div className=''><b><FormattedMessage id="homeHeader.doctor"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeHeader.selectDoctor"/></div>
                            </div>
                            <div className='childcontent'>
                                <div className=''><b><FormattedMessage id="homeHeader.fee"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeHeader.checkHealth"/></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeHeader.support"/>
                            </div>
                            <div className={language === LANGUAGES.VI ?'language-vi active' : 'language-vi'}><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ?'language-en active' : 'language-en'} title={language === LANGUAGES.EN ?'Đang cập nhập' : 'Is updating'}><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            <div className="login" >
                                <Link to={'/login'}>
                                    <FormattedMessage id="homepage.login"/>
                                </Link>
                            </div>


                        </div>
    
                    </div>
                </div>
                {this.props.isShowBanner &&
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='main-title-header'><FormattedMessage id="banner.mainTitleHeader"/></div>
                        <div className='sub-title-header'><FormattedMessage id="banner.subTitleHeader"/></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child speciality'></div>
                                <div className='text-child'><FormattedMessage id="banner.child1"/></div>
                            </div>    
                            <div className='option-child'>
                                <div className='icon-child remote'></div>
                                <div className='text-child'><FormattedMessage id="banner.child2"/></div>
                            </div>    
                            <div className='option-child'>
                                <div className='icon-child checkAll'></div>
                                <div className='text-child'><FormattedMessage id="banner.child3"/></div>
                            </div>    
                            <div className='option-child'>
                                <div className='icon-child test'></div>
                                <div className='text-child'><FormattedMessage id="banner.child4"/></div>
                            </div>    
                            <div className='option-child'>
                                <div className='icon-child mental'></div>
                                <div className='text-child'><FormattedMessage id="banner.child5"/></div>
                            </div>    
                            <div className='option-child'>
                                <div className='icon-child teeth'></div>
                                <div className='text-child'><FormattedMessage id="banner.child6"/></div>
                            </div>    
                        </div> 
                    </div>
                </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
