// // import React, { Component } from 'react';
// // import { toast } from 'react-toastify';
// // import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
// // import PropTypes from 'prop-types';
// // import Select from 'react-select';
// // import { getUsersApi, getCinemasApi, getTheatersByCinemaApi, getShowtimesByTheaterApi, getSeatsByShowtimeApi, getTicketByIdApi } from '../../../../services/userService';

// // class TicketForm extends Component {
// //     constructor(props) {
// //         super(props);
// //         const { ticket } = this.props;
// //         this.state = {
// //             user_id: ticket ? { value: ticket.user.id, label: ticket.user.username } : null,
// //             cinema: null,
// //             theater: null,
// //             showtime: null,
// //             seat: null,
// //             price: ticket ? ticket.price : '',
// //             status: ticket ? ticket.status : 'Booked',
// //             users: [], // Danh sách người dùng
// //             cinemas: [],
// //             theaters: [],
// //             showtimes: [],
// //             seats: [],
// //             errors: {},
// //             isLoading: false,
// //         };
// //     }

// //     componentDidMount() {
// //         this.fetchUsers();
// //         this.fetchCinemas();
// //         if (this.props.isEditMode && this.props.ticket) {
// //             this.loadExistingData();
// //         }
// //     }

// //     // Hàm lấy danh sách người dùng (Users)
// //     fetchUsers = async () => {
// //         try {
// //             const response = await getUsersApi();
// //             console.log("check log user", response)
// //             if (response && response.status === 'success') {
// //                 const users = response.data.users.map(user => ({
// //                     value: user.id,
// //                     label: user.name,
// //                 }));
// //                 this.setState({ users });
// //             } else {
// //                 toast.error('Lỗi khi lấy danh sách người dùng.');
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error('Lỗi khi gọi API lấy danh sách người dùng.');
// //         }
// //     };

// //     // Hàm lấy danh sách rạp
// //     fetchCinemas = async () => {
// //         try {
// //             const response = await getCinemasApi();
// //             if (response && response.status === 'success') {
// //                 const cinemas = response.data.map(cinema => ({
// //                     value: cinema.id,
// //                     label: cinema.name,
// //                 }));
// //                 this.setState({ cinemas });
// //             } else {
// //                 toast.error('Lỗi khi lấy danh sách rạp.');
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error('Lỗi khi gọi API lấy danh sách rạp.');
// //         }
// //     };

// //     // Hàm lấy danh sách phòng chiếu theo rạp
// //     fetchTheaters = async (cinemaId) => {
// //         if (!cinemaId) {
// //             this.setState({ theaters: [], theater: null, showtimes: [], showtime: null, seats: [], seat: null });
// //             return;
// //         }
// //         try {
// //             const response = await getTheatersByCinemaApi(cinemaId);
// //             if (response && response.status === 'success') {
// //                 const theaters = response.data.map(theater => ({
// //                     value: theater.id,
// //                     label: theater.name,
// //                 }));
// //                 this.setState({ theaters });
// //             } else {
// //                 toast.error('Lỗi khi lấy danh sách phòng chiếu.');
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error('Lỗi khi gọi API lấy danh sách phòng chiếu.');
// //         }
// //     };

// //     // Hàm lấy danh sách suất chiếu theo phòng chiếu
// //     fetchShowtimes = async (theaterId) => {
// //         if (!theaterId) {
// //             this.setState({ showtimes: [], showtime: null, seats: [], seat: null });
// //             return;
// //         }
// //         try {
// //             const response = await getShowtimesByTheaterApi(theaterId, 1, 1000, 'start_time', 'ASC', '');
// //             if (response && response.status === 'success') {
// //                 const showtimes = response.data.showtimes.map(showtime => ({
// //                     value: showtime.id,
// //                     label: `${showtime.movie.title} - ${new Date(showtime.start_time).toLocaleString()}`,
// //                 }));
// //                 this.setState({ showtimes });
// //             } else {
// //                 toast.error('Lỗi khi lấy danh sách suất chiếu.');
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error('Lỗi khi gọi API lấy danh sách suất chiếu.');
// //         }
// //     };

