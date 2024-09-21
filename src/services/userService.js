import axios from '../axios'

const handleLoginApi = (email, password) => {

     return axios.post('/api/auth/login', { email, password })
}
const handleForgotPasswordApi = (email) => {
     return axios.post('/api/auth/forgotPassword', { email })
}
const handleVerifyOtpApi = (email, otp) => {
     return axios.post('/api/auth/verifyOTP', { email, otp });
};
const handleResetPasswordApi = (email, newPassword) => {
     return axios.post('/api/auth/resetPassword', { email, newPassword });
};

const getAllUsers = () => {
     const token = localStorage.getItem('token'); // hoặc phương thức lưu trữ token của bạn
     if (token) {
          return axios.get('/api/admin/users', {
               headers: {
                    Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
               }
          });
     } else {
          return Promise.reject('No token found'); // Xử lý khi không có token
     }
}
const getUsersByRoleApi = (roleId) => {
     const token = localStorage.getItem('token'); // Lấy token từ localStorage
     if (token) {
          return axios.get('/api/admin/users-by-role', {
               params: { role_id: roleId }, // Truyền role_id qua query params
               headers: {
                    Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
               }
          });
     } else {
          return Promise.reject('No token found'); // Xử lý khi không có token
     }
};

const createNewUserService = (formData) => {
     const token = localStorage.getItem('token'); // Lấy token từ localStorage
     if (token) {
          return axios.post('/api/admin/register-staff', formData, {
               headers: {
                    Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
               }
          });
     } else {
          return Promise.reject('No token found'); // Xử lý khi không có token
     }
}

const deleteUserService = (userId) => {
     const token = localStorage.getItem('token'); // Lấy token từ localStorage
     if (token) {
          return axios.delete(`/api/admin/users/${userId}`, {
               headers: {
                    Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
               }
          });
     } else {
          return Promise.reject('No token found'); // Xử lý khi không có token
     }
}

