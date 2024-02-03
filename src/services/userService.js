import axios from '../axios';
const handleLoginApi = (userEmail, userPassword)=>{
    return axios.post('/api/login',{email: userEmail,password: userPassword})
}

const getAllUsers = (id) =>{
    return axios.get(`/api/get-all-user?id=${id}`)
}

const createUser = (data) =>{
    return axios.post('/api/create-new-user', data)
}

const deleteUser = (id) =>{
    return axios.delete('/api/delete-user', {
        data: {id}
    })
}

const editUser = (data) =>{
    return axios.put('/api/edit-user', data)
}

const getAllCodeService = (inputData) =>{
    return axios.get(`/api/allcode?type=${inputData}`)
}

const getTopDoctorHome = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () =>{
    return axios.get(`/api/get-all-doctors`)
}

const saveInfoDoctor = (data) =>{
    return axios.post(`/api/post-info-doctors`, data)
}

const getDetailInfoDoctors = (id) =>{
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveBulkScheduleDoctor = (data) =>{
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleByDate = (doctorId, dateStyle) =>{
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&dateStyle=${dateStyle}`)
}

const getScheduleForDoctor = (doctorId, dateStyle) =>{
    // console.log(doctorId)
    return axios.get(`/api/get-schedule-for-doctor?doctorId=${doctorId}&dateStyle=${dateStyle}`)
}

const getExtraInfoDoctorById = (doctorId) =>{
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) =>{
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookingAppointment = (data) =>{
    return axios.post('/api/patient-book-appointment', data)
}

const verifyBookAppointment = (data) =>{
    return axios.post('/api/verify-book-appointment', data)
}

const handleSpecialty = (data) =>{
    return axios.post('/api/handle-specialty', data)
}

const getAllSpecialty = () =>{
    return axios.get(`/api/get-all-specialty`)
}
const getDetailSpecialty = (data) =>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const deleteSpecialty= (id)=>{
    return axios.delete(`/api/delete-specialty-by-id?id=${id}`)
}

const handleClinic = (data) =>{
    return axios.post('/api/handle-create-update-clinic', data)
}

const getAllClinic = () =>{
    return axios.get(`/api/get-all-clinic`)
}

const getDetailClinic = (data) =>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const deleteClinic = (id)=>{
    return axios.delete(`/api/delete-clinic-by-id?id=${id}`)
}

const getAllPatientForDoctor = (data) =>{
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) =>{
    return axios.post(`/api/send-remedy`, data )
}

const handleHandbook = (data) =>{
    return axios.post(`/api/create-handbook`, data)
}

const getAllHandbook = () =>{
    return axios.get(`/api/get-all-handbook`)
}
const getDetailHandbookById = (data)=>{
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`)
}
export  {
    handleLoginApi,
    getAllUsers,
    createUser,
    deleteUser, 
    editUser, 
    getAllCodeService, 
    getTopDoctorHome, 
    getAllDoctors,
    saveInfoDoctor,
    getDetailInfoDoctors,
    saveBulkScheduleDoctor,
    getScheduleByDate,
    getScheduleForDoctor,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookingAppointment,
    verifyBookAppointment,
    handleSpecialty,
    getAllSpecialty,
    getDetailSpecialty,
    deleteSpecialty,
    handleClinic,
    getAllClinic,
    getDetailClinic,
    deleteClinic,
    getAllPatientForDoctor,
    postSendRemedy,
    handleHandbook,
    getAllHandbook,
    getDetailHandbookById
}

