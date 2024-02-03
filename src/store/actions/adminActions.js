import actionTypes from './actionTypes';
import { getAllCodeService,createUser, getAllUsers, deleteUser,editUser, getTopDoctorHome, getAllDoctors, saveInfoDoctor, getAllSpecialty, getAllClinic } from '../../services/userService';
import { toast } from 'react-toastify';
export const fetchGenderStart = () => {
    return async(dispatch, getState)=>{
        try{
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService('GENDER')
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFail())
        }
        }catch(e){
            dispatch(fetchGenderFail())
            console.log('fetchGenderStart error: ',e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionStart = () => {
    return async(dispatch, getState)=>{
        try{
            let res = await getAllCodeService('POSITION')
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFail())
        }
        }catch(e){
            dispatch(fetchGenderFail())
            console.log('fetchPositionFail error: ',e)
        }}
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
})

export const fetchRoleStart = () => {
    return async(dispatch, getState)=>{
        try{
            let res = await getAllCodeService('ROLE')
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFail())
        }
        }catch(e){
            dispatch(fetchRoleFail())
            console.log('fetchRoleStart error: ',e)
        }}
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
})

export const createNewUser = (data)=>{
    return async(dispatch, getState)=>{
        try{
            let res = await createUser(data);
            if(res && res.errCode === 0){
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success('Create a new user Successfully')
            }else{
                dispatch(saveUserFail())
        }
        }catch(e){
            dispatch(saveUserFail())
            console.log('fetchGenderStart error: ',e)
        }
    }
}

export const saveUserSuccess =()=>({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFail =()=>({
    type: actionTypes.CREATE_USER_FAIL
})


export const fetchAllUserStart = () => {
    return async(dispatch, getState)=>{
        try{
            let res = await getAllUsers('ALL')
            console.log(res)
            if(res && res.errcode === 0){
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }else{
                toast.error('Get user error')
                dispatch(fetchAllUserFail())
        }
        }catch(e){
            dispatch(fetchAllUserFail())
            console.log('fetchAllUserStart error: ',e)
        }}
}

export const fetchAllUserSuccess = (data)=>({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFail = ()=>({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})


export const deleteAnUser = (id)=>{
    return async(dispatch, getState)=>{
        try{
            let res = await deleteUser(id);
            if(res && res.errorCode === 0){
                toast.success('Delete user successfully')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            }else{
                toast.error('Delete user error')
                dispatch(deleteUserFail())
        }
        }catch(e){
            dispatch(deleteUserFail())
            console.log('fetchGenderStart error: ',e)
        }
    }
}

export const deleteUserSuccess = ()=>({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = ()=>({
    type:actionTypes.DELETE_USER_FAIL
})

export const editAnUser = (user)=>{
    return async(dispatch, getState)=>{
        try{
            let res = await editUser(user);
            console.log(res)
            if(res && res.errorCode === 0){
                toast.success('Update user successfully')
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            }else{
                toast.error('Update user error')
                dispatch(editUserFail())
        }
        }catch(e){
            dispatch(editUserFail())
            console.log('fetchGenderStart error: ',e)
        }
    }
}

export const editUserSuccess=()=>({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFail=()=>({
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDoctor = () => {
    return async(dispatch, getState)=>{
        try{
            let res = await getTopDoctorHome(10)
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
                })
            }
        }catch(e){
            console.log('fetchAllUserStart error: ',e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
            })
        }}
}

export const fetchAllDoctors = () => {
    return async(dispatch, getState)=>{
        try{
            let res = await getAllDoctors()
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
                })
            }
        }catch(e){
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
            })
        }}
}

export const saveDetailDoctors = (data) => {
    return async(dispatch, getState)=>{
        try{
            let res = await saveInfoDoctor(data)
            if(res && res.errCode === 0){
                toast.success('Save information of doctor successfully')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                })
            }else{
                toast.error('Save information of doctor failed')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAIL,
                })
            }
        }catch(e){
            console.log(e)
            toast.error('Save information of doctor failed')
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAIL,
            })
        }}
}

export const fetchAllScheduleTime = () => {
    return async(dispatch, getState)=>{
        try{
            let res = await getAllCodeService('TIME')
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
                })
            }
        }catch(e){
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
            })
        }}
}

export const getRequireDoctorInfo = () => {
    return async(dispatch, getState)=>{
        try{
            dispatch({ type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_START})
            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')
            let resSpecialty = await getAllSpecialty()
            let resClinic  = await getAllClinic()


            if(resPrice && resPrice.errCode === 0 
                && resPayment && resPayment.errCode === 0 
                && resProvince && resProvince.errCode === 0 
                && resSpecialty && resSpecialty.errCode === 0 
                && resClinic && resClinic.errCode === 0
            ){
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequireDoctorInfoSuccess(data))
            }else{
                dispatch(fetchRequireDoctorInfoFail())
        }
        }catch(e){
            dispatch(fetchRequireDoctorInfoFail())
            console.log('fetchRequireDoctorInfoFail error: ',e)
        }}
}
export const fetchRequireDoctorInfoSuccess = (requiredData) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
    data: requiredData
})
export const fetchRequireDoctorInfoFail  = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAIL,
})

