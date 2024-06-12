import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import {handleLoginApi} from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName :'',
            password:'',
            isShowPassword: false,
            errorMessage: '',
            isShowAccount: false,
        }
    }

    handleOnchangeUserName = (e)=>{
        this.setState({userName:e.target.value})
    }

    handleOnchangePassword = (e)=>{
    this.setState({password:e.target.value})
    }

    handleLogin = async()=>{
        this.setState({errMessage: ''});
        try{
            let data = await handleLoginApi(this.state.userName,this.state.password)
            if(data && data.errcode!==0){
                console.log(data)
                this.setState({
                    errorMessage: data.message
                })
            }
            if(data && data.errcode === 0){
                this.props.userLoginSuccess(data.user)
            }
        }catch(error){
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errorMessage: error.response.data.message
                    })
                }
            }
        }
    }

    showHidePassword = ()=>{
        this.setState({isShowPassword: !this.state.isShowPassword})
    } 

    handleOnKeyDown = (e)=>{
        if(e.key ==='Enter' || e.keyCode === 13){
            this.handleLogin()
        }
    }
    showAccount = ()=>{
        this.setState({
            isShowAccount: !this.state.isShowAccount
        })
    }
    render() {
        return (
            <div className='login-background'> 
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Enter your user name' 
                            value = {this.state.userName} 
                            onChange={(e)=>{this.handleOnchangeUserName(e)}}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div  className='conceal-password'>
                            <input 
                            type={this.state.isShowPassword ? 'text' :'password'} 
                            className='form-control' 
                            placeholder='Enter your password' 
                            onChange={(e)=>{this.handleOnchangePassword(e)}}
                            onKeyDown={(e)=>this.handleOnKeyDown(e)}
                            />
                            {this.state.isShowPassword ?
                            <span onClick={()=>this.showHidePassword()}><i className="fas fa-eye"></i></span > : 
                            <span onClick={()=>this.showHidePassword()}><i className="fas fa-eye-slash"></i></span >
                            }
                            </div>
                        </div>
                        <div className='col-12' style = {{color: 'red'}}>{this.state.errorMessage}</div>
                        <div className='col-12'>
                            <button className=' btn-login' onClick={()=>{this.handleLogin()}}>Log in</button>
                        </div>
                        <div className='col-12 info-account'>
                            <span className= "account" onClick={()=>this.showAccount()}><strong>Account and Password</strong></span>
                            {this.state.isShowAccount ?
                            <span><i className="fas fa-eye"></i></span > : 
                            <span><i className="fas fa-eye-slash"></i></span >
                            }
                            {this.state.isShowAccount &&
                                <div className='row'>
                                    <div className='main-account col-6'>
                                            <strong>Admin Account</strong>
                                            <div><strong>User Name:</strong> adminaccount@gmail.com</div>
                                            <div><strong>Password:</strong> 123123aa.</div>
                                        </div>
                                        <div className='member-account col-6'>
                                            <strong>Member Account</strong>
                                            <div><strong>User Name:</strong> hoanganhnhi@gmail.com</div>
                                            <div><strong>Password:</strong> 123123aa.</div>
                                        </div>
                                        <i className='note'>Chú ý kiểm tra dấu cách khi copy tránh trường hợp không đăng nhập được.</i>
                                    </div>
                            }
                            <p><i className='note'>Khi truy cập trang web lần đầu tiên, phía back-end cần một chút thời gian (refresh sau khi chờ 3-4 phút) để khởi động lại, nhưng kể từ lần thứ hai sẽ không phải chờ lâu như vậy !</i></p>

                        </div>
                        {/* <div className='col-12'>
                            <span className='forgot-password'> Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};  

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo)=> dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
