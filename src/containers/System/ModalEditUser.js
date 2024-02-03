
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
class ModalEditUser extends Component {

    constructor ( props){
        super(props );
        this.state = {
            id: '',
            email: '',
            // password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                // password:'hash code',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = ()=>{
        this.props.toggleEditUserModal()
    }
    
    handleOnChangeInput = (event, type)=>{
        let copyState = {...this.state};
        copyState[type] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = ()=>{
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName','address']
        for(let i = 0; i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                break; 
            }
        }
        return isValid;
    }

    handleSaveUser =  ()=>{
        let isValid = this.checkValidateInput()
        if(isValid){
            //call api edit modal
            this.props.editUser(this.state)
        }
    }

    render() {
        return (
                <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>this.toggle()} 
                size = "lg"
                className='modal-user-container'
                >
                <ModalHeader toggle={()=>this.toggle()}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-body-user'>
                        <div className="input-container ">
                            <label htmlFor ="inputEmail4">Email</label>
                            <input  
                            type="email" className="form-control"
                            id="email" 
                            placeholder="Email" 
                            name="email"
                            value = {this.state.email}
                            onChange={(event)=>this.handleOnChangeInput(event,'email')}
                            />
                        </div>
                        <div className="input-container ">
                            <label htmlFor ="inputPassword4">Password</label>
                            <input  
                            type="password" 
                            className="form-control"
                            name = "password" 
                            placeholder="Password"
                            value = {this.state.password}
                            onChange={(event)=>this.handleOnChangeInput(event,'password')}
                            disabled
                            />
                        </div>
                        <div className="input-container ">
                            <label htmlFor ="inputEmail4">First Name</label>
                            <input  
                            type="text" 
                            className="form-control"
                            placeholder="First Name" 
                            name="firstName"
                            value = {this.state.firstName}
                            onChange={(event)=>this.handleOnChangeInput(event,'firstName')}
                            />
                        </div>
                        <div className="input-container ">
                            <label htmlFor ="inputPassword4">Last Name</label>
                            <input  
                            type="text" 
                            className="form-control"
                            name = "lastName" 
                            placeholder="Last Name"
                            value = {this.state.lastName}
                            onChange={(event)=>this.handleOnChangeInput(event,'lastName')}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label htmlFor ="inputAddress">Address</label>
                            <input  
                            type="text" className="form-control"
                            name="address" 
                            placeholder=" Your address"
                            value = {this.state.address}
                            onChange={(event)=>this.handleOnChangeInput(event,'address')}
                            />
                        </div>
                    </div>
                
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={()=>this.handleSaveUser()}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={()=>this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
        </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