// //     // Hàm lấy danh sách ghế theo suất chiếu
// //     fetchSeats = async (showtimeId) => {
// //         if (!showtimeId) {
// //             this.setState({ seats: [], seat: null });
// //             return;
// //         }
// //         try {
// //             const response = await getSeatsByShowtimeApi(showtimeId);
// //             if (response && response.status === 'success') {
// //                 const seats = response.data.seats.map(seat => ({
// //                     value: seat.id,
// //                     label: `${seat.row}-${seat.number} (${seat.type})`,
// //                     isDisabled: seat.status === 'booked', // Vô hiệu hóa ghế đã đặt
// //                 }));
// //                 this.setState({ seats });
// //             } else {
// //                 toast.error('Lỗi khi lấy danh sách ghế.');
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error('Lỗi khi gọi API lấy danh sách ghế.');
// //         }
// //     };

// //     // Hàm tải dữ liệu hiện tại khi chỉnh sửa vé
// //     // loadExistingData = async () => {
// //     //     const { ticket } = this.props;
// //     //     this.setState({ isLoading: true });
// //     //     try {
// //     //         // Giả sử bạn cần lấy thông tin rạp, phòng chiếu, suất chiếu và ghế của vé hiện tại
// //     //         const showtime = await Showtime.findByPk(ticket.showtime_id, {
// //     //             include: [{ model: db.Movie, as: 'movie' }, { model: db.Theater, as: 'theater' }],
// //     //         });

// //     //         const cinemaId = showtime.theater.theater_id; // Giả sử Theater có trường theater_id để liên kết với Cinema
// //     //         const cinema = { value: showtime.theater.id, label: showtime.theater.name };
// //     //         const theaters = [{ value: showtime.theater.id, label: showtime.theater.name }];
// //     //         const showtimes = [{ value: showtime.id, label: `${showtime.movie.title} - ${new Date(showtime.start_time).toLocaleString()}` }];
// //     //         const seat = { value: ticket.seat.id, label: `${ticket.seat.row}-${ticket.seat.number} (${ticket.seat.type})` };

// //     //         this.setState({
// //     //             user_id: { value: ticket.user.id, label: ticket.user.name },
// //     //             cinema,
// //     //             theaters,
// //     //             theater: { value: showtime.theater.id, label: showtime.theater.name },
// //     //             showtimes,
// //     //             showtime: { value: showtime.id, label: `${showtime.movie.title} - ${new Date(showtime.start_time).toLocaleString()}` },
// //     //             seats: [{ value: ticket.seat.id, label: `${ticket.seat.row}-${ticket.seat.number} (${ticket.seat.type})`, isDisabled: false }],
// //     //             seat,
// //     //             price: ticket.price,
// //     //             status: ticket.status,
// //     //             isLoading: false,
// //     //         });
// //     //     } catch (error) {
// //     //         console.error(error);
// //     //         toast.error('Lỗi khi tải dữ liệu vé.');
// //     //         this.setState({ isLoading: false });
// //     //     }
// //     // };
// //     loadExistingData = async () => {
// //         const { ticket } = this.props;
// //         this.setState({ isLoading: true });
// //         try {
// //             const response = await getTicketByIdApi(ticket.id);
// //             if (response && response.status === 'success') {
// //                 const detailedTicket = response.data.data;

// //                 // Lấy thông tin cinema
// //                 const cinema = { value: detailedTicket.cinema.id, label: detailedTicket.cinema.name };

// //                 // Lấy thông tin theater
// //                 const theater = { value: detailedTicket.showtime.theater.id, label: detailedTicket.showtime.theater.name };

// //                 // Lấy thông tin showtime
// //                 const showtime = {
// //                     value: detailedTicket.showtime.id,
// //                     label: `${detailedTicket.showtime.movie.title} - ${new Date(detailedTicket.showtime.start_time).toLocaleString()}`
// //                 };

// //                 // Lấy thông tin seat
// //                 const seat = {
// //                     value: detailedTicket.seat.id,
// //                     label: `${detailedTicket.seat.row}-${detailedTicket.seat.number} (${detailedTicket.seat.type})`,
// //                     isDisabled: false, // Không disable vì đã được chọn
// //                 };

