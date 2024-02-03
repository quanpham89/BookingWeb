// can xem lai, co the cua doctor
// import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/lib/index.css';
// import './ManageSpecialty.scss'
// import CommonUtils from '../../../utils/CommonUtils';
// import { LANGUAGES } from '../../../utils/constant';
// import {createNewSpecialty} from '../../../services/userService'
// import {toast} from 'react-toastify'
// const mdParser = new MarkdownIt(/* Markdown-it options */);

// class ManageSpecialty extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             name: '',
//             descriptionHTML: '',
//             descriptionMarkdown: '',
//             imgBase64: '',
//             previewImg: '',
//         }
//     }
//     componentDidMount (){
        
//     }
//     componentDidUpdate(prevProps, prevState){
//         if(this.props.language !== prevProps.language){
        
//         }
        
//     }

//     handleOnchangeInput = (e, type)=>{
//         let stateCopy = {...this.state}
//         stateCopy[type] = e.target.value
//         this.setState({
//             ...stateCopy
//         })
//     }
//     handleEditorChange= ({html,text})=>{
//         this.setState({
//             descriptionHTML: html,
//             descriptionMarkdown: text,
//         })
//     }
//     handleOnChangeImage = async(e)=>{
//         let data = e.target.files[0]
//         if(data){
//             let base64 = await CommonUtils.getBase64(data);
//             let file = URL.createObjectURL(data)
//             this.setState({
//                 previewImg: file,
//                 imgBase64: base64
//             })
//         }
//     }
//     handleSaveSpecialty= async()=>{
//         let res = await createNewSpecialty(this.state)
//         if(res && res.errCode === 0){
//             toast.success('Create success')
//             this.setState({
//                 name: '',
//                 descriptionHTML: '',
//                 descriptionMarkdown: '',
//                 imgBase64: '',
//                 previewImg: '',
//             })
//         }else{
//             toast.error('Something went wrong, please try again')
//         }
//     }
//     render() {

//         return ( 
//             <div className='manage-specialty-container'>
//                 <div className='ms-title '> <FormattedMessage id="admin.manage-specialty"/></div>
//                 <div className='add-new-specialty row'>
//                     <div className='col-6 form-group'>
//                         Tên chuyên khoa
//                         <input type='text' className='form-control' value={this.state.name} onChange={(e)=>this.handleOnchangeInput(e,'name')}/>
//                     </div>
                    
//                     <div className='preview-img-container col-6 form-group'>
//                         <div>Ảnh chuyên khoa</div>
//                         <input 
//                         id='preview-img' 
//                         className='form-control' 
//                         type='file' 
//                         hidden
//                         onChange={(e)=>this.handleOnChangeImage(e)}
//                         />
//                         <label htmlFor='preview-img' className='label-upload'>Tải ảnh <i className="fas fa-upload"></i></label>
//                         <div className='preview-img'style={{backgroundImage: `url(${this.state.previewImg})` }} ></div>
//                     </div>
//                     <div className='col-12'>
//                         <MdEditor 
//                         style={{ height: '300px' }} 
//                         renderHTML={text => mdParser.render(text)} 
//                         onChange={this.handleEditorChange} 
//                         value={this.state.descriptionMarkdown}
//                         />
//                     </div>
//                     <div className='col-12'>
//                         <button className='btn btn-warning btn-save-specialty mt-4' onClick={()=>this.handleSaveSpecialty()}>Save</button>
//                     </div>
//                 </div>

//             </div>
//         );
//     }

// }

// const mapStateToProps = state => {
//     return {
//         language: state.app.language,


//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
