import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllUsers, createUser, deleteUser, editUser} from '../../services/userService'
import  './UserManage.scss';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter';
class UserManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrayUser: [],
            isOpenModalCreateUser: false,
            isOpenModalEditUser: false,
            userEdit:{}
        }
    }
    state = {

    }

    async componentDidMount() {
        await this.getAllUserFromDatabase()
    }
        
    getAllUserFromDatabase = async()=>{
        let response = await getAllUsers('ALL')
        if(response && response.errcode === 0){
            this.setState({
                arrayUser: response.users
            },
            // ()=>{
            // not sync 
            //     console.log('data', this.state.arrayUser)
            // }
            )
        }
    }
    
    handleAddNewUser = ()=>{
        this.setState({
            isOpenModalCreateUser: true
        })
    }

    toggleCreateUserModal = ()=>{
        this.setState({
            isOpenModalCreateUser: !this.state.isOpenModalCreateUser
        })
    }

    toggleEditUserModal= ()=>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async(data)=>{
        try{
            let response = await createUser(data)
            console.log('response', response)
            if(response && response.errCode !==0){
                alert(response.message)
            }else{
                await this.getAllUserFromDatabase()
                this.setState({
                    isOpenModalCreateUser: false
                })
                emitter.emit('EVENT_INFO')
            }
        }catch(e){
            console.log(e)
        }
    }

    handleDeleteUser = async(user)=>{
        try{
            let res = await deleteUser(user.id)
            if(res && res.errorCode === 0){
                await this.getAllUserFromDatabase()
            }else{
                alert(res.message)
            }   
        }catch(e){
            console.log(e)
        }
    }

    handleEditUser = (user)=>{
        this.setState({
            isOpenModalEditUser: true,
            userEdit:{...user}
        })
    }

    editUser = async(user)=>{
        console.log(user)
        try{
            let response = await editUser(user)
            if(response && response.errorCode === 0){
                this.setState({isOpenModalEditUser: false})
                this.getAllUserFromDatabase()
            }else{
                alert(response.message)
            }
            
        }catch(e){
            console.log(e)
        }
    }

    render() {
        let arrUser = this.state.arrayUser;
        return (
            <div className="users-container">
                <ModalUser isOpen = {this.state.isOpenModalCreateUser} toggleCreateUserModal={this.toggleCreateUserModal} createNewUser={this.createNewUser}/>
                {this.state.isOpenModalEditUser &&
                <ModalEditUser
                isOpen = {this.state.isOpenModalEditUser} 
                toggleEditUserModal={this.toggleEditUserModal}
                currentUser = {this.state.userEdit}
                editUser = {this.editUser}
                />}
                <div className='title text-center'>Manage users</div>
                <div className='mx-1'>
                    <button 
                    className='btn btn-primary px-3'
                    onClick={()=>this.handleAddNewUser()}
                    > 
                    + Add new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUser && arrUser.map((item,index)=>{
                                return (
                                    <tr key = {index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn btn-edit' onClick ={()=>this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn btn-delete' onClick={()=>this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
