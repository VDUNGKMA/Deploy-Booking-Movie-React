// // // src/containers/System/Admin/ManageSeats.js

// // import React, { Component } from 'react';
// // import {
// //     // getSeatsByTheaterApi,
// //     getSeatsByTheaterAdminApi,
// //     createSeatApi,
// //     updateSeatApi,
// //     deleteSeatApi,
// //     updateSeatStatusApi,
// // } from '../../../services/userService';
// // import {
// //     Button,
// //     Form,
// //     FormGroup,
// //     Label,
// //     Input,
// //     Table,
// //     Modal,
// //     ModalHeader,
// //     ModalBody,
// //     ModalFooter,
// //     Spinner
// // } from 'reactstrap';
// // import { toast } from 'react-toastify';
// // import { withRouter, useLocation } from 'react-router-dom';
// // import './ManageSeats.scss'; // Tạo file CSS riêng nếu cần
// // import SeatLayout from './Component/SeatLayout';
// // class ManageSeats extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             seats: [],
// //             totalSeats: 0,
// //             currentPage: 1,
// //             totalPages: 0,
// //             limit: 10,
// //             sortField: 'id',
// //             sortOrder: 'ASC',
// //             search: '',
// //             isLoading: false,
// //             isAddEditSeatModalOpen: false,
// //             isEditSeatMode: false,
// //             selectedSeat: null,
// //             seatRow: '',
// //             seatNumber: '',
// //             seatType: '',
// //             theater: null, // Thông tin phòng chiếu
// //         };
// //     }

// //     async componentDidMount() {
// //         await this.fetchSeats();
// //         this.getTheaterFromState();
// //     }
// //     getTheaterFromState = () => {
// //         const { location } = this.props;
// //         if (location.state && location.state.theater) {
// //             this.setState({ theater: location.state.theater });
// //         }
// //     };
// //     // Lấy thông tin từ URL params
// //     getTheaterIdFromParams = () => {
// //         const { match } = this.props;
// //         return match.params.theaterId;
// //     };

// //     // Fetch seats by theater
// //     // fetchSeats = async () => {
// //     //     const theaterId = this.getTheaterIdFromParams();
// //     //     if (!theaterId) {
// //     //         toast.error('Không xác định được phòng chiếu!');
// //     //         return;
// //     //     }

// //     //     try {
// //     //         const response = await getSeatsByTheaterApi(theaterId);
// //     //         console.log("check get seat by theater api", response)
// //     //         if (response && response.status === 'success') {
// //     //             this.setState({
// //     //                 seats: response.data.seats,
// //     //                 // theater: response.data.theater, // Giả sử response.data.theater chứa thông tin phòng chiếu
// //     //             });
// //     //         } else {
// //     //             toast.error('Lỗi khi lấy danh sách ghế');
// //     //         }
// //     //     } catch (error) {
// //     //         console.error(error);
// //     //         toast.error('Lỗi khi gọi API');
// //     //     }
// //     // };
// //     fetchSeats = async () => {
// //         const { currentPage, limit, sortField, sortOrder, search } = this.state;
// //         const theaterId = this.getTheaterIdFromParams();
// //         if (!theaterId) {
// //             toast.error('Không xác định được phòng chiếu!');
// //             return;
// //         }

// //         this.setState({ isLoading: true });

// //         try {
// //             const response = await getSeatsByTheaterAdminApi(theaterId, currentPage, limit, sortField, sortOrder, search);
// //             if (response && response.status === 'success') {
// //                 this.setState({
// //                     seats: response.data.seats,
// //                     totalSeats: response.data.totalSeats,
// //                     totalPages: response.data.totalPages,
// //                     isLoading: false,
// //                 });
// //             } else {
// //                 toast.error('Lỗi khi lấy danh sách ghế');
// //                 this.setState({ isLoading: false });
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error('Lỗi khi gọi API');
// //             this.setState({ isLoading: false });
// //         }
// //     };

// //     // Mở Modal Thêm/Sửa Ghế
// //     openAddEditSeatModal = (seat = null) => {
// //         if (seat) {
// //             // Chế độ chỉnh sửa
// //             this.setState({
// //                 isAddEditSeatModalOpen: true,
// //                 isEditSeatMode: true,
// //                 selectedSeat: seat,
// //                 seatRow: seat.row,
// //                 seatNumber: seat.number,
// //                 seatType: seat.type,
// //             });
// //         } else {
// //             // Chế độ thêm mới
// //             this.setState({
// //                 isAddEditSeatModalOpen: true,
// //                 isEditSeatMode: false,
// //                 selectedSeat: null,
// //                 seatRow: '',
// //                 seatNumber: '',
// //                 seatType: '',
// //             });
// //         }
// //     };

// //     // Đóng Modal Thêm/Sửa Ghế
// //     closeAddEditSeatModal = () => {
// //         this.setState({
// //             isAddEditSeatModalOpen: false,
// //             isEditSeatMode: false,
// //             selectedSeat: null,
// //             seatRow: '',
// //             seatNumber: '',
// //             seatType: '',
// //         });
// //     };

// //     // Xử lý thay đổi input trong form ghế
// //     handleSeatInputChange = (e, field) => {
// //         this.setState({ [field]: e.target.value });
// //     };

// //     // Gửi form Thêm/Sửa Ghế
// //     handleSeatSubmit = async () => {
// //         const { isEditSeatMode, seatRow, seatNumber, seatType, selectedSeat } = this.state;
// //         const theaterId = this.getTheaterIdFromParams();
// //         console.log("check theaterId", theaterId)
// //         if (!seatRow || !seatNumber || !seatType) {
// //             toast.error('Vui lòng nhập đầy đủ thông tin ghế');
// //             return;
// //         }

// //         try {
// //             let response;
// //             if (isEditSeatMode) {
// //                 response = await updateSeatApi(theaterId, selectedSeat.id, {
// //                     row: seatRow,
// //                     number: seatNumber,
// //                     type: seatType,
// //                 });
// //             } else {
// //                 response = await createSeatApi(theaterId, {
// //                     row: seatRow,
// //                     number: seatNumber,
// //                     type: seatType,
// //                 });
// //             }

// //             if (response && response.status === 'success') {
// //                 toast.success(`${isEditSeatMode ? 'Cập nhật' : 'Thêm mới'} ghế thành công`);
// //                 this.closeAddEditSeatModal();
// //                 this.fetchSeats(); // Reload danh sách ghế
// //             } else {
// //                 toast.error('Lỗi khi lưu thông tin ghế');
// //             }
// //         } catch (error) {
// //             toast.error('Lỗi khi gọi API');
// //         }
// //     };

// //     // Xóa Ghế
// //     handleDeleteSeat = async (seatId) => {
// //         const theaterId = this.getTheaterIdFromParams();
// //         if (window.confirm('Bạn có chắc chắn muốn xóa ghế này?')) {
// //             try {
// //                 const response = await deleteSeatApi(theaterId, seatId);
// //                 if (!response) {
// //                     toast.success('Xóa ghế thành công');
// //                     this.fetchSeats();
// //                 } else {
// //                     toast.error('Lỗi khi xóa ghế');
// //                 }
// //             } catch (error) {
// //                 toast.error('Lỗi khi gọi API');
// //             }
// //         }
// //     };

