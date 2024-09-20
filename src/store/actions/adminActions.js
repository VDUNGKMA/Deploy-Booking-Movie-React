import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService, 
    getAllSpecialty , getAllClinic
} from '../../services/userService';
import { toast } from "react-toastify";
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('gender')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())

            }
        } catch (error) {
            dispatch(fetchGenderFailed())

            console.log(error);
        }
    }

}
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('position')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())

            }
        } catch (error) {
            dispatch(fetchPositionFailed())

            console.log(error);
        }
    }

}
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('role')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))

            } else {
                dispatch(fetchRoleFailed())

            }
        } catch (error) {
            dispatch(fetchRoleFailed())

            console.log(error);
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = (genderData) => ({
    type: actionTypes.FETCH_GENDER_FAILED,
    data: genderData
})
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = (positionData) => ({
    type: actionTypes.FETCH_POSITION_FAILED,
    data: positionData
})
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = (roleData) => ({
    type: actionTypes.FETCH_ROLE_FAILED,
    data: roleData
})
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            console.log('check create user redux', res);
            if (res && res.errCode === 0) {
                toast.success("Create user succeed");
                dispatch(saveUserSuccess(res.data))
                dispatch(fetchUserManageStart())
            } else {
                toast.error("Create user failed");
                dispatch(saveUserFailed())

            }
        } catch (error) {
            dispatch(saveUserFailed())
            console.log(error);
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

// export const fetchUserManageStart = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getAllUsers('ALL')
//             console.log('check log res ', res);
//             if (res && res.errCode === 0) {
//                 dispatch(fetchUserManageSuccess(res.users.reverse()))

//             } else {
//                 dispatch(fetchUserManageFailed())

//             }
//         } catch (error) {
//             dispatch(fetchUserManageFailed())

//             console.log(error);
//         }
//     }

// }
export const fetchUserManageStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers()
            console.log('check log res ', res.data);
            if (res && res.status === "success") {
                dispatch(fetchUserManageSuccess(res.data.users.reverse()))

            } else {
                dispatch(fetchUserManageFailed())

            }
        } catch (error) {
            dispatch(fetchUserManageFailed())

            console.log(error);
        }
    }

}
export const fetchUserManageSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchUserManageFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            console.log('check delete user redux', res);
            if (res && res.errCode === 0) {
                toast.success("Delete user succeed");
                dispatch(deleteUserSuccess(res.data))
                dispatch(fetchUserManageStart())
            } else {
                toast.error("Delete user failed");
                dispatch(deleteUserFailed())

            }
        } catch (error) {
            dispatch(deleteUserFailed())
            console.log(error);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,

})
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data)
            console.log('check edit user redux', res);
            if (res && res.errCode === 0) {
                toast.success("Update user succeed");
                dispatch(editUserSuccess())
                dispatch(fetchUserManageStart())
            } else {
                toast.error("Update user error");
                dispatch(editUserFailed())
            }
        } catch (error) {
            toast.error("Update user error");
            dispatch(editUserFailed())
            console.log(error);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            console.log('check save detaildoctor redux', res);
            if (res && res.errCode === 0) {
                toast.success("Save info detail Doctor succeed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

                })
            } else {
                toast.error("Save info detail Doctor error!");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            toast.error("Save info detail Doctor error!");
            console.log(error);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}
export const fetchAllScheduleTime = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode ===0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic : resClinic.data
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInfoFailed())

            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInfoFailed())
            console.log("fetch required info doctor: ", error);

        }
    }
}
export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
        data : allRequiredData
})
export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
    
})