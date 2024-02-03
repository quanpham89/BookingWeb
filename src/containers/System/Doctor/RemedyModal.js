import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import {  Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import './RemedyModal.scss'
import _ from 'lodash'
import {toast} from 'react-toastify';
import localization from 'moment/locale/vi'
import moment from 'moment'
import CommonUtils from '../../../utils/CommonUtils';


class RemedyModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            imgBase64:''
        }
    }
    async componentDidMount (){
        if(this.props.dataRemedyModal){
            this.setState({
                email: this.props.dataRemedyModal.email
            })
        }
    }
    async componentDidUpdate(prevProps, prevState){
        if(this.props.language !== prevProps.language){
            
        }
        if(this.props.dataRemedyModal !== prevProps.dataRemedyModal){
            this.setState({
                email: this.props.dataRemedyModal.email
            })
            
        }
        
    }
    handleOnchangeEmail= (event)=>{
        this.setState({
            email: event.target.value
        }) 
    }
    handleOnChangeImage = async(e)=>{
        let data = e.target.files[0]
        if(data){
            let base64 = await CommonUtils.getBase64(data);
            let file = URL.createObjectURL(data)
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy=()=>{
        this.props.sendRemedy(this.state)
    }
    render() {
        let {isOpenRemedy,closeRemedyModal, dataRemedyModal} = this.props;
        return ( 
            <Modal 
            isOpen={isOpenRemedy} 
            size = "md"
            className='remedy-modal-container'
            centered={true}
            >   
                <ModalHeader>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Gửi hóa đơn khám bệnh</h5>
                        <button className='close'>
                            <span aria-hidden="true" onClick={closeRemedyModal}>X</span>
                        </button>
                    </div>
                    </ModalHeader>
                <ModalBody >
                    Hello World!
                    <div className='row'>
                        <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input className='form-control' value={this.state.email} type='email'
                                onChange={(e)=>this.handleOnchangeEmail(e)}
                                />
                        </div>
                        <div className='col-6 form-group'>
                                <label>Chọn file đơn thuốc</label>
                                <input className='form-control-file' type='file' onChange={(e)=>this.handleOnChangeImage(e)}/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={()=>this.handleSendRemedy()}>Gửi</Button>
                    <Button color='secondary' onClick={closeRemedyModal}>Đóng </Button>

                </ModalFooter>
        </Modal>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