// //     // Cập nhật Trạng thái Ghế
// //     handleUpdateSeatStatus = async (seat, newStatus) => {
// //         const theaterId = this.getTheaterIdFromParams();
// //         try {
// //             const response = await updateSeatStatusApi(theaterId, seat.id, newStatus);
// //             if (response && response.status === 'success') {
// //                 toast.success('Cập nhật trạng thái ghế thành công');
// //                 this.fetchSeats();
// //             } else {
// //                 toast.error('Lỗi khi cập nhật trạng thái ghế');
// //             }
// //         } catch (error) {
// //             toast.error('Lỗi khi gọi API');
// //         }
// //     };
// //     // Xử lý khi người dùng nhấn vào một ghế trong SeatLayout
// //     handleSeatClick = (seat) => {
// //         // Ví dụ: Mở modal để chỉnh sửa ghế nếu ghế đang available hoặc reserved
// //         if (seat.status !== 'booked') {
// //             this.openAddEditSeatModal(seat);
// //         } else {
// //             toast.info('Ghế này đã được đặt và không thể chỉnh sửa.');
// //         }
// //     };
// //     // Điều hướng trở lại màn hình quản lý phòng chiếu
// //     navigateBack = () => {
// //         const { history } = this.props;
// //         history.goBack(); // Hoặc history.push('/admin/cinemas') nếu cần
// //     };
// //     // Xử lý thay đổi trang
// //     handlePageChange = ({ selected }) => {
// //         this.setState({ currentPage: selected + 1 }, () => {
// //             this.fetchSeats();
// //         });
// //     };

// //     // Xử lý thay đổi số ghế trên mỗi trang
// //     handleLimitChange = (e) => {
// //         this.setState({ limit: parseInt(e.target.value), currentPage: 1 }, () => {
// //             this.fetchSeats();
// //         });
// //     };
// //     // Xử lý tìm kiếm
// //     handleSearchChange = (e) => {
// //         this.setState({ search: e.target.value, currentPage: 1 }, () => {
// //             this.fetchSeats();
// //         });
// //     };

// //     render() {
// //         const {
// //             seats,
// //             totalSeats,
// //             currentPage,
// //             totalPages,
// //             limit,
// //             isLoading,
// //             isAddEditSeatModalOpen,
// //             isEditSeatMode,
// //             seatRow,
// //             seatNumber,
// //             seatType,
// //             theater,
// //             search,
// //         } = this.state;
// //         const pageCount = Math.ceil(totalSeats / limit);
// //         return (

// //             <div className="manage-seats-container">
// //                 {console.log("check thearter:", theater)}
// //                 <h2>Quản lý ghế ngồi cho phòng chiếu: {theater ? theater.name : 'N/A'}</h2>
// //                 <div className="navigation-button">
// //                     <Button color="secondary" onClick={this.navigateBack}>Quay lại</Button>
// //                 </div>

// //                 {/* Tìm kiếm */}
// //                 <div className="search-bar">
// //                     <Input
// //                         type="text"
// //                         placeholder="Tìm kiếm ghế theo hàng, số, hoặc loại"
// //                         value={search}
// //                         onChange={this.handleSearchChange}
// //                     />
// //                 </div>
// //                 {/* Hiển thị phân trang */}
// //                 <div className="seat-layout-preview">
// //                     <SeatLayout seats={seats} onSeatClick={this.handleSeatClick} />
// //                 </div>

// //                 {/* Thêm ghế mới */}
// //                 <div className="add-seat-button">
// //                     <Button color="success" onClick={() => this.openAddEditSeatModal()}>Thêm ghế mới</Button>
// //                 </div>

// //                 <div className="seat-layout-preview">
// //                     <SeatLayout seats={seats} onSeatClick={this.handleSeatClick} />
// //                 </div>
// //                 <div className="add-seat-button">
// //                     <Button color="success" onClick={() => this.openAddEditSeatModal()}>Thêm ghế mới</Button>
// //                 </div>
// //                 <div className="seats-table">
// //                     <Table responsive>
// //                         <thead>
// //                             <tr>
// //                                 <th>#</th>
// //                                 <th>Hàng</th>
// //                                 <th>Số ghế</th>
// //                                 <th>Loại ghế</th>
// //                                 <th>Giá</th>
// //                                 <th>Trạng thái</th>
// //                                 <th>Hành động</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {seats.length > 0 ? (
// //                                 seats.map((seat, index) => (
// //                                     <tr key={seat.id}>
// //                                         <td>{index + 1}</td>
// //                                         <td>{seat.row}</td>
// //                                         <td>{seat.number}</td>
// //                                         <td>{seat.type}</td>
// //                                         <td>{seat.price.toLocaleString()} VND</td>
// //                                         <td>{seat.status}</td>
// //                                         <td>
// //                                             <Button color="primary" size="sm" onClick={() => this.openAddEditSeatModal(seat)}>Sửa</Button>{' '}
// //                                             <Button color="danger" size="sm" onClick={() => this.handleDeleteSeat(seat.id)}>Xóa</Button>{' '}
// //                                             <Button
// //                                                 color={seat.status === 'available' ? 'warning' : 'secondary'}
// //                                                 size="sm"
// //                                                 onClick={() => this.handleUpdateSeatStatus(seat, seat.status === 'available' ? 'reserved' : 'available')}
// //                                             >
// //                                                 {seat.status === 'available' ? 'Đặt' : 'Hủy đặt'}
// //                                             </Button>
// //                                         </td>
// //                                     </tr>
// //                                 ))
// //                             ) : (
// //                                 <tr>
// //                                     <td colSpan="7">Không có ghế nào.</td>
// //                                 </tr>
// //                             )}
// //                         </tbody>
// //                     </Table>
// //                 </div>

// //                 {/* Modal thêm mới/chỉnh sửa ghế */}
// //                 <Modal isOpen={isAddEditSeatModalOpen} toggle={this.closeAddEditSeatModal} size="md">
// //                     <ModalHeader toggle={this.closeAddEditSeatModal}>
// //                         {isEditSeatMode ? 'Chỉnh sửa ghế' : 'Thêm mới ghế'}
// //                     </ModalHeader>
// //                     <ModalBody>
// //                         <Form>
// //                             <FormGroup>
// //                                 <Label for="seatRow">Hàng ghế</Label>
// //                                 <Input
// //                                     type="text"
// //                                     id="seatRow"
// //                                     value={seatRow}
// //                                     onChange={(e) => this.handleSeatInputChange(e, 'seatRow')}
// //                                     placeholder="Nhập hàng ghế"
// //                                 />
// //                             </FormGroup>
// //                             <FormGroup>
// //                                 <Label for="seatNumber">Ghế số</Label>
// //                                 <Input
// //                                     type="number"
// //                                     id="seatNumber"
// //                                     value={seatNumber}
// //                                     onChange={(e) => this.handleSeatInputChange(e, 'seatNumber')}
// //                                     placeholder="Nhập ghế số"
// //                                 />
// //                             </FormGroup>
// //                             <FormGroup>
// //                                 <Label for="seatType">Loại ghế</Label>
// //                                 <Input
// //                                     type="select"
// //                                     id="seatType"
// //                                     value={seatType}
// //                                     onChange={(e) => this.handleSeatInputChange(e, 'seatType')}
// //                                 >
// //                                     <option value="">-- Chọn loại ghế --</option>
// //                                     <option value="Normal">Normal</option>
// //                                     <option value="VIP">VIP</option>
// //                                     <option value="Couple">Couple</option>
// //                                     {/* Thêm các loại ghế khác nếu cần */}
// //                                 </Input>
// //                             </FormGroup>
// //                         </Form>
// //                     </ModalBody>
// //                     <ModalFooter>
// //                         <Button color="secondary" onClick={this.closeAddEditSeatModal}>Hủy</Button>
// //                         <Button color="primary" onClick={this.handleSeatSubmit}>
// //                             {isEditSeatMode ? 'Cập nhật' : 'Thêm mới'}
// //                         </Button>
// //                     </ModalFooter>
// //                 </Modal>
// //             </div>
// //         );
// //     }
// // }
// // export default withRouter(ManageSeats);
// // src/containers/System/Admin/ManageSeats.js