// //                 // Cập nhật state với dữ liệu đã lấy
// //                 this.setState({
// //                     user_id: { value: detailedTicket.user.id, label: detailedTicket.user.name },
// //                     cinema,
// //                     theaters: [{ value: detailedTicket.showtime.theater.id, label: detailedTicket.showtime.theater.name }],
// //                     theater,
// //                     showtimes: [{ value: detailedTicket.showtime.id, label: `${detailedTicket.showtime.movie.title} - ${new Date(detailedTicket.showtime.start_time).toLocaleString()}` }],
// //                     showtime,
// //                     seats: [{ value: detailedTicket.seat.id, label: `${detailedTicket.seat.row}-${detailedTicket.seat.number} (${detailedTicket.seat.type})`, isDisabled: false }],
// //                     seat,
// //                     price: detailedTicket.price,
// //                     status: detailedTicket.status,
// //                     isLoading: false,
// //                 });
// //             } else {
// //                 toast.error('Không tìm thấy vé.');
// //                 this.setState({ isLoading: false });
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error('Lỗi khi tải dữ liệu vé.');
// //             this.setState({ isLoading: false });
// //         }
// //     };
// //     handleChange = (selectedOption, actionMeta) => {
// //         const { name } = actionMeta;
// //         this.setState({ [name]: selectedOption }, () => {
// //             if (name === 'cinema') {
// //                 this.fetchTheaters(selectedOption ? selectedOption.value : '');
// //                 this.setState({ theater: null, showtime: null, seats: [], seat: null });
// //             } else if (name === 'theater') {
// //                 this.fetchShowtimes(selectedOption ? selectedOption.value : '');
// //                 this.setState({ showtime: null, seats: [], seat: null });
// //             } else if (name === 'showtime') {
// //                 this.fetchSeats(selectedOption ? selectedOption.value : '');
// //                 this.setState({ seat: null });
// //             }
// //         });
// //     };

// //     validate = () => {
// //         const { user_id, cinema, theater, showtime, seat, price } = this.state;
// //         const errors = {};
// //         if (!user_id) errors.user_id = 'Vui lòng chọn người dùng.';
// //         if (!cinema) errors.cinema = 'Vui lòng chọn rạp.';
// //         if (!theater) errors.theater = 'Vui lòng chọn phòng chiếu.';
// //         if (!showtime) errors.showtime = 'Vui lòng chọn suất chiếu.';
// //         if (!seat) errors.seat = 'Vui lòng chọn ghế.';
// //         if (!price) {
// //             errors.price = 'Vui lòng nhập giá vé.';
// //         } else if (isNaN(price) || Number(price) < 0) {
// //             errors.price = 'Giá vé phải là một số dương.';
// //         }
// //         this.setState({ errors });
// //         return Object.keys(errors).length === 0;
// //     };

// //     handleSubmit = (e) => {
// //         e.preventDefault();
// //         if (this.validate()) {
// //             const { user_id, showtime, seat, price, status } = this.state;
// //             const ticketData = {
// //                 user_id: user_id.value,
// //                 showtime_id: showtime.value,
// //                 seat_id: seat.value,
// //                 price: parseFloat(price),
// //                 status,
// //             };
// //             this.props.onSave(ticketData);
// //         }
// //     };

// //     render() {
// //         const {
// //             users,
// //             user_id,
// //             cinemas,
// //             cinema,
// //             theaters,
// //             theater,
// //             showtimes,
// //             showtime,
// //             seats,
// //             seat,
// //             price,
// //             status,
// //             errors,
// //             isLoading,
// //         } = this.state;
// //         const { onCancel, isEditMode } = this.props;

// //         return (
// //             <Form onSubmit={this.handleSubmit}>
// //                 {/* Chọn người dùng */}
// //                 <FormGroup>
// //                     <Label for="user_id">Người Dùng</Label>
// //                     <Select
// //                         name="user_id"
// //                         id="user_id"
// //                         options={users}
// //                         value={user_id}
// //                         onChange={this.handleChange}
// //                         isClearable
// //                         placeholder="-- Chọn Người Dùng --"
// //                         className={errors.user_id ? 'is-invalid' : ''}
// //                     />
// //                     {errors.user_id && <div className="invalid-feedback d-block">{errors.user_id}</div>}
// //                 </FormGroup>

// //                 {/* Chọn rạp */}
// //                 <FormGroup>
// //                     <Label for="cinema">Rạp</Label>
// //                     <Select
// //                         name="cinema"
// //                         id="cinema"
// //                         options={cinemas}
// //                         value={cinema}
// //                         onChange={this.handleChange}
// //                         isClearable
// //                         placeholder="-- Chọn Rạp --"
// //                         className={errors.cinema ? 'is-invalid' : ''}
// //                     />
// //                     {errors.cinema && <div className="invalid-feedback d-block">{errors.cinema}</div>}
// //                 </FormGroup>