const editUserService = (userId, formData) => {
     const token = localStorage.getItem('token'); // Lấy token từ localStorage
     if (token) {
          return axios.put(`/api/admin/users/${userId}`, formData, {
               headers: {
                    Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
               }
          });
     } else {
          return Promise.reject('No token found'); // Xử lý khi không có token
     }
}
// Create a new movie
const createMovieApi = (formData) => {
     const token = localStorage.getItem('token'); // Retrieve token from local storage
     if (token) {
          return axios.post('/api/admin/movies', formData, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token in the headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};

// Update a movie by ID
const updateMovieApi = (movieId, movieData) => {
     const token = localStorage.getItem('token');
     if (token) {
          return axios.put(`/api/admin/movies/${movieId}`, movieData, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token in the headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};

// Delete a movie by ID
const deleteMovieApi = (movieId) => {
     const token = localStorage.getItem('token');
     if (token) {
          return axios.delete(`/api/admin/movies/${movieId}`, { // Truyền id qua query string
               headers: {
                    Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};

// Gọi API để lấy tất cả các phim
export const getAllMoviesApi = () => {
     return axios.get('api/admin/movies');
}
const getAllGenresApi = () => {

     return axios.get('/api/admin/genres', {});
};
const createGenreApi = (genreData) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.post('/api/admin/genres', genreData, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
     } else {
          return Promise.reject('No token found');
     }
};


const updateGenreApi = (genreId, genreData) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.put(`/api/admin/genres/${genreId}`, genreData, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token in headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};
const deleteGenreApi = (genreId) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.delete(`/api/admin/genres/${genreId}`, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};
const getCinemasApi = () => {
     return axios.get('/api/admin/cinemas');
};

const createCinemaApi = (data) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.post('/api/admin/cinemas', data, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};

const updateCinemaApi = (cinemaId, data) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.put(`/api/admin/cinemas/${cinemaId}`, data, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
     
};

const deleteCinemaApi = (cinemaId) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.delete(`/api/admin/cinemas/${cinemaId}`, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};
// Theater APIs
const getTheatersByCinemaApi = (cinemaId) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.get(`/api/admin/cinemas/${cinemaId}/theaters`, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};

const createTheaterApi = (cinemaId, data) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.post(`/api/admin/cinemas/${cinemaId}/theaters`, data, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};

const updateTheaterApi = (theaterId, data) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.put(`/api/admin/theaters/${theaterId}`, data, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};

const deleteTheaterApi = (theaterId) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.delete(`/api/admin/theaters/${theaterId}`, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};
// API quản lý ghế
 const getSeatsByTheaterApi = (theaterId) => {
      return axios.get(`/api/admin/theaters/${theaterId}/seats`);
};
// Hàm lấy danh sách ghế với phân trang cho quản trị viên
const getSeatsByTheaterAdminApi = (theaterId, page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', search = '') => {
     return axios.get(`/api/admin/theaters/${theaterId}/seats/admin`, {
          params: { page, limit, sortField, sortOrder, search },
     });
};
 const createSeatApi = (theaterId, seatData) => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (token) {
           return axios.post(`/api/admin/theaters/${theaterId}/seats`, seatData, {
                headers: {
                     Authorization: `Bearer ${token}` // Attach token to the request headers
                }
           });
      } else {
           return Promise.reject('No token found');
      }
};

 const updateSeatApi = (theaterId, seatId, seatData) => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (token) {
           return axios.put(`/api/admin/theaters/${theaterId}/seats/${seatId}`, seatData, {
                headers: {
                     Authorization: `Bearer ${token}` // Attach token to the request headers
                }
           });
      } else {
           return Promise.reject('No token found');
      }
};

 const deleteSeatApi = (theaterId, seatId) => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (token) {
           return axios.delete(`/api/admin/theaters/${theaterId}/seats/${seatId}`, {
                headers: {
                     Authorization: `Bearer ${token}` // Attach token to the request headers
                }
           });
      } else {
           return Promise.reject('No token found');
      }
};

const updateSeatStatusApi = (theaterId, seatId, status) => {
     return axios.patch(`/api/admin/theaters/${theaterId}/seats/${seatId}/status`, { status });
};
// Hàm lấy danh sách suất chiếu với phân trang
const getShowtimesApi = (theaterId, page = 1, limit = 10, sortField = 'start_time', sortOrder = 'ASC', search = '') => {
     return axios.get(`/api/admin/theaters/${theaterId}/showtimes`, {
          params: { page, limit, sortField, sortOrder, search },
     });
};
const getShowtimesByTheaterApi = (theaterId, page = 1, limit = 10, sortField = 'start_time', sortOrder = 'ASC', search = '') => {
     return axios.get(`/api/admin/theaters/${theaterId}/get-showtimes`, {
          params: { page, limit, sortField, sortOrder, search },
     });
};
// Hàm lấy chi tiết một suất chiếu
const getShowtimeByIdApi = (showtimeId) => {
     return axios.get(`/api/admin/showtimes/${showtimeId}`);
     
};

// Hàm tạo mới suất chiếu
const createShowtimeApi = (theaterId, showtimeData) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.post(`/api/admin/theaters/${theaterId}/showtimes`, showtimeData, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};

// Hàm cập nhật suất chiếu
const updateShowtimeApi = (showtimeId, showtimeData) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.put(`/api/admin/showtimes/${showtimeId}`, showtimeData, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};

// Hàm xóa suất chiếu
const deleteShowtimeApi = (showtimeId) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.delete(`/api/admin/showtimes/${showtimeId}`, {
               headers: {
                    Authorization: `Bearer ${token}` // Attach token to the request headers
               }
          });
     } else {
          return Promise.reject('No token found');
     }
};
const getAllCodeService = (inputType) => {
     return axios.get(`/api/allcode?type=${inputType}`)
}
const getTopDoctorHomeService = (limit) => {
     return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
     return axios.get(`/api/getAllDoctors`)
}
const saveDetailDoctorService = (data) => {
     return axios.post('/api/save-info-doctors', data)
}
const getDetailInforDoctor = (inputId) => {
     return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)

}
const saveBulkScheduleDoctor = (data) => {
     return axios.post('api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
     return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInfoDoctorById = (doctorId) => {
     return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
     return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientBookAppointment = (data) => {
     return axios.post('/api/patient-book-appointment', data)
}
const postVerifyBookAppointment = (data) => {
     return axios.post('/api/verify-book-appointment', data)
}
const createNewSpecialty = (data) => {
     return axios.post('/api/creat-new-specialty', data)
}
const getAllSpecialty = () => {
     return axios.get(`/api/get-specialty`)
}
const getAllDetailSpecialtyById = (data) => {
     return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const getAllDetailClinicById = (data) => {
     return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const createNewClinic = (data) => {
     return axios.post('/api/creat-new-clinic', data)
}
const getAllClinic = () => {
     return axios.get(`/api/get-clinic`)
}
const getAllPatientForDoctor = (data) => {
     return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) => {
     return axios.post('/api/send-remedy', data)
}
export {
     handleLoginApi,
     handleForgotPasswordApi,
     handleVerifyOtpApi,
     handleResetPasswordApi,
     getAllUsers,
     getUsersByRoleApi,
     createNewUserService, deleteUserService,
     editUserService,
     createMovieApi,
     updateMovieApi,
     deleteMovieApi,
     getAllGenresApi,
     createGenreApi,
     updateGenreApi,
     deleteGenreApi,
     createCinemaApi,
     updateCinemaApi,
     deleteCinemaApi,
     getCinemasApi,
     getTheatersByCinemaApi,
     createTheaterApi,
     updateTheaterApi,
     deleteTheaterApi,
     getSeatsByTheaterApi,
     getSeatsByTheaterAdminApi,
     createSeatApi,
     updateSeatApi,
     deleteSeatApi,
     updateSeatStatusApi,
     getShowtimesApi,
     getShowtimesByTheaterApi, 
     getShowtimeByIdApi,
     createShowtimeApi,
     updateShowtimeApi,
     deleteShowtimeApi,
     getAllCodeService,
     getTopDoctorHomeService,
     getAllDoctors,
     saveDetailDoctorService,
     getDetailInforDoctor,
     saveBulkScheduleDoctor,
     getScheduleDoctorByDate,
     getExtraInfoDoctorById,
     getProfileDoctorById,
     postPatientBookAppointment,
     postVerifyBookAppointment,
     createNewSpecialty,
     getAllSpecialty,
     getAllDetailSpecialtyById,
     createNewClinic,
     getAllClinic,
     getAllDetailClinicById,
     getAllPatientForDoctor,
     postSendRemedy
}