// // import React, { Component } from 'react';
// // import {
// //     getSeatsByTheaterAdminApi, // Sử dụng API với phân trang
// //     createSeatApi,
// //     updateSeatApi,
// //     deleteSeatApi,
// //     updateSeatStatusApi,
// // } from '../../../services/userService';
// // import {
// //     Button,
// //     Form,
// //     FormGroup,
// //     Label,
// //     Input,
// //     Table,
// //     Modal,
// //     ModalHeader,
// //     ModalBody,
// //     ModalFooter,
// //     Spinner,
// // } from 'reactstrap';
// // import { toast } from 'react-toastify';
// // import { withRouter } from 'react-router-dom';
// // import ReactPaginate from 'react-paginate'; // Import React Paginate
// // import './ManageSeats.scss'; // Đảm bảo đã tạo file CSS
// // import SeatLayout from './Component/SeatLayout';

// // class ManageSeats extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             seats: [],
// //             totalSeats: 0,
// //             currentPage: 1,
// //             totalPages: 0,
// //             limit: 10,
// //             sortField: 'id',
// //             sortOrder: 'ASC',
// //             search: '',
// //             isLoading: false,
// //             isAddEditSeatModalOpen: false,
// //             isEditSeatMode: false,
// //             selectedSeat: null,
// //             seatRow: '',
// //             seatNumber: '',
// //             seatType: '',
// //             theater: null, // Thông tin phòng chiếu
// //         };
// //     }

// //     async componentDidMount() {
// //         await this.fetchSeats();
// //         this.getTheaterFromState();
// //     }

// //     getTheaterFromState = () => {
// //         const { location } = this.props;
// //         if (location.state && location.state.theater) {
// //             this.setState({ theater: location.state.theater });
// //         }
// //     };

// //     // Lấy thông tin từ URL params
// //     getTheaterIdFromParams = () => {
// //         const { match } = this.props;
// //         return match.params.theaterId;
// //     };

// //     // Fetch seats by theater with pagination
// //     fetchSeats = async () => {
// //         const { currentPage, limit, sortField, sortOrder, search } = this.state;
// //         const theaterId = this.getTheaterIdFromParams();
// //         if (!theaterId) {
// //             toast.error('Không xác định được phòng chiếu!');
// //             return;
// //         }

// //         this.setState({ isLoading: true });

// //         try {
// //             const response = await getSeatsByTheaterAdminApi(theaterId, currentPage, limit, sortField, sortOrder, search);
// //             if (response && response.status === 'success') {
// //                 this.setState({
// //                     seats: response.data.seats,
// //                     totalSeats: response.data.totalSeats,
// //                     totalPages: response.data.totalPages,
// //                     isLoading: false,
// //                 });
// //             } else {
// //                 toast.error('Lỗi khi lấy danh sách ghế');
// //                 this.setState({ isLoading: false });
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error('Lỗi khi gọi API');
// //             this.setState({ isLoading: false });
// //         }
// //     };

// //     // Mở Modal Thêm/Sửa Ghế
// //     openAddEditSeatModal = (seat = null) => {
// //         if (seat) {
// //             // Chế độ chỉnh sửa
// //             this.setState({
// //                 isAddEditSeatModalOpen: true,
// //                 isEditSeatMode: true,
// //                 selectedSeat: seat,
// //                 seatRow: seat.row,
// //                 seatNumber: seat.number,
// //                 seatType: seat.type,
// //             });
// //         } else {
// //             // Chế độ thêm mới
// //             this.setState({
// //                 isAddEditSeatModalOpen: true,
// //                 isEditSeatMode: false,
// //                 selectedSeat: null,
// //                 seatRow: '',
// //                 seatNumber: '',
// //                 seatType: '',
// //             });
// //         }
// //     };

// //     // Đóng Modal Thêm/Sửa Ghế
// //     closeAddEditSeatModal = () => {
// //         this.setState({
// //             isAddEditSeatModalOpen: false,
// //             isEditSeatMode: false,
// //             selectedSeat: null,
// //             seatRow: '',
// //             seatNumber: '',
// //             seatType: '',
// //         });
// //     };

// //     // Xử lý thay đổi input trong form ghế
// //     handleSeatInputChange = (e, field) => {
// //         this.setState({ [field]: e.target.value });
// //     };

// //     // Gửi form Thêm/Sửa Ghế
// //     handleSeatSubmit = async () => {
// //         const { isEditSeatMode, seatRow, seatNumber, seatType, selectedSeat } = this.state;
// //         const theaterId = this.getTheaterIdFromParams();
// //         console.log("check theaterId", theaterId)
// //         if (!seatRow || !seatNumber || !seatType) {
// //             toast.error('Vui lòng nhập đầy đủ thông tin ghế');
// //             return;
// //         }

// //         try {
// //             let response;
// //             if (isEditSeatMode) {
// //                 response = await updateSeatApi(theaterId, selectedSeat.id, {
// //                     row: seatRow,
// //                     number: seatNumber,
// //                     type: seatType,
// //                 });
// //             } else {
// //                 response = await createSeatApi(theaterId, {
// //                     row: seatRow,
// //                     number: seatNumber,
// //                     type: seatType,
// //                 });
// //             }

// //             if (response && response.status === 'success') {
// //                 toast.success(`${isEditSeatMode ? 'Cập nhật' : 'Thêm mới'} ghế thành công`);
// //                 this.closeAddEditSeatModal();
// //                 this.fetchSeats(); // Reload danh sách ghế
// //             } else {
// //                 toast.error('Lỗi khi lưu thông tin ghế');
// //             }
// //         } catch (error) {
// //             toast.error('Lỗi khi gọi API');
// //         }
// //     };

// //     // Xóa Ghế
// //     handleDeleteSeat = async (seatId) => {
// //         const theaterId = this.getTheaterIdFromParams();
// //         if (window.confirm('Bạn có chắc chắn muốn xóa ghế này?')) {
// //             try {
// //                 const response = await deleteSeatApi(theaterId, seatId);
// //                 if (!response) {
// //                     toast.success('Xóa ghế thành công');
// //                     this.fetchSeats();
// //                 } else {
// //                     toast.error('Lỗi khi xóa ghế');
// //                 }
// //             } catch (error) {
// //                 toast.error('Lỗi khi gọi API');
// //             }
// //         }
// //     };

// //     // Cập nhật Trạng thái Ghế
// //     handleUpdateSeatStatus = async (seat, newStatus) => {
// //         const theaterId = this.getTheaterIdFromParams();
// //         try {
// //             const response = await updateSeatStatusApi(theaterId, seat.id, newStatus);
// //             if (response && response.status === 'success') {
// //                 toast.success('Cập nhật trạng thái ghế thành công');
// //                 this.fetchSeats();
// //             } else {
// //                 toast.error('Lỗi khi cập nhật trạng thái ghế');
// //             }
// //         } catch (error) {
// //             toast.error('Lỗi khi gọi API');
// //         }
// //     };

