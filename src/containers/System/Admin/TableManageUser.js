import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import  './TableManageUser.scss';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser

// Finish!


class TableManageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            userRedux: []
        }
    }
    componentDidMount (){
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                userRedux: this.props.listUsers
            })
        }    
    }
    handleDeleteItem= (user)=>{
        this.props.deleteAnUserRedux(user.id)
    }
    handleEditUser = (user)=>{
        this.props.handleEditUserFromParent(user)
    }
    render() {
        let arrUsers = this.state.userRedux;
        return (
            <>
                <table id = 'table-manage-user'>
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
                        {arrUsers && arrUsers.length >0  &&
                            arrUsers.map((item,index)=>{
                                return (
                                    <tr key = {index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn btn-edit'onClick={()=> this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn btn-delete' onClick={()=> this.handleDeleteItem(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
    
                    </tbody>
                    
                </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
    
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: ()=> dispatch(actions.fetchAllUserStart()),
        deleteAnUserRedux: (id)=> dispatch(actions.deleteAnUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
