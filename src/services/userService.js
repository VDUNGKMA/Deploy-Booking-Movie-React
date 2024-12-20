import axios from '../axios'



const handleLoginApi = (email, password) => {

     return axios.post('/api/auth/login', { email, password })
}
const handleGoogleLoginApi = async (googleToken) => {
     try {
          const response = await axios.post(`/api/auth/google-login`, {
               token: googleToken
          });
          return response.data;
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};
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
// const getUsersByRoleApi = (roleId) => {
//      const token = localStorage.getItem('token'); // Lấy token từ localStorage
//      if (token) {
//           return axios.get('/api/admin/users-by-role', {
//                params: { role_id: roleId }, // Truyền role_id qua query params
//                headers: {
//                     Authorization: `Bearer ${token}` // Đính kèm token vào header Authorization
//                }
//           });
//      } else {
//           return Promise.reject('No token found'); // Xử lý khi không có token
//      }
// };
const getUsersByRoleApi = (roleId, page = 1, limit = 10, search = '') => {
     const token = localStorage.getItem('token'); // Lấy token từ localStorage
     if (token) {
          return axios.get('/api/admin/users-by-role', {
               params: { 
                    role_id: roleId,
                    page, // Current page number
                    limit,
                    search
                }, // Truyền role_id qua query params
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
const getUsersApi = async (page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'DESC', search = '') => {
     try {
          const params = { page, limit, sortField, sortOrder, search };
          const response = await axios.get(`/api/admin/get-users`, { params })
          return response
     } catch (error) {
          throw error.response
     }
};
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

// Gọi API để lấy tất cả các phim với phân trang và tìm kiếm
export const getAllMoviesApi = (page = 1, limit = 10, search = '') => {
     return axios.get('api/admin/movies', {
          params: {
               page,       // Số trang hiện tại
               limit,      // Số phim trên mỗi trang
               search      // Từ khóa tìm kiếm
          }
     });
};

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
// const getSeatsByTheaterApi = (theaterId) => {
//      return axios.get(`/api/admin/theaters/${theaterId}/seats`);
// };
// // Hàm lấy danh sách ghế với phân trang cho quản trị viên
// const getSeatsByTheaterAdminApi = (theaterId, page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', search = '') => {
//      return axios.get(`/api/admin/theaters/${theaterId}/seats/admin`, {
//           params: { page, limit, sortField, sortOrder, search },
//      });
// };
// const createSeatApi = (theaterId, seatData) => {
//      const token = localStorage.getItem('token'); // Get token from localStorage
//      if (token) {
//           return axios.post(`/api/admin/theaters/${theaterId}/seats`, seatData, {
//                headers: {
//                     Authorization: `Bearer ${token}` // Attach token to the request headers
//                }
//           });
//      } else {
//           return Promise.reject('No token found');
//      }
// };

// const updateSeatApi = (theaterId, seatId, seatData) => {
//      const token = localStorage.getItem('token'); // Get token from localStorage
//      if (token) {
//           return axios.put(`/api/admin/theaters/${theaterId}/seats/${seatId}`, seatData, {
//                headers: {
//                     Authorization: `Bearer ${token}` // Attach token to the request headers
//                }
//           });
//      } else {
//           return Promise.reject('No token found');
//      }
// };

// const deleteSeatApi = (theaterId, seatId) => {
//      const token = localStorage.getItem('token'); // Get token from localStorage
//      if (token) {
//           return axios.delete(`/api/admin/theaters/${theaterId}/seats/${seatId}`, {
//                headers: {
//                     Authorization: `Bearer ${token}` // Attach token to the request headers
//                }
//           });
//      } else {
//           return Promise.reject('No token found');
//      }
// };

// const updateSeatStatusApi = (theaterId, seatId, status) => {
//      return axios.patch(`/api/admin/theaters/${theaterId}/seats/${seatId}/status`, { status });
// };
// Lấy tất cả ghế cho SeatLayout
const getSeatsByTheaterApi = async (theaterId) => {
     try {
          const response = await axios.get(`/api/admin/theaters/${theaterId}/seats`);
          return response;
     } catch (error) {
          throw error.response;
     }
};

// Lấy danh sách ghế với phân trang cho bảng
const getSeatsByTheaterAdminApi = async (theaterId, page, limit, sortField, sortOrder, search) => {
     try {
          const response = await axios.get(`/api/admin/theaters/${theaterId}/seats/admin`, {
               params: {
                    page,
                    limit,
                    sortField,
                    sortOrder,
                    search,
               }
          });
          console.log("check get seat by theater api ", response)
          return response;
     } catch (error) {
          throw error.response;
     }
};

// Thêm ghế ngồi

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
// Sửa ghế ngồi

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
// Xóa ghế ngồi

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
// Hàm lấy danh sách suất chiếu với phân trang
const getShowtimesApi = (theaterId, page = 1, limit = 10, sortField = 'start_time', sortOrder = 'ASC', search = '') => {
     return axios.get(`/api/admin/theaters/${theaterId}/showtimes`, {
          params: { page, limit, sortField, sortOrder, search },
     });
};
// **3. API cho Ghế theo Showtime**
const getSeatsByShowtimeApi = async (showtimeId) => {
     try {
          const response = await axios.get(`/api/admin/${showtimeId}/seats`)
          return response
     } catch (error) {
          throw error.response
     }
};
// const getShowtimesByTheaterApi = (theaterId, page = 1, limit = 10, sortField = 'start_time', sortOrder = 'ASC', search = '') => {
//      return axios.get(`/api/admin/theaters/${theaterId}/get-showtimes`, {
//           params: { page, limit, sortField, sortOrder, search },
//      });
// };
const getShowtimesByTheaterApi = (theaterId, page, limit, sortField, sortOrder, search) => {
     return axios.get(`/api/admin/showtimes`, {
          params: { theaterId, page, limit, sortField, sortOrder, search },
     });
};
// Hàm lấy chi tiết một suất chiếu
const getShowtimeByIdApi = (showtimeId) => {
     return axios.get(`/api/admin/showtimes/${showtimeId}`);

};

// Hàm tạo mới suất chiếu
const createShowtimeApi = (showtimeData) => {
     const token = localStorage.getItem('token'); // Get token from localStorage
     if (token) {
          return axios.post(`/api/admin/showtimes`, showtimeData, {
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
// **1. API cho Vé**

const createTicketApi = async (ticketData) => {
     try {
          const response = await axios.post(`/api/admin/tickets`, ticketData)
          return response
     } catch (error) {
          throw error.response
     }
};

const getTicketsForAdminApi = async (params) => {
     try {
          const response = await axios.get(`/api/admin/tickets`, { params })
          return response
     } catch (error) {
          throw error.response
     }
};
const cancelTicketApi = async (ticketId) => {
     try {
          const response = await axios.patch(`/api/admin/tickets/${ticketId}/cancel`, {}, {
               // headers: {
               //      Authorization: `Bearer ${localStorage.getItem('token')}`, // Hoặc cách bạn lưu token
               // },
          });
          return response.data;
     } catch (error) {
          throw error.response.data;
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
const getDailyRevenueByTheater = async (cinemaId, date) => {
     try {
          const response = await axios.get('/api/admin/revenue/daily', {
               params: { cinemaId, date }
          });
          return response;
     } catch (error) {
          console.error('Error fetching daily revenue by theater:', error);
          throw error;
     }
};
const getMonthlyRevenueByTheater = async (cinemaId, month, year) => {
     try {
          const response = await axios.get('/api/admin/revenue/monthly', {
               params: { cinemaId, month, year }
          });
          return response;
     } catch (error) {
          console.error('Error fetching monthly revenue by theater:', error);
          throw error;
     }
};
const getYearlyRevenueByTheater = async (cinemaId, year) => {
     try {
          const response = await axios.get('/api/admin/revenue/yearly', {
               params: { cinemaId, year }
          });
          return response;
     } catch (error) {
          console.error('Error fetching yearly revenue by theater:', error);
          throw error;
     }
};
const getTotalDailyRevenue = async (date) => {
     try {
          const response = await axios.get('/api/admin/revenue/total/daily', {
               params: { date }
          });
          return response;
     } catch (error) {
          console.error('Error fetching total daily revenue:', error);
          throw error;
     }
};
const getTotalMonthlyRevenue = async (month, year) => {
     try {
          const response = await axios.get('/api/admin/revenue/total/monthly', {
               params: { month, year }
          });
          return response;
     } catch (error) {
          console.error('Error fetching total monthly revenue:', error);
          throw error;
     }
};
const getTotalYearlyRevenue = async (year) => {
     try {
          const response = await axios.get('/api/admin/revenue/total/yearly', {
               params: { year }
          });
          return response;
     } catch (error) {
          console.error('Error fetching total yearly revenue:', error);
          throw error;
     }
};
// Lấy danh sách phòng chiếu trong rạp cụ thể
const fetchTheatersByCinema = async (cinemaId) => {
     const response = await axios.get(`/api/staff/theaters`, { params: { cinemaId } });
     return response;
};

// Lấy sơ đồ ghế ngồi theo suất chiếu
const fetchSeatsByShowtime = async (theaterId, showtimeId) => {
     const response = await axios.get(`/api/staff/theaters/${theaterId}/showtimes/${showtimeId}/seats`, { params: { theaterId, showtimeId } });
     return response;
};

// Lấy trạng thái phòng chiếu
const fetchTheaterStatus = async (theaterId, showtimeId) => {
      const response = await axios.get(`/api/staff/theaters/${theaterId}/showtimes/${showtimeId}/status`);
     return response;
};
const fetchShowtimesByTheater = async (theaterId, date) => {
     return axios.get(`/api/staff/theaters/${theaterId}/showtimes`, {
          params: { date },
     });
};
export {
     handleLoginApi,
     handleGoogleLoginApi,
     handleForgotPasswordApi,
     handleVerifyOtpApi,
     handleResetPasswordApi,
     getAllUsers,
     getUsersApi,
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
     // updateSeatStatusApi,
     getSeatsByShowtimeApi,
     getShowtimesApi,
     getShowtimesByTheaterApi,
     getShowtimeByIdApi,
     createShowtimeApi,
     updateShowtimeApi,
     deleteShowtimeApi,
     createTicketApi,
     getTicketsForAdminApi,
     cancelTicketApi,
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
     postSendRemedy,
     getDailyRevenueByTheater,
     getMonthlyRevenueByTheater,
     getYearlyRevenueByTheater,
     getTotalDailyRevenue,
     getTotalMonthlyRevenue,
     getTotalYearlyRevenue,
     fetchTheatersByCinema,
     fetchSeatsByShowtime,
     fetchTheaterStatus,
     fetchShowtimesByTheater
    
}