// //     // Xử lý khi người dùng nhấn vào một ghế trong SeatLayout
// //     handleSeatClick = (seat) => {

// //         // Nếu ghế đang available hoặc reserved, mở modal để chỉnh sửa
// //         if (seat.status !== 'booked') {
// //             this.openAddEditSeatModal(seat);
// //         } else {
// //             toast.info('Ghế này đã được đặt và không thể chỉnh sửa.');
// //         }
// //     };

// //     // Điều hướng trở lại màn hình quản lý phòng chiếu
// //     navigateBack = () => {
// //         const { history } = this.props;
// //         history.goBack(); // Hoặc history.push('/admin/cinemas') nếu cần
// //     };

// //     // Xử lý thay đổi trang
// //     handlePageChange = ({ selected }) => {
// //         this.setState({ currentPage: selected + 1 }, () => {
// //             this.fetchSeats();
// //         });
// //     };

// //     // Xử lý thay đổi số ghế trên mỗi trang
// //     handleLimitChange = (e) => {
// //         this.setState({ limit: parseInt(e.target.value), currentPage: 1 }, () => {
// //             this.fetchSeats();
// //         });
// //     };

// //     // Xử lý tìm kiếm
// //     handleSearchChange = (e) => {
// //         this.setState({ search: e.target.value, currentPage: 1 }, () => {
// //             this.fetchSeats();
// //         });
// //     };

// //     render() {
// //         const {
// //             seats,
// //             totalSeats,
// //             currentPage,
// //             totalPages,
// //             limit,
// //             isLoading,
// //             isAddEditSeatModalOpen,
// //             isEditSeatMode,
// //             seatRow,
// //             seatNumber,
// //             seatType,
// //             theater,
// //             search,
// //         } = this.state;

// //         const pageCount = Math.ceil(totalSeats / limit);

// //         return (
// //             <div className="manage-seats-container">
// //                 <h2>Quản lý ghế ngồi cho phòng chiếu: {theater ? theater.name : 'N/A'}</h2>
// //                 <div className="navigation-button">
// //                     <Button color="secondary" onClick={this.navigateBack}>Quay lại</Button>
// //                 </div>

// //                 {/* Tìm kiếm */}
// //                 <div className="search-bar">
// //                     <Input
// //                         type="text"
// //                         placeholder="Tìm kiếm ghế theo hàng, số, hoặc loại"
// //                         value={search}
// //                         onChange={this.handleSearchChange}
// //                     />
// //                 </div>

// //                 {/* Hiển thị phân trang */}
// //                 <div className="seat-layout-preview">
// //                     <SeatLayout seats={seats} onSeatClick={this.handleSeatClick} />
// //                 </div>

// //                 {/* Thêm ghế mới */}
// //                 <div className="add-seat-button">
// //                     <Button color="success" onClick={() => this.openAddEditSeatModal()}>Thêm ghế mới</Button>
// //                 </div>

// //                 {/* Bảng danh sách ghế */}
// //                 <div className="seats-table">
// //                     {isLoading ? (
// //                         <div className="loading-spinner">
// //                             <Spinner color="primary" />
// //                         </div>
// //                     ) : (
// //                         <Table responsive>
// //                             <thead>
// //                                 <tr>
// //                                     <th>#</th>
// //                                     <th>Hàng</th>
// //                                     <th>Số ghế</th>
// //                                     <th>Loại ghế</th>
// //                                     <th>Giá</th>
// //                                     <th>Trạng thái</th>
// //                                     <th>Hành động</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {seats.length > 0 ? (
// //                                     seats.map((seat, index) => (
// //                                         <tr key={seat.id}>
// //                                             <td>{(currentPage - 1) * limit + index + 1}</td>
// //                                             <td>{seat.row}</td>
// //                                             <td>{seat.number}</td>
// //                                             <td>{seat.type}</td>
// //                                             <td>{seat.price.toLocaleString()} VND</td>
// //                                             <td>{seat.status}</td>
// //                                             <td>
// //                                                 <Button color="primary" size="sm" onClick={() => this.openAddEditSeatModal(seat)}>Sửa</Button>{' '}
// //                                                 <Button color="danger" size="sm" onClick={() => this.handleDeleteSeat(seat.id)}>Xóa</Button>{' '}
// //                                                 <Button
// //                                                     color={seat.status === 'available' ? 'warning' : 'secondary'}
// //                                                     size="sm"
// //                                                     onClick={() => this.handleUpdateSeatStatus(seat, seat.status === 'available' ? 'reserved' : 'available')}
// //                                                 >
// //                                                     {seat.status === 'available' ? 'Đặt' : 'Hủy đặt'}
// //                                                 </Button>
// //                                             </td>
// //                                         </tr>
// //                                     ))
// //                                 ) : (
// //                                     <tr>
// //                                         <td colSpan="7">Không có ghế nào.</td>
// //                                     </tr>
// //                                 )}
// //                             </tbody>
// //                         </Table>
// //                     )}
// //                 </div>

// //                 {/* Phân trang */}
// //                 {pageCount > 1 && (
// //                     <div className="pagination-container">
// //                         <ReactPaginate
// //                             previousLabel={'«'}
// //                             nextLabel={'»'}
// //                             breakLabel={'...'}
// //                             breakClassName={'break-me'}
// //                             pageCount={pageCount}
// //                             marginPagesDisplayed={2}
// //                             pageRangeDisplayed={5}
// //                             onPageChange={this.handlePageChange}
// //                             containerClassName={'pagination'}
// //                             activeClassName={'active'}
// //                             forcePage={currentPage - 1}
// //                         />
// //                     </div>
// //                 )}

// //                 {/* Chọn số ghế trên mỗi trang */}
// //                 <div className="limit-selector">
// //                     <Label for="limit">Số ghế trên mỗi trang:</Label>{' '}
// //                     <Input
// //                         type="select"
// //                         id="limit"
// //                         value={limit}
// //                         onChange={this.handleLimitChange}
// //                         style={{ width: '80px', display: 'inline-block' }}
// //                     >
// //                         <option value="5">5</option>
// //                         <option value="10">10</option>
// //                         <option value="20">20</option>
// //                         <option value="50">50</option>
// //                     </Input>
// //                 </div>

// //                 {/* Modal thêm mới/chỉnh sửa ghế */}
// //                 <Modal isOpen={isAddEditSeatModalOpen} toggle={this.closeAddEditSeatModal} size="md">
// //                     <ModalHeader toggle={this.closeAddEditSeatModal}>
// //                         {isEditSeatMode ? 'Chỉnh sửa ghế' : 'Thêm mới ghế'}
// //                     </ModalHeader>
// //                     <ModalBody>
// //                         <Form>
// //                             <FormGroup>
// //                                 <Label for="seatRow">Hàng ghế</Label>
// //                                 <Input
// //                                     type="text"
// //                                     id="seatRow"
// //                                     value={seatRow}
// //                                     onChange={(e) => this.handleSeatInputChange(e, 'seatRow')}
// //                                     placeholder="Nhập hàng ghế"
// //                                 />
// //                             </FormGroup>
// //                             <FormGroup>
// //                                 <Label for="seatNumber">Ghế số</Label>
// //                                 <Input
// //                                     type="number"
// //                                     id="seatNumber"
// //                                     value={seatNumber}
// //                                     onChange={(e) => this.handleSeatInputChange(e, 'seatNumber')}
// //                                     placeholder="Nhập ghế số"
// //                                 />
// //                             </FormGroup>
// //                             <FormGroup>
// //                                 <Label for="seatType">Loại ghế</Label>
// //                                 <Input
// //                                     type="select"
// //                                     id="seatType"
// //                                     value={seatType}
// //                                     onChange={(e) => this.handleSeatInputChange(e, 'seatType')}
// //                                 >
// //                                     <option value="">-- Chọn loại ghế --</option>
// //                                     <option value="Normal">Normal</option>
// //                                     <option value="VIP">VIP</option>
// //                                     <option value="Couple">Couple</option>
// //                                     {/* Thêm các loại ghế khác nếu cần */}
// //                                 </Input>
// //                             </FormGroup>
// //                         </Form>
// //                     </ModalBody>
// //                     <ModalFooter>
// //                         <Button color="secondary" onClick={this.closeAddEditSeatModal}>Hủy</Button>
// //                         <Button color="primary" onClick={this.handleSeatSubmit}>
// //                             {isEditSeatMode ? 'Cập nhật' : 'Thêm mới'}
// //                         </Button>
// //                     </ModalFooter>
// //                 </Modal>
// //             </div>
// //         );
// //     }
// // }
// //     export default withRouter(ManageSeats);