// //                 {/* Chọn phòng chiếu */}
// //                 <FormGroup>
// //                     <Label for="theater">Phòng Chiếu</Label>
// //                     <Select
// //                         name="theater"
// //                         id="theater"
// //                         options={theaters}
// //                         value={theater}
// //                         onChange={this.handleChange}
// //                         isClearable
// //                         placeholder="-- Chọn Phòng Chiếu --"
// //                         isDisabled={!cinema}
// //                         className={errors.theater ? 'is-invalid' : ''}
// //                     />
// //                     {errors.theater && <div className="invalid-feedback d-block">{errors.theater}</div>}
// //                 </FormGroup>

// //                 {/* Chọn suất chiếu */}
// //                 <FormGroup>
// //                     <Label for="showtime">Suất Chiếu</Label>
// //                     <Select
// //                         name="showtime"
// //                         id="showtime"
// //                         options={showtimes}
// //                         value={showtime}
// //                         onChange={this.handleChange}
// //                         isClearable
// //                         placeholder="-- Chọn Suất Chiếu --"
// //                         isDisabled={!theater}
// //                         className={errors.showtime ? 'is-invalid' : ''}
// //                     />
// //                     {errors.showtime && <div className="invalid-feedback d-block">{errors.showtime}</div>}
// //                 </FormGroup>

// //                 {/* Chọn ghế */}
// //                 <FormGroup>
// //                     <Label for="seat">Ghế</Label>
// //                     <Select
// //                         name="seat"
// //                         id="seat"
// //                         options={seats}
// //                         value={seat}
// //                         onChange={this.handleChange}
// //                         isClearable
// //                         placeholder="-- Chọn Ghế --"
// //                         isDisabled={!showtime}
// //                         className={errors.seat ? 'is-invalid' : ''}
// //                     />
// //                     {errors.seat && <div className="invalid-feedback d-block">{errors.seat}</div>}
// //                 </FormGroup>

// //                 {/* Nhập giá vé */}
// //                 <FormGroup>
// //                     <Label for="price">Giá Vé (VNĐ)</Label>
// //                     <Input
// //                         type="number"
// //                         name="price"
// //                         id="price"
// //                         value={price}
// //                         onChange={(e) => this.setState({ price: e.target.value })}
// //                         invalid={!!errors.price}
// //                         min="0"
// //                         step="1000"
// //                         required
// //                     />
// //                     {errors.price && <FormFeedback>{errors.price}</FormFeedback>}
// //                 </FormGroup>

// //                 {/* Chọn trạng thái vé */}
// //                 <FormGroup>
// //                     <Label for="status">Trạng Thái</Label>
// //                     <Input
// //                         type="select"
// //                         name="status"
// //                         id="status"
// //                         value={status}
// //                         onChange={(e) => this.setState({ status: e.target.value })}
// //                     >
// //                         <option value="Booked">Đã Đặt</option>
// //                         <option value="Cancelled">Đã Hủy</option>
// //                     </Input>
// //                 </FormGroup>

// //                 {/* Nút lưu và hủy */}
// //                 <Button color="primary" type="submit" disabled={isLoading}>
// //                     {isEditMode ? 'Cập Nhật' : 'Tạo'}
// //                 </Button>{' '}
// //                 <Button color="secondary" onClick={onCancel}>Hủy</Button>
// //             </Form>
// //         );
// //     }
// // }
// //     TicketForm.propTypes = {
// //         ticket: PropTypes.object,
// //         onSave: PropTypes.func.isRequired,
// //         onCancel: PropTypes.func.isRequired,
// //         isEditMode: PropTypes.bool,
// //     };

// //     export default TicketForm;
// import React, { Component } from 'react';
// import { toast } from 'react-toastify';
// import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
// import PropTypes from 'prop-types';
// import Select from 'react-select';
// import {
//     getUsersApi,
//     getCinemasApi,
//     getTheatersByCinemaApi,
//     getShowtimesByTheaterApi,
//     getSeatsByShowtimeApi,
//     getTicketByIdApi
// } from '../../../../services/userService';

