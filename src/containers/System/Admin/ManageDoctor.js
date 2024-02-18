import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { LANGUAGES, CRUD_ACTIONS} from '../../../utils/constant';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import  './ManageDoctor.scss';
import Select from 'react-select';
import {getDetailInfoDoctors} from '../../../services/userService'
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            // markdown database
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor: {},
            description:  '',
            listDoctors: [],
            hasOldData: false,
            doctorId:"",

            // doctor-info database.allRequiredDoctorInfo
            listPrice:[],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: {},
            selectedProvince: {},
            selectedPayment: {},
            selectedClinic: {},
            selectedSpecialty: {},
            nameClinic: {},
            note:{},
            addClinic: {},
            clinicId: '',
            specialtyId: ''
        }
    }
    componentDidMount (){
        this.props.fetchAllDoctors()
        this.props.getAllRequireDoctorInfo()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInput(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
            let {resPrice, resPayment,resProvince, resSpecialty, resClinic} = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInput(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInput(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInput(resProvince, 'PROVINCE')
            let dataSpecialty = this.buildDataInput(resSpecialty, 'SPECIALTY')
            let dataClinic = this.buildDataInput(resClinic, 'CLINIC')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment:  dataSelectPayment,
                listProvince:  dataSelectProvince,
                listSpecialty: dataSpecialty,
                listClinic: dataClinic,
                nameClinic: '',
                note:'',
                addClinic: '',

            })
        }
        if(prevProps.language !== this.props.language){
            let doctor = this.props.allDoctors
            let {resPrice, resPayment,resProvince} = this.props.allRequiredDoctorInfo
            let dataSelect = this.buildDataInput(doctor, 'USERS')
            let dataSelectPrice = this.buildDataInput(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInput(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInput(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment:  dataSelectPayment,
                listProvince:  dataSelectProvince,
            })

        }
    }

    buildDataInput = (inputData, type)=>{
        let result = [];
        let language = this.props.language;
        if(inputData && inputData.length>0){
            if(type === 'USERS'){
                result =  inputData.map((item, index)=>{
                    let obj = {}
                    let labelVi =  `${item.lastName} ${item.firstName}` 
                    let labelEn =  `${item.firstName} ${item.lastName}` 
    
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value =  item.id
                    return obj
                })
            }else if(type === 'PRICE' ){
                result = inputData.map((item, index)=>{
                    let obj = {}
                    let labelVi =  `${item.valueVi} VND`
                    let labelEn =  `${item.valueEn} USD`
    
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value =  item.keyMap
                    return obj
                })
            }else if(type === 'PAYMENT' || type === 'PROVINCE'){
                result = inputData.map((item, index)=>{
                    let obj = {}
                    let labelVi =  item.valueVi 
                    let labelEn =  item.valueEn 
    
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value =  item.keyMap
                    return obj

                })
            }else if(type === 'SPECIALTY'){
                result = inputData.map((item, index)=>{
                    let obj = {}
                    let labelVi =  item.name 
                    let labelEn =  item.nameEn
    
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value =  item.id
                    return obj

                })
            }else if(type === 'CLINIC'){
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

    handleSaveContent =()=>{
        let {hasOldData} = this.state
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData ? CRUD_ACTIONS.EDIT :CRUD_ACTIONS.CREATE,
            selectedPrice:  this.state.selectedPrice.value,
            selectedProvince:  this.state.selectedProvince.value,
            selectedPayment:  this.state.selectedPayment.value,
            nameClinic:  this.state.nameClinic,
            note: this.state.note,
            addClinic:  this.state.addClinic,
            clinicId:  this.state.clinicId,
            specialtyId: this.state.specialtyId,

        })
        this.setState({ 
            contentMarkdown: '',
            contentHTML: '',
            description:  '',
            hasOldData: false,
            addClinic: '' ,
            nameClinic: '' ,
            note:  '',
            selectedDoctor:{},
            selectedPrice:  {},
            selectedProvince:  {},
            selectedPayment:  {},
            selectedSpecialty:{},
            selectedClinic: {},
            clinicId: '',
            specialtyId: ''
        })
        
    }



    handleChangeSelect = async(selectedDoctor) => {
        this.setState({ 
            selectedDoctor,
            doctorId: selectedDoctor.value,
        })
        let res = await getDetailInfoDoctors(selectedDoctor.value)
        let {listPayment, listProvince, listPrice, listSpecialty, listClinic, selectedClinic,  selectedPayment, selectedProvince, selectedPrice} = this.state
        if(res && res.errCode === 0 && res.data && typeof res.data.Markdown.contentMarkdown === 'string' ){
            let markdown = res.data.Markdown
            let addClinic = '', nameClinic = '', note = '', paymentId = '', clinicId = '',
                priceId = '', provinceId = '', selectedSpecialty = '', specialtyId = '';
            if(res.data.Doctor_Info){
                addClinic = res.data.Doctor_Info.addressClinic
                nameClinic = res.data.Doctor_Info.nameClinic
                note = res.data.Doctor_Info.note
                paymentId = res.data.Doctor_Info.paymentId
                priceId = res.data.Doctor_Info.priceId
                provinceId = res.data.Doctor_Info.provinceId
                specialtyId = res.data.Doctor_Info.specialtyId
                clinicId = res.data.Doctor_Info.clinicId
                selectedPayment = listPayment.find(item=>{
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item=>{
                    return item && item.value === provinceId
                })
                selectedPrice = listPrice.find(item=>{
                    return item && item.value === priceId
                })
                selectedSpecialty = listSpecialty.find(item =>{
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item =>{
                    return item && item.value === clinicId
                })

            }
            this.setState({ 
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description:  markdown.description,
                hasOldData: true,
                addClinic: addClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedPrice:selectedPrice,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
                clinicId: clinicId,
                specialtyId: specialtyId
            })
        }else {
            this.setState({ 
                contentMarkdown: '',
                contentHTML: '',
                description:  '',
                hasOldData: false,
                addClinic: '' ,
                nameClinic: '' ,
                selectedPayment: {},
                selectedProvince: {},
                selectedPrice:{},
                selectedSpecialty: {},
                selectedClinic: {},
                note:  '',
                clinicId:'',
                specialtyId:''
            })
        }
    };

    handleChangeSelectDoctorInfo = async(selectedOption, name) => {
        let stateName = name.name
        let copySate = {...this.state}
        copySate[stateName] = selectedOption        
        this.setState({
            ...copySate
        })
        if(stateName === 'selectedSpecialty'){
            this.setState({
                specialtyId: selectedOption.value
            })
        }
        if(stateName === 'selectedClinic'){
            this.setState({
                clinicId: selectedOption.value
            })

        }

    }

    handleOnchangeOnText = (e, type)=>{
        let copySate = {...this.state}
        copySate[type] = e.target.value
        this.setState({
            ...copySate
        })
    }

    handleEditorChange= ({html, text})=>{
        this.setState({ 
            contentHTML: html,
            contentMarkdown: text
        })
    }
    render() {
        let {hasOldData} = this.state
        return (
            <div className='manage-doctor-container'>
                <div className='title'><FormattedMessage id="admin.manage-doctor"/></div>
                <div className='doctor-more-info'>
                    <div className='content-left'>
                    <label><FormattedMessage id="admin.choose-doctor"/></label>
                    <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listDoctors}
                        placeholder= {<FormattedMessage id="admin.choose-doctor"/>}
                    />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.introduction-info"/></label>
                        <textarea className='form-control'  onChange={(e)=>this.handleOnchangeOnText(e, 'description')} value = {this.state.description}></textarea>
                    </div>
                </div>
                <div className='manage-doctor-info row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.price"/></label>
                        <Select
                        value={this.state.selectedPrice}
                        onChange={this.handleChangeSelectDoctorInfo}
                        options={this.state.listPrice}
                        name='selectedPrice'
                        placeholder= {<FormattedMessage id="admin.price"/>}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.payment"/></label>
                        <Select
                        value={this.state.selectedPayment}
                        onChange={this.handleChangeSelectDoctorInfo}
                        options={this.state.listPayment}
                        name='selectedPayment'
                        placeholder= {<FormattedMessage id="admin.payment"/>}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.province"/></label>
                        <Select
                        value={this.state.selectedProvince}
                        onChange={this.handleChangeSelectDoctorInfo}
                        options={this.state.listProvince}
                        name='selectedProvince'
                        placeholder= {<FormattedMessage id="admin.province"/>}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.nameClinic"/></label>
                        <input className='form-control' type = 'text' onChange={(e)=>this.handleOnchangeOnText(e,'nameClinic')} value = {this.state.nameClinic}/>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.addClinic"/></label>
                        <input className='form-control' type = 'text' onChange={(e)=>this.handleOnchangeOnText(e,'addClinic')} value = {this.state.addClinic}/>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.note"/></label>
                        <input className='form-control' type = 'text' onChange={(e)=>this.handleOnchangeOnText(e,'note')} value = {this.state.note}/>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.specialty"/></label>
                        <Select
                        value={this.state.selectedSpecialty}
                        onChange={this.handleChangeSelectDoctorInfo}
                        options={this.state.listSpecialty}
                        name='selectedSpecialty'
                        placeholder= {<FormattedMessage id="admin.specialty"/>}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.clinic"/></label>
                        <Select
                        value={this.state.selectedClinic}
                        onChange={this.handleChangeSelectDoctorInfo}
                        options={this.state.listClinic}
                        name='selectedClinic'
                        placeholder= {<FormattedMessage id="admin.clinic"/>}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <label><FormattedMessage id="admin.more-info-about-doctor"/></label>
                    <MdEditor style={{ height: '200px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.contentMarkdown}/>
                </div>
                
                <button className={hasOldData ? 'btn btn-warning save-content-doctor mt-5': 'btn btn-warning create-content-doctor mt-5'} onClick={this.handleSaveContent}>
                    {hasOldData ? <FormattedMessage id="admin.save"/>: <FormattedMessage id="admin.create"/>}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo : state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: ()=> dispatch(actions.fetchAllDoctors()),
        saveDetailDoctors: (data)=> dispatch(actions.saveDetailDoctors(data)),
        getAllRequireDoctorInfo: ()=> dispatch(actions.getRequireDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