// // src/containers/System/Admin/ManageSeats.js

// import React, { Component } from 'react';
// import {
//     getSeatsByTheaterApi, // Lấy tất cả ghế cho SeatLayout
//     getSeatsByTheaterAdminApi, // Lấy danh sách ghế với phân trang cho bảng
//     createSeatApi,
//     updateSeatApi,
//     deleteSeatApi,
//     updateSeatStatusApi,
// } from '../../../services/userService';
// import {
//     Button,
//     Form,
//     FormGroup,
//     Label,
//     Input,
//     Table,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Spinner,
// } from 'reactstrap';
// import { toast } from 'react-toastify';
// import { withRouter } from 'react-router-dom';
// import ReactPaginate from 'react-paginate'; // Import React Paginate
// import './ManageSeats.scss'; // Đảm bảo đã tạo file CSS
// import SeatLayout from './Component/SeatLayout';

// class ManageSeats extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             allSeats: [], // Tất cả ghế cho SeatLayout
//             seats: [], // Ghế cho bảng danh sách ghế (phân trang)
//             totalSeats: 0,
//             currentPage: 1,
//             totalPages: 0,
//             limit: 10,
//             sortField: 'id',
//             sortOrder: 'ASC',
//             search: '',
//             isLoading: false,
//             isAddEditSeatModalOpen: false,
//             isEditSeatMode: false,
//             selectedSeat: null,
//             seatRow: '',
//             seatNumber: '',
//             seatType: '',
//             theater: null, // Thông tin phòng chiếu
//         };
//     }

//     async componentDidMount() {
       
//         await this.fetchPaginatedSeats();
//         await this.fetchAllSeats();
//         this.getTheaterFromState();
//     }

//     getTheaterFromState = () => {
//         const { location } = this.props;
//         if (location.state && location.state.theater) {
//             this.setState({ theater: location.state.theater });
//         }
//     };

//     // Lấy thông tin từ URL params
//     getTheaterIdFromParams = () => {
//         const { match } = this.props;
//         return match.params.theaterId;
//     };

//     // Fetch all seats for SeatLayout
//     fetchAllSeats = async () => {
//         const theaterId = this.getTheaterIdFromParams();
//         if (!theaterId) {
//             toast.error('Không xác định được phòng chiếu!');
//             return;
//         }

//         try {
//             const response = await getSeatsByTheaterApi(theaterId);
//             if (response && response.status === 'success') {
//                 this.setState({
//                     allSeats: response.data.seats,
//                 });
//             } else {
//                 toast.error('Lỗi khi lấy danh sách ghế cho sơ đồ.');
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi gọi API lấy tất cả ghế.');
//         }
//     };

//     // Fetch paginated seats for table
//     fetchPaginatedSeats = async () => {
//         const { currentPage, limit, sortField, sortOrder, search } = this.state;
//         const theaterId = this.getTheaterIdFromParams();
//         if (!theaterId) {
//             toast.error('Không xác định được phòng chiếu!');
//             return;
//         }

//         this.setState({ isLoading: true });

//         try {
//             const response = await getSeatsByTheaterAdminApi(theaterId, currentPage, limit, sortField, sortOrder, search);
//             if (response && response.status === 'success') {
//                 this.setState({
//                     seats: response.data.seats,
//                     totalSeats: response.data.totalSeats,
//                     totalPages: response.data.totalPages,
//                     isLoading: false,
//                 });
//             } else {
//                 toast.error('Lỗi khi lấy danh sách ghế cho bảng.');
//                 this.setState({ isLoading: false });
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi gọi API lấy danh sách ghế.');
//             this.setState({ isLoading: false });
//         }
//     };

//     // Mở Modal Thêm/Sửa Ghế
//     openAddEditSeatModal = (seat = null) => {
//         if (seat) {
//             // Chế độ chỉnh sửa
//             this.setState({
//                 isAddEditSeatModalOpen: true,
//                 isEditSeatMode: true,
//                 selectedSeat: seat,
//                 seatRow: seat.row,
//                 seatNumber: seat.number,
//                 seatType: seat.type,
//             });
//         } else {
//             // Chế độ thêm mới
//             this.setState({
//                 isAddEditSeatModalOpen: true,
//                 isEditSeatMode: false,
//                 selectedSeat: null,
//                 seatRow: '',
//                 seatNumber: '',
//                 seatType: '',
//             });
//         }
//     };

//     // Đóng Modal Thêm/Sửa Ghế
//     closeAddEditSeatModal = () => {
//         this.setState({
//             isAddEditSeatModalOpen: false,
//             isEditSeatMode: false,
//             selectedSeat: null,
//             seatRow: '',
//             seatNumber: '',
//             seatType: '',
//         });
//     };

//     // Xử lý thay đổi input trong form ghế
//     handleSeatInputChange = (e, field) => {
//         const value = field === 'isVisible' ? e.target.checked : e.target.value;
//         this.setState({ [field]: value });
//     };

//     // Gửi form Thêm/Sửa Ghế
//     handleSeatSubmit = async () => {
//         const { isEditSeatMode, seatRow, seatNumber, seatType, selectedSeat } = this.state;
//         const theaterId = this.getTheaterIdFromParams();

//         if (!seatRow || !seatNumber || !seatType) {
//             toast.error('Vui lòng nhập đầy đủ thông tin ghế');
//             return;
//         }

//         try {
//             let response;
//             if (isEditSeatMode) {
//                 response = await updateSeatApi(theaterId, selectedSeat.id, {
//                     row: seatRow,
//                     number: seatNumber,
//                     type: seatType,
//                 });
//             } else {
//                 response = await createSeatApi(theaterId, {
//                     row: seatRow,
//                     number: seatNumber,
//                     type: seatType,
//                 });
//             }

//             if (response && response.status === 'success') {
//                 toast.success(`${isEditSeatMode ? 'Cập nhật' : 'Thêm mới'} ghế thành công`);
//                 this.closeAddEditSeatModal();
//                 await this.fetchAllSeats(); // Reload sơ đồ ghế
//                 await this.fetchPaginatedSeats(); // Reload bảng ghế
//             } else {
//                 toast.error('Lỗi khi lưu thông tin ghế');
//             }
//         } catch (error) {
//             toast.error('Lỗi khi gọi API');
//         }
//     };

