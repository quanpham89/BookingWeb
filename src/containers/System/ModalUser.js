
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';

class ModalUser extends Component {

    constructor ( props){
        super(props );
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on('EVENT_INFO', () =>{
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {
        
    }

    toggle = ()=>{
        this.props.toggleCreateUserModal()
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
        let arrInput = ['email', 'password', 'firstName', 'lastName','address']
        for(let i = 0; i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    handleCreateUser =  ()=>{
        let isValid = this.checkValidateInput()
        if(isValid){
            //call api create modal
            this.props.createNewUser(this.state)

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
                <ModalHeader toggle={()=>this.toggle()}>Create a new user</ModalHeader>
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
                    <Button color="primary" className='px-3' onClick={()=>this.handleCreateUser()}>
                        Create user
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