// class TicketForm extends Component {
//     constructor(props) {
//         super(props);
//         const { ticket } = this.props;
//         this.state = {
//             user_id: ticket ? { value: ticket.user.id, label: ticket.user.username } : null, // Sửa từ username thành name
//             cinema: null,
//             theater: null,
//             showtime: null,
//             seat: null,
//             price: ticket ? ticket.price : '',
//             status: ticket ? ticket.status : 'Booked',
//             users: [], // Danh sách người dùng
//             cinemas: [],
//             theaters: [],
//             showtimes: [],
//             seats: [],
//             errors: {},
//             isLoading: false,
//             currentPage: 1,
//             totalPages: 0,
//             limit: 10,
//             sortField: 'createdAt',
//             sortOrder: 'DESC',
//             search: '',
//         };
//     }

//     componentDidMount() {
//         this.fetchUsers();
//         this.fetchCinemas();
//         if (this.props.isEditMode && this.props.ticket) {
//             this.loadExistingData();
//         }
//     }

//     // Hàm lấy danh sách người dùng (Users)
//     fetchUsers = async () => {
//         const { currentPage, limit, sortField, sortOrder, search } = this.state;
//         this.setState({ isLoading: true });
//         try {
//             const data = await getUsersApi(currentPage, limit, sortField, sortOrder, search);
//             console.log("check data", data)
//             if (data.status === 'success') {
//                 const users = data.data.users.map(user => ({
//                     value: user.id,
//                     label: user.username,
//                 }));

//                 this.setState({
//                     users,
//                     // totalPages: data.data.totalPages, // Not necessary in TicketForm
//                     isLoading: false,
//                 });
//                 // console.log("check log user", users);
//             } else {
//                 toast.error('Lỗi khi lấy danh sách người dùng.');
//                 this.setState({ isLoading: false });
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error(error.message || 'Lỗi khi gọi API lấy danh sách người dùng.');
//             this.setState({ isLoading: false });
//         }
//     };

//     // Hàm lấy danh sách rạp
//     fetchCinemas = async () => {
//         try {
//             const response = await getCinemasApi();
//             if (response && response.status === 'success') {
//                 const cinemas = response.data.map(cinema => ({
//                     value: cinema.id,
//                     label: cinema.name,
//                 }));
//                 this.setState({ cinemas });
//             } else {
//                 toast.error('Lỗi khi lấy danh sách rạp.');
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi gọi API lấy danh sách rạp.');
//         }
//     };

//     // Hàm lấy danh sách phòng chiếu theo rạp
//     fetchTheaters = async (cinemaId) => {
//         if (!cinemaId) {
//             this.setState({ theaters: [], theater: null, showtimes: [], showtime: null, seats: [], seat: null });
//             return;
//         }
//         try {
//             const response = await getTheatersByCinemaApi(cinemaId);
//             console.log("res theater by cinema", response)
//             if (response && response.status === 'success') {
//                 const theaters = response.data.map(theater => ({
//                     value: theater.id,
//                     label: theater.name,
//                 }));
//                 this.setState({ theaters });
//             } else {
//                 toast.error('Lỗi khi lấy danh sách phòng chiếu.');
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi gọi API lấy danh sách phòng chiếu.');
//         }
//     };

//     // Hàm lấy danh sách suất chiếu theo phòng chiếu
//     fetchShowtimes = async (theaterId) => {
//         if (!theaterId) {
//             this.setState({ showtimes: [], showtime: null, seats: [], seat: null });
//             return;
//         }
//         try {
//             const response = await getShowtimesByTheaterApi(theaterId, 1, 1000, 'start_time', 'ASC', '');
//             if (response && response.status === 'success') {
//                 const showtimes = response.data.showtimes.map(showtime => ({
//                     value: showtime.id,
//                     label: `${showtime.movie.title} - ${new Date(showtime.start_time).toLocaleString()}`,
//                 }));
//                 this.setState({ showtimes });
//             } else {
//                 toast.error('Lỗi khi lấy danh sách suất chiếu.');
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi gọi API lấy danh sách suất chiếu.');
//         }
//     };

//     // Hàm lấy danh sách ghế theo suất chiếu
//     fetchSeats = async (showtimeId) => {
//         if (!showtimeId) {
//             this.setState({ seats: [], seat: null });
//             return;
//         }
//         try {
//             const response = await getSeatsByShowtimeApi(showtimeId);
//             console.log("check seat by showtime", response)
//             if (response && response.status === 'success') {
//                 const seats = response.data.seats.map(seat => ({
//                     value: seat.id,
//                     label: `${seat.row}-${seat.number} (${seat.type})`,
//                     isDisabled: seat.status === 'booked', // Vô hiệu hóa ghế đã đặt
//                 }));
//                 this.setState({ seats });
//             } else {
//                 toast.error('Lỗi khi lấy danh sách ghế.');
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi gọi API lấy danh sách ghế.');
//         }
//     };