//     // Xóa Ghế
//     handleDeleteSeat = async (seatId) => {
//         const theaterId = this.getTheaterIdFromParams();
//         if (window.confirm('Bạn có chắc chắn muốn xóa ghế này?')) {
//             try {
//                 const response = await deleteSeatApi(theaterId, seatId);
//                 if (response && response.status === 'success') {
//                     toast.success('Xóa ghế thành công');
//                     await this.fetchAllSeats(); // Reload sơ đồ ghế
//                     await this.fetchPaginatedSeats(); // Reload bảng ghế
//                 } else {
//                     toast.error('Lỗi khi xóa ghế');
//                 }
//             } catch (error) {
//                 toast.error('Lỗi khi gọi API');
//             }
//         }
//     };

//     // Cập nhật Trạng thái Ghế
//     handleUpdateSeatStatus = async (seat, newStatus) => {
//         const theaterId = this.getTheaterIdFromParams();
//         try {
//             const response = await updateSeatStatusApi(theaterId, seat.id, newStatus);
//             if (response && response.status === 'success') {
//                 toast.success('Cập nhật trạng thái ghế thành công');
//                 await this.fetchAllSeats(); // Reload sơ đồ ghế
//                 await this.fetchPaginatedSeats(); // Reload bảng ghế
//             } else {
//                 toast.error('Lỗi khi cập nhật trạng thái ghế');
//             }
//         } catch (error) {
//             toast.error('Lỗi khi gọi API');
//         }
//     };

//     // Xử lý khi người dùng nhấn vào một ghế trong SeatLayout
//     handleSeatClick = (seat) => {
//         // Nếu ghế là loại "Hidden", không thực hiện gì
//         if (seat.type === 'Hidden') {
//             toast.info('Ghế này được ẩn và không thể chỉnh sửa.');
//             return;
//         }

//         // Nếu ghế đang available hoặc reserved, mở modal để chỉnh sửa
//         if (seat.status !== 'booked') {
//             this.openAddEditSeatModal(seat);
//         } else {
//             toast.info('Ghế này đã được đặt và không thể chỉnh sửa.');
//         }
//     };

//     // Điều hướng trở lại màn hình quản lý phòng chiếu
//     navigateBack = () => {
//         const { history } = this.props;
//         history.goBack(); // Hoặc history.push('/admin/cinemas') nếu cần
//     };

//     // Xử lý thay đổi trang
//     handlePageChange = ({ selected }) => {
//         this.setState({ currentPage: selected + 1 }, () => {
//             this.fetchPaginatedSeats();
//         });
//     };

//     // Xử lý thay đổi số ghế trên mỗi trang
//     handleLimitChange = (e) => {
//         this.setState({ limit: parseInt(e.target.value), currentPage: 1 }, () => {
//             this.fetchPaginatedSeats();
//         });
//     };

//     // Xử lý tìm kiếm
//     handleSearchChange = (e) => {
//         this.setState({ search: e.target.value, currentPage: 1 }, () => {
//             this.fetchPaginatedSeats();
//         });
//     };

//     render() {
//         const {
//             allSeats,
//             seats,
//             totalSeats,
//             currentPage,
//             totalPages,
//             limit,
//             isLoading,
//             isAddEditSeatModalOpen,
//             isEditSeatMode,
//             seatRow,
//             seatNumber,
//             seatType,
//             theater,
//             search,
//         } = this.state;

//         const pageCount = Math.ceil(totalSeats / limit);

//         return (
//             <div className="manage-seats-container">
//                 <h2>Quản lý ghế ngồi cho phòng chiếu: {theater ? theater.name : 'N/A'}</h2>
//                 <div className="navigation-button">
//                     <Button color="secondary" onClick={this.navigateBack}>Quay lại</Button>
//                 </div>

//                 {/* Sơ đồ ghế */}
//                 <div className="seat-layout-preview">
//                     <SeatLayout seats={allSeats} onSeatClick={this.handleSeatClick} />
//                 </div>

//                 {/* Thêm ghế mới */}
//                 <div className="add-seat-button">
//                     <Button color="success" onClick={() => this.openAddEditSeatModal()}>Thêm ghế mới</Button>
//                 </div>

//                 {/* Tìm kiếm */}
//                 <div className="search-bar">
//                     <Input
//                         type="text"
//                         placeholder="Tìm kiếm ghế theo hàng, số, hoặc loại"
//                         value={search}
//                         onChange={this.handleSearchChange}
//                     />
//                 </div>

//                 {/* Bảng danh sách ghế */}
//                 <div className="seats-table">
//                     {isLoading ? (
//                         <div className="loading-spinner">
//                             <Spinner color="primary" />
//                         </div>
//                     ) : (
//                         <Table responsive>
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Hàng</th>
//                                     <th>Số ghế</th>
//                                     <th>Loại ghế</th>
//                                     <th>Giá</th>
//                                     <th>Trạng thái</th>
//                                     <th>Hành động</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {seats.length > 0 ? (
//                                     seats.map((seat, index) => (
//                                         <tr key={seat.id}>
//                                             <td>{(currentPage - 1) * limit + index + 1}</td>
//                                             <td>{seat.row}</td>
//                                             <td>{seat.number}</td>
//                                             <td>{seat.type}</td>
//                                             <td>{seat.price.toLocaleString()} VND</td>
//                                             <td>{seat.status}</td>
//                                             <td>
//                                                 <Button color="primary" size="sm" onClick={() => this.openAddEditSeatModal(seat)}>Sửa</Button>{' '}
//                                                 <Button color="danger" size="sm" onClick={() => this.handleDeleteSeat(seat.id)}>Xóa</Button>{' '}
//                                                 <Button
//                                                     color={seat.status === 'available' ? 'warning' : 'secondary'}
//                                                     size="sm"
//                                                     onClick={() => this.handleUpdateSeatStatus(seat, seat.status === 'available' ? 'reserved' : 'available')}
//                                                 >
//                                                     {seat.status === 'available' ? 'Đặt' : 'Hủy đặt'}
//                                                 </Button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="7">Không có ghế nào.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </Table>
//                     )}
//                 </div>

//                 {/* Phân trang cho bảng danh sách ghế */}
//                 {pageCount > 1 && (
//                     <div className="pagination-container">
//                         <ReactPaginate
//                             previousLabel={'«'}
//                             nextLabel={'»'}
//                             breakLabel={'...'}
//                             breakClassName={'break-me'}
//                             pageCount={pageCount}
//                             marginPagesDisplayed={2}
//                             pageRangeDisplayed={5}
//                             onPageChange={this.handlePageChange}
//                             containerClassName={'pagination'}
//                             activeClassName={'active'}
//                             forcePage={currentPage - 1}
//                             ariaLabelBuilder={(page) => `Page ${page}`}
//                             previousClassName={'previous'}
//                             nextClassName={'next'}
//                         />
//                     </div>
//                 )}

//                 {/* Chọn số ghế trên mỗi trang */}
//                 <div className="limit-selector">
//                     <Label for="limit">Số ghế trên mỗi trang:</Label>{' '}
//                     <Input
//                         type="select"
//                         id="limit"
//                         value={limit}
//                         onChange={this.handleLimitChange}
//                         style={{ width: '80px', display: 'inline-block' }}
//                     >
//                         <option value="5">5</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="50">50</option>
//                     </Input>
//                 </div>

