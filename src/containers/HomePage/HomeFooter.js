import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeFooter.scss'

class HomeFooter extends Component {
    render() {
        
        return (
            <div className='home-footer '>
                <div className='home-footer-body'>
                    <div className='content-left'>
                        <div className='logo'></div>
                        <div className='content-left-more-info'>
                            <div className='address'>
                                <FormattedMessage id="homeFooter.address"/>
                                <p>09, Nguyễn Trung, Bắc Từ Liêm, Hà Nội</p>
                            </div>
                            <div className='support'>
                            <FormattedMessage id="homeFooter.contact"/>
                                <p>email@gmail.com</p>
                            </div>
                            <div className='hotline'>
                            <FormattedMessage id="homeFooter.hotline"/>
                                <p>0686475999</p>
                            </div>
                        </div>
                    </div>
                    <div className='content-middle'>
                        <ul className='list-nav'>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.hotline"/></li>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.directory"/></li>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.health"/></li>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.change"/></li>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.recruit"/></li>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.question"/></li>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.clause"/></li>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.policy"/></li>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.solve"/></li>
                            <li className='list-nav-item'><FormattedMessage id="homeFooter.activity"/></li>
                        </ul>
                    </div>
                    <div className='content-right'>
                        <div className='collaboration'>
                            <div className='collaboration-img'></div>
                            <div className='collaboration-moreInfo'>
                                <div className='collaboration-title'>Hello Doctor</div>
                                <div className='collaboration-sub-title'><FormattedMessage id="homeFooter.intro1"/></div>
                            </div>
                        </div>
                        <div className='collaboration'>
                            <div className='collaboration-img'></div>
                            <div className='collaboration-moreInfo'>
                                <div className='collaboration-title'><FormattedMessage id="homeFooter.col2"/></div>
                                <div className='collaboration-sub-title'><FormattedMessage id="homeFooter.intro2"/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='copy'>&copy;2023, Copy by Pham Dinh Quan.
                    <a href='/home'> More Information</a>
                </p>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
