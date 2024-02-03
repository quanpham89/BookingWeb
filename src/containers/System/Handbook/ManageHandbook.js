import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageHandbook.scss'
import CommonUtils from '../../../utils/CommonUtils';
import {toast} from 'react-toastify'
import {handleHandbook} from '../../../services/userService'
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author:'',
            descriptionHTML: '',
            descriptionMarkdown: '',
            imgBase64: '',
            previewImg: '',
            action: 'CREATE'
        }
    }
    componentDidMount (){
        
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.language !== prevProps.language){
        
        }
        
    }

    handleOnchangeInput = (e, type)=>{
        let stateCopy = {...this.state}
        stateCopy[type] = e.target.value
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange= ({html,text})=>{
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }
    handleOnChangeImage = async(e)=>{
        let data = e.target.files[0]
        if(data){
            let base64 = await CommonUtils.getBase64(data);
            let file = URL.createObjectURL(data)
            this.setState({
                previewImg: file,
                imgBase64: base64
            })
        }
    }

    handleSaveHandbook =async()=>{
        console.log(this.state)
        let res = await handleHandbook(this.state)
        if(res && res.errCode === 0){
            toast.success('Create success')
            this.setState({
                name: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imgBase64: '',
                previewImg: '',
            })
        }else{
            toast.error('Something went wrong, please try again')
        }
    }

    render() {

        return ( 
            <div className='manage-handbook-container'>
                <div className='manage-handbook-title'> <FormattedMessage id="admin.manage-handbook"/></div>
                <div className='add-new-handbook row'>
                    <div className='col-6 form-group'>
                    <FormattedMessage id="admin.title"/>
                        <input type='text' className='form-control' value={this.state.title} onChange={(e)=>this.handleOnchangeInput(e,'title')}/>
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.author"/></label>
                        <input type='text' className='form-control' value={this.state.author} onChange={(e)=>this.handleOnchangeInput(e,'author')}/>
                    </div>
                    
                    <div className='preview-img-container col-6 form-group'>
                        <div><FormattedMessage id="admin.image"/></div>
                        <input 
                        id='preview-img' 
                        className='form-control' 
                        type='file' 
                        hidden
                        onChange={(e)=>this.handleOnChangeImage(e)}
                        />
                        <label htmlFor='preview-img' className='label-upload'><FormattedMessage id="admin.upload"/><i className="fas fa-upload"></i></label>
                        <div className='preview-img'style={{backgroundImage: `url(${this.state.previewImg})` }} ></div>
                    </div>
                    
                    <div className='col-12'>
                        <label><FormattedMessage id="admin.article"/></label>
                        <MdEditor 
                        style={{ height: '300px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-warning btn-save-handbook mt-4' onClick={()=>this.handleSaveHandbook()}>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