//                 {/* Modal thêm mới/chỉnh sửa ghế */}
//                 <Modal isOpen={isAddEditSeatModalOpen} toggle={this.closeAddEditSeatModal} size="md">
//                     <ModalHeader toggle={this.closeAddEditSeatModal}>
//                         {isEditSeatMode ? 'Chỉnh sửa ghế' : 'Thêm mới ghế'}
//                     </ModalHeader>
//                     <ModalBody>
//                         <Form>
//                             <FormGroup>
//                                 <Label for="seatRow">Hàng ghế</Label>
//                                 <Input
//                                     type="text"
//                                     id="seatRow"
//                                     value={seatRow}
//                                     onChange={(e) => this.handleSeatInputChange(e, 'seatRow')}
//                                     placeholder="Nhập hàng ghế"
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="seatNumber">Ghế số</Label>
//                                 <Input
//                                     type="number"
//                                     id="seatNumber"
//                                     value={seatNumber}
//                                     onChange={(e) => this.handleSeatInputChange(e, 'seatNumber')}
//                                     placeholder="Nhập ghế số"
//                                 />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="seatType">Loại ghế</Label>
//                                 <Input
//                                     type="select"
//                                     id="seatType"
//                                     value={seatType}
//                                     onChange={(e) => this.handleSeatInputChange(e, 'seatType')}
//                                 >
//                                     <option value="">-- Chọn loại ghế --</option>
//                                     <option value="Normal">Normal</option>
//                                     <option value="VIP">VIP</option>
//                                     <option value="Couple">Couple</option>
//                                     {/* <option value="Hidden">Hidden</option> Thêm loại ghế Hidden */}
//                                     {/* Thêm các loại ghế khác nếu cần */}
//                                 </Input>
//                             </FormGroup>
//                         </Form>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="secondary" onClick={this.closeAddEditSeatModal}>Hủy</Button>
//                         <Button color="primary" onClick={this.handleSeatSubmit}>
//                             {isEditSeatMode ? 'Cập nhật' : 'Thêm mới'}
//                         </Button>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         )
//     }
// }

// export default withRouter(ManageSeats);



// src/containers/System/Admin/components/ManageSeats.js

import React, { Component } from 'react';
import {
    getSeatsByTheaterApi, // Lấy tất cả ghế cho SeatLayout
    getSeatsByTheaterAdminApi, // Lấy danh sách ghế với phân trang cho bảng
    createSeatApi,
    updateSeatApi,
    deleteSeatApi,
    // updateSeatStatusApi, // Đã loại bỏ
} from '../../../services/userService';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Spinner,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate'; // Import React Paginate
import './ManageSeats.scss'; // Đảm bảo đã tạo file CSS
import SeatLayout from './Component/SeatLayout';