//     // Hàm tải dữ liệu hiện tại khi chỉnh sửa vé
//     loadExistingData = async () => {
//         const { ticket } = this.props;
//         this.setState({ isLoading: true });
//         try {
//             const response = await getTicketByIdApi(ticket.id);
//             if (response && response.status === 'success') {
//                 const detailedTicket = response.data.data;

//                 // Lấy thông tin cinema
//                 const cinema = { value: detailedTicket.cinema.id, label: detailedTicket.cinema.name };

//                 // Lấy thông tin theater
//                 const theater = { value: detailedTicket.showtime.theater.id, label: detailedTicket.showtime.theater.name };

//                 // Lấy thông tin showtime
//                 const showtime = {
//                     value: detailedTicket.showtime.id,
//                     label: `${detailedTicket.showtime.movie.title} - ${new Date(detailedTicket.showtime.start_time).toLocaleString()}`
//                 };

//                 // Lấy thông tin seat
//                 const seat = {
//                     value: detailedTicket.seat.id,
//                     label: `${detailedTicket.seat.row}-${detailedTicket.seat.number} (${detailedTicket.seat.type})`,
//                     isDisabled: false, // Không disable vì đã được chọn
//                 };

//                 // Cập nhật state với dữ liệu đã lấy
//                 this.setState({
//                     user_id: { value: detailedTicket.user.id, label: detailedTicket.user.username }, // Sửa từ name
//                     cinema,
//                     theaters: [{ value: detailedTicket.showtime.theater.id, label: detailedTicket.showtime.theater.name }],
//                     theater,
//                     showtimes: [{ value: detailedTicket.showtime.id, label: `${detailedTicket.showtime.movie.title} - ${new Date(detailedTicket.showtime.start_time).toLocaleString()}` }],
//                     showtime,
//                     seats: [{ value: detailedTicket.seat.id, label: `${detailedTicket.seat.row}-${detailedTicket.seat.number} (${detailedTicket.seat.type})`, isDisabled: false }],
//                     seat,
//                     price: detailedTicket.price,
//                     status: detailedTicket.status,
//                     isLoading: false,
//                 });
//             } else {
//                 toast.error('Không tìm thấy vé.');
//                 this.setState({ isLoading: false });
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi tải dữ liệu vé.');
//             this.setState({ isLoading: false });
//         }
//     };

//     handleChange = (selectedOption, actionMeta) => {
//         const { name } = actionMeta;
//         this.setState({ [name]: selectedOption }, () => {
//             if (name === 'cinema') {
//                 this.fetchTheaters(selectedOption ? selectedOption.value : '');
//                 this.setState({ theater: null, showtime: null, seats: [], seat: null });
//             } else if (name === 'theater') {
//                 this.fetchShowtimes(selectedOption ? selectedOption.value : '');
//                 this.setState({ showtime: null, seats: [], seat: null });
//             } else if (name === 'showtime') {
//                 this.fetchSeats(selectedOption ? selectedOption.value : '');
//                 this.setState({ seat: null });
//             }
//         });
//     };

//     validate = () => {
//         const { user_id, cinema, theater, showtime, seat, price } = this.state;
//         const errors = {};
//         if (!user_id) errors.user_id = 'Vui lòng chọn người dùng.';
//         if (!cinema) errors.cinema = 'Vui lòng chọn rạp.';
//         if (!theater) errors.theater = 'Vui lòng chọn phòng chiếu.';
//         if (!showtime) errors.showtime = 'Vui lòng chọn suất chiếu.';
//         if (!seat) errors.seat = 'Vui lòng chọn ghế.';
//         if (!price) {
//             errors.price = 'Vui lòng nhập giá vé.';
//         } else if (isNaN(price) || Number(price) < 0) {
//             errors.price = 'Giá vé phải là một số dương.';
//         }
//         this.setState({ errors });
//         return Object.keys(errors).length === 0;
//     };

