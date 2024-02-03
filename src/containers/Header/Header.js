import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language)=>{
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        let {userInfo} = this.props
        let menu = []
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId
            if(role === USER_ROLE.ADMIN){
                menu = adminMenu
            }else if(role === USER_ROLE.DOCTOR){
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, language } = this.props;
        
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span className='welcome'><FormattedMessage id = 'homeHeader.welcome'/>, {this.props.userInfo ? this.props.userInfo.firstName : ''}</span>
                    <span className={language === LANGUAGES.VI ?'language-vi active' :'language-vi' } onClick={()=>this.handleChangeLanguage(LANGUAGES.VI)} >VN</span>
                    <span className={language === LANGUAGES.EN ?'language-en active' :'language-en' } onClick={()=>this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    <div className="btn btn-logout" onClick={processLogout} title = 'Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
                {/* nút logout */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,

        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