class ManageSeats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSeats: [], // Tất cả ghế cho SeatLayout
            seats: [], // Ghế cho bảng danh sách ghế (phân trang)
            totalSeats: 0,
            currentPage: 1,
            totalPages: 0,
            limit: 10,
            sortField: 'id',
            sortOrder: 'ASC',
            search: '',
            isLoading: false,
            isAddEditSeatModalOpen: false,
            isEditSeatMode: false,
            selectedSeat: null,
            seatRow: '',
            seatNumber: '',
            seatType: '',
            theater: null, // Thông tin phòng chiếu
        };
    }

    async componentDidMount() {
        await this.fetchPaginatedSeats();
        await this.fetchAllSeats();
        this.getTheaterFromState();
    }

    getTheaterFromState = () => {
        const { location } = this.props;
        if (location.state && location.state.theater) {
            this.setState({ theater: location.state.theater });
        }
    };

    // Lấy thông tin từ URL params
    getTheaterIdFromParams = () => {
        const { match } = this.props;
        return match.params.theaterId;
    };

    // Fetch all seats for SeatLayout
    fetchAllSeats = async () => {
        const theaterId = this.getTheaterIdFromParams();
        if (!theaterId) {
            toast.error('Không xác định được phòng chiếu!');
            return;
        }

        try {
            const response = await getSeatsByTheaterApi(theaterId);
            if (response && response.status === 'success') {
                this.setState({
                    allSeats: response.data.seats,
                });
            } else {
                toast.error('Lỗi khi lấy danh sách ghế cho sơ đồ.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Lỗi khi gọi API lấy tất cả ghế.');
        }
    };

    // Fetch paginated seats for table
    fetchPaginatedSeats = async () => {
        const { currentPage, limit, sortField, sortOrder, search } = this.state;
        const theaterId = this.getTheaterIdFromParams();
        if (!theaterId) {
            toast.error('Không xác định được phòng chiếu!');
            return;
        }

        this.setState({ isLoading: true });

        try {
            const response = await getSeatsByTheaterAdminApi(theaterId, currentPage, limit, sortField, sortOrder, search);
            if (response && response.status === 'success') {
                this.setState({
                    seats: response.data.seats,
                    totalSeats: response.data.totalSeats,
                    totalPages: response.data.totalPages,
                    isLoading: false,
                });
            } else {
                toast.error('Lỗi khi lấy danh sách ghế cho bảng.');
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.error(error);
            toast.error('Lỗi khi gọi API lấy danh sách ghế.');
            this.setState({ isLoading: false });
        }
    };

    // Mở Modal Thêm/Sửa Ghế
    openAddEditSeatModal = (seat = null) => {
        if (seat) {
            // Chế độ chỉnh sửa
            this.setState({
                isAddEditSeatModalOpen: true,
                isEditSeatMode: true,
                selectedSeat: seat,
                seatRow: seat.row,
                seatNumber: seat.number,
                seatType: seat.type,
            });
        } else {
            // Chế độ thêm mới
            this.setState({
                isAddEditSeatModalOpen: true,
                isEditSeatMode: false,
                selectedSeat: null,
                seatRow: '',
                seatNumber: '',
                seatType: '',
            });
        }
    };

    // Đóng Modal Thêm/Sửa Ghế
    closeAddEditSeatModal = () => {
        this.setState({
            isAddEditSeatModalOpen: false,
            isEditSeatMode: false,
            selectedSeat: null,
            seatRow: '',
            seatNumber: '',
            seatType: '',
        });
    };

    // Xử lý thay đổi input trong form ghế
    handleSeatInputChange = (e, field) => {
        const value = e.target.value;
        this.setState({ [field]: value });
    };

    // Gửi form Thêm/Sửa Ghế
    handleSeatSubmit = async () => {
        const { isEditSeatMode, seatRow, seatNumber, seatType, selectedSeat } = this.state;
        const theaterId = this.getTheaterIdFromParams();

        if (!seatRow || !seatNumber || !seatType) {
            toast.error('Vui lòng nhập đầy đủ thông tin ghế');
            return;
        }

        try {
            let response;
            if (isEditSeatMode) {
                response = await updateSeatApi(theaterId, selectedSeat.id, {
                    row: seatRow,
                    number: seatNumber,
                    type: seatType,
                });
            } else {
                response = await createSeatApi(theaterId, {
                    row: seatRow,
                    number: seatNumber,
                    type: seatType,
                });
            }
            console.log("check res", response)
            if (response && response.status === 'success') {
                toast.success(`${isEditSeatMode ? 'Cập nhật' : 'Thêm mới'} ghế thành công`);
                this.closeAddEditSeatModal();
                await this.fetchAllSeats(); // Reload sơ đồ ghế
                await this.fetchPaginatedSeats(); // Reload bảng ghế
            } else {
                // Nếu response không có status 'success', hiển thị thông báo lỗi từ backend nếu có
                const errorMessage = response.message || 'Lỗi khi lưu thông tin ghế';
                toast.error(errorMessage);
            }
        } catch (error) {
            // Kiểm tra xem backend có gửi thông báo lỗi cụ thể không
            const errorMessage = error.message || 'Lỗi khi gọi API';
            toast.error(errorMessage);
        }
    };

    // Xóa Ghế
    handleDeleteSeat = async (seatId) => {
        const theaterId = this.getTheaterIdFromParams();
        if (window.confirm('Bạn có chắc chắn muốn xóa ghế này?')) {
            try {
                const response = await deleteSeatApi(theaterId, seatId);
                if (response && response.status === 'success') {
                    toast.success('Xóa ghế thành công');
                    await this.fetchAllSeats(); // Reload sơ đồ ghế
                    await this.fetchPaginatedSeats(); // Reload bảng ghế
                } else {
                    // Nếu response không có status 'success', hiển thị thông báo lỗi từ backend nếu có
                    const errorMessage = response.message || 'Lỗi khi xóa ghế';
                    toast.error(errorMessage);
                }
            } catch (error) {
                // Kiểm tra xem backend có gửi thông báo lỗi cụ thể không
                const errorMessage = error.message || 'Lỗi khi gọi API';
                toast.error(errorMessage);
            }
        }
    };

    // Xử lý khi người dùng nhấn vào một ghế trong SeatLayout
    handleSeatClick = (seat) => {
        // Nếu ghế là loại "Hidden", không thực hiện gì
        if (seat.type === 'Hidden') {
            toast.info('Ghế này được ẩn và không thể chỉnh sửa.');
            return;
        }

        // Mở modal để chỉnh sửa ghế
        this.openAddEditSeatModal(seat);
    };

    // Điều hướng trở lại màn hình quản lý phòng chiếu
    navigateBack = () => {
        const { history } = this.props;
        history.goBack(); // Hoặc history.push('/admin/cinemas') nếu cần
    };

    // Xử lý thay đổi trang
    handlePageChange = ({ selected }) => {
        this.setState({ currentPage: selected + 1 }, () => {
            this.fetchPaginatedSeats();
        });
    };

    // Xử lý thay đổi số ghế trên mỗi trang
    handleLimitChange = (e) => {
        this.setState({ limit: parseInt(e.target.value), currentPage: 1 }, () => {
            this.fetchPaginatedSeats();
        });
    };

    // Xử lý tìm kiếm
    handleSearchChange = (e) => {
        this.setState({ search: e.target.value, currentPage: 1 }, () => {
            this.fetchPaginatedSeats();
        });
    };

    render() {
        const {
            allSeats,
            seats,
            totalSeats,
            currentPage,
            totalPages,
            limit,
            isLoading,
            isAddEditSeatModalOpen,
            isEditSeatMode,
            seatRow,
            seatNumber,
            seatType,
            theater,
            search,
        } = this.state;

        const pageCount = Math.ceil(totalSeats / limit);

        return (
            <div className="manage-seats-container">
                <h2>Quản lý ghế ngồi cho phòng chiếu: {theater ? theater.name : 'N/A'}</h2>
                <div className="navigation-button">
                    <Button color="secondary" onClick={this.navigateBack}>Quay lại</Button>
                </div>

                {/* Sơ đồ ghế */}
                <div className="seat-layout-preview">
                    <SeatLayout seats={allSeats} onSeatClick={this.handleSeatClick} />
                </div>

                {/* Thêm ghế mới */}
                <div className="add-seat-button">
                    <Button color="success" onClick={() => this.openAddEditSeatModal()}>Thêm ghế mới</Button>
                </div>

                {/* Tìm kiếm */}
                <div className="search-bar">
                    <Input
                        type="text"
                        placeholder="Tìm kiếm ghế theo hàng, số, hoặc loại"
                        value={search}
                        onChange={this.handleSearchChange}
                    />
                </div>

                {/* Bảng danh sách ghế */}
                <div className="seats-table">
                    {isLoading ? (
                        <div className="loading-spinner">
                            <Spinner color="primary" />
                        </div>
                    ) : (
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Hàng</th>
                                    <th>Số ghế</th>
                                    <th>Loại ghế</th>
                                    <th>Giá</th>
                                    {/* <th>Trạng thái</th> Đã loại bỏ */}
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seats.length > 0 ? (
                                    seats.map((seat, index) => (
                                        <tr key={seat.id}>
                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                            <td>{seat.row}</td>
                                            <td>{seat.number}</td>
                                            <td>{seat.type}</td>
                                            <td>{seat.price.toLocaleString()} VND</td>
                                            {/* <td>{seat.status}</td> Đã loại bỏ */}
                                            <td>
                                                <Button color="primary" size="sm" onClick={() => this.openAddEditSeatModal(seat)}>Sửa</Button>{' '}
                                                <Button color="danger" size="sm" onClick={() => this.handleDeleteSeat(seat.id)}>Xóa</Button>
                                                {/* Đã loại bỏ nút cập nhật trạng thái ghế */}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Không có ghế nào.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </div>

                {/* Phân trang cho bảng danh sách ghế */}
                {pageCount > 1 && (
                    <div className="pagination-container">
                        <ReactPaginate
                            previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            forcePage={currentPage - 1}
                            ariaLabelBuilder={(page) => `Page ${page}`}
                            previousClassName={'previous'}
                            nextClassName={'next'}
                        />
                    </div>
                )}

                {/* Chọn số ghế trên mỗi trang */}
                <div className="limit-selector">
                    <Label for="limit">Số ghế trên mỗi trang:</Label>{' '}
                    <Input
                        type="select"
                        id="limit"
                        value={limit}
                        onChange={this.handleLimitChange}
                        style={{ width: '80px', display: 'inline-block' }}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </Input>
                </div>

                {/* Modal thêm mới/chỉnh sửa ghế */}
                <Modal isOpen={isAddEditSeatModalOpen} toggle={this.closeAddEditSeatModal} size="md">
                    <ModalHeader toggle={this.closeAddEditSeatModal}>
                        {isEditSeatMode ? 'Chỉnh sửa ghế' : 'Thêm mới ghế'}
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="seatRow">Hàng ghế</Label>
                                <Input
                                    type="text"
                                    id="seatRow"
                                    value={seatRow}
                                    onChange={(e) => this.handleSeatInputChange(e, 'seatRow')}
                                    placeholder="Nhập hàng ghế"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="seatNumber">Ghế số</Label>
                                <Input
                                    type="number"
                                    id="seatNumber"
                                    value={seatNumber}
                                    onChange={(e) => this.handleSeatInputChange(e, 'seatNumber')}
                                    placeholder="Nhập ghế số"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="seatType">Loại ghế</Label>
                                <Input
                                    type="select"
                                    id="seatType"
                                    value={seatType}
                                    onChange={(e) => this.handleSeatInputChange(e, 'seatType')}
                                >
                                    <option value="">-- Chọn loại ghế --</option>
                                    <option value="Normal">Normal</option>
                                    <option value="VIP">VIP</option>
                                    <option value="Couple">Couple</option>
                                    {/* <option value="Hidden">Hidden</option> Thêm loại ghế Hidden */}
                                    {/* Thêm các loại ghế khác nếu cần */}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.closeAddEditSeatModal}>Hủy</Button>
                        <Button color="primary" onClick={this.handleSeatSubmit}>
                            {isEditSeatMode ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
    export default withRouter(ManageSeats);
