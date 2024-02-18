import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageClinic.scss'
// import CommonUtils from '../../../utils/CommonUtils';
import { LANGUAGES } from '../../../utils/constant';
import {handleClinic, getAllClinic, getDetailClinic, deleteClinic} from '../../../services/userService'
import {toast} from 'react-toastify'
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address:'',
            descriptionHTML: '',
            descriptionMarkdown: '',
            // imgBase64: '',
            previewImg: '',
            action: 'CREATE',
            listClinic: [],
            selectedClinic: {},
            isChange: false,
            clinicId: '',
            isDelete: false,
            urlImage: '',
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
    // handleOnChangeImage = async(e)=>{
    //     let data = e.target.files[0]
    //     if(data){
    //         let base64 = await CommonUtils.getBase64(data);
    //         let file = URL.createObjectURL(data)
    //         this.setState({
    //             previewImg: file,
    //             imgBase64: base64
    //         })
    //     }
    // }
    buildDataInput = (inputData, type)=>{
        let result = [];
        let language = this.props.language;
        if(inputData && inputData.length>0){
                if(type === 'CLINIC'){
                result = inputData.map((item, index)=>{
                    let obj = {}
                    let labelVi =  item.name 
                    let labelEn =  item.nameEn
    
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value =  item.id
                    return obj
                })
            }

        }
        return result
    }
    
    handleSaveClinic= async()=>{
        let res = await handleClinic({
            name: this.state.name,
            address: this.state.address,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
            // imgBase64: this.state.imgBase64,
            action: this.state.isChange ? "UPDATE" : "CREATE",
            clinicId: this.state.clinicId,
            urlImage: this.state.urlImage

        })
        if(res && res.errCode === 0){
            toast.success(' Success')
            this.setState({
                name: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                // imgBase64: '',
                previewImg: '',
                isChange: false,
                urlImage: ''
            })
        }else{
            toast.error('Something went wrong, please try again')
        }
    }
    handleChangeSelect = async(selectedClinic) => {
        this.setState({ 
            selectedClinic: selectedClinic,
        })
        let selectedClinicId = {
            id: selectedClinic.value
        }
        let res = await getDetailClinic(selectedClinicId)
        if(res && res.errCode === 0 && res.data && typeof res.data.descriptionMarkdown === 'string' ){
            this.setState({ 
                name: res.data.name,
                address: res.data.address,
                descriptionHTML: res.data.descriptionHTML,
                descriptionMarkdown: res.data.descriptionMarkdown,
                clinicId: selectedClinicId.id,
                urlImage: res.data.image
            })
        }else {
            this.setState({ 
                name: "",
                address: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                previewImg: "",
                urlImage: ""
            })
        }
    };
    handleChangeClinic = async()=>{
        this.setState({
            isChange: true,
            selectedClinic: {},
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImg: '',
            urlImage: ""
        })
        let res = await getAllClinic()
        if(res && res.errCode === 0){
            let handleData = this.buildDataInput(res.data, 'CLINIC')
            this.setState({
                listClinic: handleData,
            })
        }
    }
    handleDeleteClinic = async()=>{
        if(this.state.isChange){
            this.setState({
                isDelete: true,
            })
            if(this.state.isDelete){
                let res = await deleteClinic(this.state.selectedClinic.value)
                if(res && res.errCode === 0){
                    toast.success("Delete Clinic Successfully")
                    this.setState({
                        name: '',
                        address: '',
                        descriptionHTML: '',
                        descriptionMarkdown: '',
                        previewImg: '',
                        isChange: false,
                        urlImage: '',
                    })
                }else{
                    toast.error("Please try against")
                }
            }
            
        }
    }

    render() {

        return ( 
            <div className='manage-specialty-container'>
                <div className='title '> <FormattedMessage id="admin.manage-clinic"/></div>
                <div className='add-new-specialty row'>
                    {!this.state.isChange ?
                    <>
                    <div className='col-6 form-group'>
                        <FormattedMessage id="admin.name-clinic"/>
                        <input type='text' className='form-control' value={this.state.name} onChange={(e)=>this.handleOnchangeInput(e,'name')}/>
                    </div>
                    
                    <div className='preview-img-container col-6 form-group'>
                        <div><FormattedMessage id="admin.image"/></div>
                        {/* <input 
                        id='preview-img' 
                        className='form-control' 
                        type='file' 
                        hidden
                        onChange={(e)=>this.handleOnChangeImage(e)}
                        />
                        <label htm
                        lFor='preview-img' className='label-upload'><FormattedMessage id="admin.upload"/> <i className="fas fa-upload"></i></label>
                        <div className='preview-img'style={{backgroundImage: `url(${this.state.previewImg})` }} ></div> */}
                        <input 
                        id='preview-img' 
                        className='form-control' 
                        type='text' 
                        value = {this.state.urlImage}
                        onChange={(e)=>this.handleOnchangeInput(e, "urlImage")}
                        />
                        <div className='preview-img'style={{backgroundImage: `url(${this.state.urlImage})` }}></div>
                    </div>
                    
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.address-clinic"/></label>
                        <input type='text' className='form-control' value={this.state.address} onChange={(e)=>this.handleOnchangeInput(e,'address')}/>
                    </div>
                    <div className='col-12'>
                    <label><FormattedMessage id="admin.info-clinic"/> </label>
                        <MdEditor 
                        style={{ height: '300px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.descriptionMarkdown}
                        />
                    </div>
                </>:
                <>
                <div className='col-6 form-group'>
                    <label><FormattedMessage id="admin.choose-clinic"/></label>
                    <Select
                        value={this.state.selectedClinic}
                        onChange={this.handleChangeSelect}
                        options={this.state.listClinic}
                        placeholder= {<FormattedMessage id="admin.choose-clinic"/>}
                    />
                </div>
                
                <div className='preview-img-container col-6 form-group'>
                        <div><FormattedMessage id="admin.image"/></div>
                        {/* <input 
                        id='preview-img' 
                        className='form-control' 
                        type='file' 
                        hidden
                        onChange={(e)=>this.handleOnChangeImage(e)}
                        />
                        <label htm
                        lFor='preview-img' className='label-upload'><FormattedMessage id="admin.upload"/> <i className="fas fa-upload"></i></label>
                        <div className='preview-img'style={{backgroundImage: `url(${this.state.previewImg})` }} ></div> */}
                        <input 
                        id='preview-img' 
                        className='form-control' 
                        type='text' 
                        value = {this.state.urlImage}
                        onChange={(e)=>this.handleOnchangeInput(e, "urlImage")}
                        />
                        <div className='preview-img'  style={{backgroundImage: `url(${this.state.urlImage})` }}></div>
                    </div>
                <div className='col-6 form-group'>
                    <label><FormattedMessage id="admin.address-clinic"/></label>
                    <input type='text' className='form-control' value={this.state.address} onChange={(e)=>this.handleOnchangeInput(e,'address')}/>
                </div>
                <div className='col-12'>
                    <label><FormattedMessage id="admin.info-clinic"/> </label>
                    <MdEditor 
                    style={{ height: '300px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} 
                    value={this.state.descriptionMarkdown}
                    />
                </div>
            </>
                
                }
                    
                </div>
                <div className='row'>
                    
                    <div className='col-6 form group'>
                        {this.state.isChange ? 
                            <button className='btn btn-danger btn-delete-specialty mt-4' onClick={()=>this.handleDeleteClinic()} ><FormattedMessage id="admin.delete"/></button>
                            :
                            <button className='btn btn-danger btn-delete-specialty mt-4' onClick={()=>this.handleDeleteClinic()} disabled><FormattedMessage id="admin.delete"/></button>
                            
                        }
                    </div>
                    <div className='col-5 form-group'>
                        <button className='btn btn-primary btn-change-specialty mt-4' onClick={()=>this.handleChangeClinic()}><FormattedMessage id="admin.change"/></button>
                    </div>
                    <div className='col-1 form-group'>
                        <button className='btn btn-warning btn-save-specialty mt-4' onClick={()=>this.handleSaveClinic()}><FormattedMessage id="admin.save"/></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
