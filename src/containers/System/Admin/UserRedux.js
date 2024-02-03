import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS} from '../../../utils/constant';
import CommonUtils from '../../../utils/CommonUtils';

import * as actions from '../../../store/actions'
import './UserRedux.scss'

import TableManageUser from './TableManageUser';
import 'react-image-lightbox/style.css'
class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state = {
            genderArr:[],
            roleArr:[],
            positionArr:[],
            previewImg: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',

            userEditId:''
        }
    }
    

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
        this.props.getPositionStart()
        // or  this.props.dispatch(actions.getGenderStart())
        //or try{
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0){
        //         this.setState({
        //             genderArr: [...res.data]
        //         })
        //     }
        // }catch(e){
        //     console.log(e)
        // }
    }
    // gọi sau khi thực hiện render so sánh quá khứ và hiện tại để thực hiện
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let genderArr = this.props.genderRedux
            this.setState({
                genderArr: genderArr,
                gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let roleArr = this.props.roleRedux
            this.setState({
                roleArr: roleArr,
                role: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let positionArr = this.props.positionRedux
            this.setState({
                positionArr: positionArr,
                position: positionArr && positionArr.length > 0 ? positionArr[0].keyMap : ''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let roleArr = this.props.roleRedux
            let positionArr = this.props.positionRedux
            let genderArr = this.props.genderRedux


            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : '',
                position: positionArr && positionArr.length > 0 ? positionArr[0].keyMap : '',
                role: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                userEditId: '',
                previewImg:''
            })
        }
    }
    handleOnChangeImage = async(e)=>{
        let data = e.target.files[0]
        if(data){
            let base64 = await CommonUtils.getBase64(data);
            console.log(base64)
            let file = URL.createObjectURL(data)
            this.setState({
                previewImg: file,
                avatar: base64
            })
        }
    }
    OpenPreviewImage = () =>{
        if(this.state.previewImg){
            this.setState({
                isOpen: true
            })
        }else{
            return
        }
    }

    handleSaveUser = ()=>{
    let isValid = this.checkValidateInput()
    if(isValid){
        let {action} = this.state
        // fire action
        if(action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar
            })
        }else{
            // fire redux edit user
            this.props.editAnUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar,
            })
        }
    }
    else{
        return
    }
}

    checkValidateInput = ()=>{
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName','address', 'phoneNumber', 'gender', 'position', 'role']
        for(let i = 0; i < arrCheck.length;i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('Please complete: ' + arrCheck[i])
                break;
            }
        }
        return isValid
    }
    

    onChangeInput = (e, type)=>{
        let copySate = {
            ...this.state
        }
        copySate[type] = e.target.value;
        this.setState({
            ...copySate
        })
        
    }

    handleEditUserFromParent = (user)=>{
        let imgBase64 = ''
        if(user.image){
            imgBase64 = new Buffer(user.image,'base64').toString('binary')
        }

        this.setState({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: 'can not edit this',
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImg: imgBase64 
        })
    }
    
    render() {
        let {email, password, firstName, lastName, phoneNumber,address, gender, position, role}= this.state;
        let language = this.props.language;
        let genders = this.state.genderArr;
        let isLoadingGenders = this.props.isLoadingGenders
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                        <div className='col-12 my-3'><FormattedMessage id="manageUser.add"/></div>
                        <div className='col-12 '>{isLoadingGenders ? 'LoadingGender':''}</div>
                        <div className='col-3'>
                                <label ><FormattedMessage id="manageUser.email"/></label>
                                <input className='form-control' type='email' value ={email} onChange={(e)=>this.onChangeInput(e, 'email')} disabled={this.state.action === 'EDIT' ? true : false}/>
                            </div>
                            <div className='col-3'>
                                <label ><FormattedMessage id="manageUser.password"/></label>
                                <input className='form-control' type='password'value ={password} onChange={(e)=>this.onChangeInput(e, 'password')} disabled={this.state.action === 'EDIT' ? true : false}/>
                            </div>
                            <div className='col-3'>
                                <label ><FormattedMessage id="manageUser.firstName"/></label>
                                <input className='form-control' type='text' value ={firstName} onChange={(e)=>this.onChangeInput(e, 'firstName')}/>
                            </div>
                            <div className='col-3'>
                                <label ><FormattedMessage id="manageUser.lastName"/></label>
                                <input className='form-control' type='text' value ={lastName} onChange={(e)=>this.onChangeInput(e, 'lastName')}/>
                            </div>
                            <div className='col-3'>
                                <label ><FormattedMessage id="manageUser.phone"/></label>
                                <input className='form-control' type='text'value ={phoneNumber} onChange={(e)=>this.onChangeInput(e, 'phoneNumber')}/>
                            </div>
                            <div className='col-9'>
                                <label ><FormattedMessage id="manageUser.address"/></label>
                                <input className='form-control' type='text'value ={address} onChange={(e)=>this.onChangeInput(e, 'address')}/>
                            </div>
                            <div className='col-3'>
                                <label ><FormattedMessage id="manageUser.gender"/></label>
                                <select className='form-control' onChange={(e)=>this.onChangeInput(e, 'gender')} value={gender}>
                                    {genders.length >0 &&
                                    genders.map((item, index)=>{
                                        return(
                                            <option key = {index} value = {item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label ><FormattedMessage id="manageUser.position"/></label>
                                <select className='form-control' onChange={(e)=>this.onChangeInput(e, 'position')} value={position}>
                                {positions.length >0 &&
                                    positions.map((item, index)=>{
                                        return(
                                            <option key = {index} value = {item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label ><FormattedMessage id="manageUser.role"/></label>
                                <select className='form-control'onChange={(e)=>this.onChangeInput(e, 'role')} value={role}>
                                {roles.length >0 &&
                                    roles.map((item, index)=>{
                                        return(
                                            <option key = {index} value = {item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label ><FormattedMessage id="manageUser.image"/></label>
                                <div className='preview-img-container'>
                                    <input 
                                    id='preview-img' 
                                    className='form-control' 
                                    type='file' 
                                    hidden
                                    onChange={(e)=>this.handleOnChangeImage(e)}
                                    />
                                    <label htmlFor='preview-img' className='label-upload'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-img'style={{backgroundImage: `url(${this.state.previewImg})` }} onClick={()=> this.OpenPreviewImage()}></div>
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button 
                                className={this.state.action === 'EDIT' ? 'btn btn-warning':'btn btn-primary'} 
                                onClick={()=>this.handleSaveUser()}
                                >
                                {this.state.action === 'EDIT' ?<FormattedMessage id="manageUser.edit"/>: <FormattedMessage id="manageUser.save"/>}
                                </button>
                            </div>
                            <div className='col-12 mt-3 mb-5 '>
                                <TableManageUser
                                handleEditUserFromParent={this.handleEditUserFromParent}
                                action = {this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* {this.state.isOpen === true &&  
                    <Lightbox 
                    mainSrc={this.state.previewImg}
                    onCloseRequest={()=> this.setState({isOpen: false})}
                    />
                } */}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGenders: state.admin.isLoadingGenders,
        roleRedux: state.admin.roles,
        isLoadingRoles: state.admin.isLoadingRoles,
        positionRedux: state.admin.positions,
        isLoadingPosition: state.admin.position,
        listUsers: state.admin.users


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: ()=> dispatch(actions.fetchGenderStart()),
        getPositionStart: ()=> dispatch(actions.fetchPositionStart()),
        getRoleStart: ()=> dispatch(actions.fetchRoleStart()),
        createNewUser : (data)=> dispatch(actions.createNewUser(data)),
        fetchUserRedux: ()=> dispatch(actions.fetchAllUserStart()),
        editAnUser: (data)=> dispatch(actions.editAnUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