//     handleSubmit = (e) => {
//         e.preventDefault();
//         if (this.validate()) {
//             const { user_id, showtime, seat, price, status } = this.state;
//             const ticketData = {
//                 user_id: user_id.value,
//                 showtime_id: showtime.value,
//                 seat_id: seat.value,
//                 price: parseFloat(price),
//                 status,
//             };
//             this.props.onSave(ticketData);
//         }
//     };

//     render() {
//         const {
//             users,
//             user_id,
//             cinemas,
//             cinema,
//             theaters,
//             theater,
//             showtimes,
//             showtime,
//             seats,
//             seat,
//             price,
//             status,
//             errors,
//             isLoading,
//         } = this.state;
//         const { onCancel, isEditMode } = this.props;

//         return (

//             <Form onSubmit={this.handleSubmit}>
//                 {/* Chọn người dùng */}
//                 <FormGroup>
//                     <Label for="user_id">Người Dùng</Label>
//                     <Select
//                         name="user_id"
//                         id="user_id"
//                         options={users}
//                         value={user_id}
//                         onChange={this.handleChange}
//                         isClearable
//                         placeholder="-- Chọn Người Dùng --"
//                         className={errors.user_id ? 'is-invalid' : ''}
//                     />  {console.log("check users", users)}
//                     {errors.user_id && <div className="invalid-feedback d-block">{errors.user_id}</div>}
//                 </FormGroup>

//                 {/* Chọn rạp */}
//                 <FormGroup>
//                     <Label for="cinema">Rạp</Label>
//                     <Select
//                         name="cinema"
//                         id="cinema"
//                         options={cinemas}
//                         value={cinema}
//                         onChange={this.handleChange}
//                         isClearable
//                         placeholder="-- Chọn Rạp --"
//                         className={errors.cinema ? 'is-invalid' : ''}
//                     />    {console.log("check cinema", cinemas)}
//                     {errors.cinema && <div className="invalid-feedback d-block">{errors.cinema}</div>}
//                 </FormGroup>

//                 {/* Chọn phòng chiếu */}
//                 <FormGroup>
//                     <Label for="theater">Phòng Chiếu</Label>
//                     <Select
//                         name="theater"
//                         id="theater"
//                         options={theaters}
//                         value={theater}
//                         onChange={this.handleChange}
//                         isClearable
//                         placeholder="-- Chọn Phòng Chiếu --"
//                         isDisabled={!cinema}
//                         className={errors.theater ? 'is-invalid' : ''}
//                     />
//                     {errors.theater && <div className="invalid-feedback d-block">{errors.theater}</div>}
//                 </FormGroup>

//                 {/* Chọn suất chiếu */}
//                 <FormGroup>
//                     <Label for="showtime">Suất Chiếu</Label>
//                     <Select
//                         name="showtime"
//                         id="showtime"
//                         options={showtimes}
//                         value={showtime}
//                         onChange={this.handleChange}
//                         isClearable
//                         placeholder="-- Chọn Suất Chiếu --"
//                         isDisabled={!theater}
//                         className={errors.showtime ? 'is-invalid' : ''}
//                     />
//                     {errors.showtime && <div className="invalid-feedback d-block">{errors.showtime}</div>}
//                 </FormGroup>

//                 {/* Chọn ghế */}
//                 <FormGroup>
//                     <Label for="seat">Ghế</Label>
//                     <Select
//                         name="seat"
//                         id="seat"
//                         options={seats}
//                         value={seat}
//                         onChange={this.handleChange}
//                         isClearable
//                         placeholder="-- Chọn Ghế --"
//                         isDisabled={!showtime}
//                         className={errors.seat ? 'is-invalid' : ''}
//                     />
//                     {errors.seat && <div className="invalid-feedback d-block">{errors.seat}</div>}
//                 </FormGroup>

//                 {/* Nhập giá vé */}
//                 <FormGroup>
//                     <Label for="price">Giá Vé (VNĐ)</Label>
//                     <Input
//                         type="number"
//                         name="price"
//                         id="price"
//                         value={price}
//                         onChange={(e) => this.setState({ price: e.target.value })}
//                         invalid={!!errors.price}
//                         min="0"
//                         step="1000"
//                         required
//                     />
//                     {errors.price && <FormFeedback>{errors.price}</FormFeedback>}
//                 </FormGroup>

