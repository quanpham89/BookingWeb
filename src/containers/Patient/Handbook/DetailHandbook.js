import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash'
import moment from 'moment'
import HomeHeader from '../../HomePage/HomeHeader' 
import {getDetailHandbookById} from '../../../services/userService'
import './DetailHandbook.scss' 
import { LANGUAGES } from '../../../utils';

class DetailHandbook extends Component {
    constructor(props){
        super(props);
        this.state = {
            detailHandbook: {}
            
        }
    }
    async  componentDidMount (){  
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let res = await getDetailHandbookById({id: this.props.match.params.id})
            if(res && res.errCode === 0){
                this.setState({
                    detailHandbook: res.data
                })
            }
            
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.language !== prevProps.language){
        
        }
        
    }


    
    render() {
        let {language} = this.props
        let {detailHandbook}= this.state
        let createDate = moment(new Date(detailHandbook.createdAt)).format('DD/MM/YYYY')
        let updateDate = moment(new Date(detailHandbook.updatedAt)).format('DD/MM/YYYY')

        return (  
            <div className='detail-handbook-container'>
                <HomeHeader/>
                <div className='detail-handbook-body'>
                    <div className='content-left'>
                        <div className='detail-handbook-title'>{detailHandbook ? detailHandbook.title: ""}</div>
                        <div className='detail-handbook-moreInfo'>
                            <div className='product-of change '>
                                Sản phẩm của 
                                <span> BookingCare</span>
                            </div>
                            <div className='author change'>Tác giả: 
                                <span>{detailHandbook ? detailHandbook.author: ""}</span>
                            </div>
                            <div className='censor change'>Người kiểm duyệt: 
                                <span> Thảo Hoàng</span>
                            </div>
                            <div className='date'>Xuất bản: 
                                <span>{createDate}</span>
                            </div>
                            <div className='update'>Cập nhập lần cuối: 
                                <span> {updateDate}</span>
                            </div>
                        </div>
                        <div className='detail-handbook-intro'>
                            <p>
                            BookingCare hợp tác cùng WeCare247 giúp người nhà, người thân có thể đặt dịch vụ Chăm sóc sức khỏe dành cho người cao tuổi, bệnh nhân tại nhà và bệnh viện nhanh chóng, thuận tiện.
                            </p>
                            <div className='detail-handbook-intro-box'>
                                <div className='detail-handbook-intro-img'>

                                </div>
                                <div className='detail-handbook-intro-text'>BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.</div>
                            </div>
                        </div>
                        <div className='detail-handbook-content'>
                            <div contentEditable='false' dangerouslySetInnerHTML={{ __html: detailHandbook.descriptionHTML}}></div>
                        </div >

                    </div>
                    <div className='content-right'>
                        {/* <ul className='detail-content-list-support-title'>Nội dung chính
                            <li className='detail-content-support-title'>hello</li>
                        </ul> */}
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
