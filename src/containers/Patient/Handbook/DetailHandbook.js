import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import HomeHeader from '../../HomePage/HomeHeader' 
import {getDetailHandbookById} from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import './DetailHandbook.scss' 

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
        let {detailHandbook}= this.state
        let createDate = moment(new Date(detailHandbook.createdAt)).format('DD/MM/YYYY')
        let updateDate = moment(new Date(detailHandbook.updatedAt)).format('DD/MM/YYYY')

        return (  
            <div className='detail-handbook-container'>
                <HomeHeader/>
                <div className='detail-handbook-body'>
                    <div className='content-left'>
                        <div className='detail-handbook-title'><h3><strong>{detailHandbook ? detailHandbook.title: ""}</strong></h3></div>
                        <div className='detail-handbook-moreInfo'>
                            
                            <div className='author change'><strong><FormattedMessage id='admin.author'/>:</strong>
                                <span>{detailHandbook ? " " + detailHandbook.author: ""}</span>
                            </div>
                            <div className='censor change'><strong><FormattedMessage id='admin.corrector'/>: </strong>
                                <span>Con Vịt Vui Vẻ</span>
                            </div>
                            <div className='date'><strong><FormattedMessage id='admin.publication'/>: </strong>
                                <span>{createDate}</span>
                            </div>
                            <div className='update'><strong><FormattedMessage id='admin.update'/>: </strong>
                                <span> {updateDate}</span>
                            </div>
                        </div>
                        <div className='detail-handbook-intro'>
                            <p><FormattedMessage id='admin.intro-handbook-1'/></p>
                            <div className='detail-handbook-intro-box'>
                                <div className='detail-handbook-intro-img'></div>
                                <div className='detail-handbook-intro-text'><p><FormattedMessage id='admin.intro-handbook-2'/></p></div>
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