//                 {/* Chọn trạng thái vé */}
//                 <FormGroup>
//                     <Label for="status">Trạng Thái</Label>
//                     <Input
//                         type="select"
//                         name="status"
//                         id="status"
//                         value={status}
//                         onChange={(e) => this.setState({ status: e.target.value })}
//                     >
//                         <option value="Booked">Đã Đặt</option>
//                         <option value="Cancelled">Đã Hủy</option>
//                     </Input>
//                 </FormGroup>

//                 {/* Nút lưu và hủy */}
//                 <Button color="primary" type="submit" disabled={isLoading}>
//                     {isEditMode ? 'Cập Nhật' : 'Tạo'}
//                 </Button>{' '}
//                 <Button color="secondary" onClick={onCancel}>Hủy</Button>
//             </Form>
//         );
//     }
// }
// TicketForm.propTypes = {
//     ticket: PropTypes.object,
//     onSave: PropTypes.func.isRequired,
//     onCancel: PropTypes.func.isRequired,
//     isEditMode: PropTypes.bool,
// };

// export default TicketForm;

// src/containers/System/Admin/components/TicketForm.js

import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

class TicketForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.ticket ? props.ticket.user.id : '',
            showtimeId: props.ticket ? props.ticket.showtime.id : '',
            seatIds: props.ticket ? [props.ticket.seat.id] : [], // Có thể chọn nhiều ghế
            paymentMethod: props.ticket ? props.ticket.payment_method : 'paypal',
            // Các trường khác nếu cần
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSeatChange = (e) => {
        const options = e.target.options;
        const selectedSeats = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedSeats.push(parseInt(options[i].value));
            }
        }
        this.setState({ seatIds: selectedSeats });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { userId, showtimeId, seatIds, paymentMethod } = this.state;
        // Gọi hàm onSave từ props
        this.props.onSave({ userId, showtimeId, seatIds, paymentMethod });
    };

    render() {
        const { userId, showtimeId, seatIds, paymentMethod } = this.state;
        const { onCancel, isEditMode } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="user">Người Dùng</Label>
                    <Input
                        type="select"
                        name="userId"
                        id="user"
                        value={userId}
                        onChange={this.handleChange}
                        required
                        disabled={isEditMode} // Không cho sửa người dùng khi chỉnh sửa vé
                    >
                        <option value="">-- Chọn người dùng --</option>
                        {/* Map danh sách người dùng từ props hoặc state */}
                        {/* Ví dụ:
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        */}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="showtime">Suất Chiếu</Label>
                    <Input
                        type="select"
                        name="showtimeId"
                        id="showtime"
                        value={showtimeId}
                        onChange={this.handleChange}
                        required
                        disabled={isEditMode} // Không cho sửa suất chiếu khi chỉnh sửa vé
                    >
                        <option value="">-- Chọn suất chiếu --</option>
                        {/* Map danh sách suất chiếu từ props hoặc state */}
                        {/* Ví dụ:
                            {showtimes.map(showtime => (
                                <option key={showtime.id} value={showtime.id}>
                                    {showtime.movie.title} - {new Date(showtime.start_time).toLocaleString()}
                                </option>
                            ))}
                        */}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="seats">Ghế</Label>
                    <Input
                        type="select"
                        name="seatIds"
                        id="seats"
                        multiple
                        value={seatIds}
                        onChange={this.handleSeatChange}
                        required
                    >
                        <option value="">-- Chọn ghế --</option>
                        {/* Map danh sách ghế từ props hoặc state */}
                        {/* Ví dụ:
                            {seats.map(seat => (
                                <option key={seat.id} value={seat.id}>
                                    {seat.row}-{seat.number} ({seat.type})
                                </option>
                            ))}
                        */}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="paymentMethod">Phương Thức Thanh Toán</Label>
                    <Input
                        type="select"
                        name="paymentMethod"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={this.handleChange}
                        required
                    >
                        <option value="paypal">PayPal</option>
                        <option value="credit_card">Thẻ Tín Dụng</option>
                        {/* Thêm các phương thức khác nếu cần */}
                    </Input>
                </FormGroup>
                {/* Thêm các trường khác nếu cần */}
                <Button color="secondary" onClick={onCancel}>Hủy</Button>{' '}
                <Button color="primary" type="submit">
                    {isEditMode ? 'Cập Nhật' : 'Tạo'}
                </Button>
            </Form>
        );
    }
}

TicketForm.propTypes = {
    ticket: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isEditMode: PropTypes.bool.isRequired,
};

export default TicketForm;
