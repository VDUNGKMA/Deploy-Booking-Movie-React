// // src/containers/System/Admin/Showtimes.js

// import React, { Component } from 'react';
// import {
//     getShowtimesApi,
//     createShowtimeApi,
//     updateShowtimeApi,
//     deleteShowtimeApi,
// } from '../../../../services/userService';
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
// import ReactPaginate from 'react-paginate';
// import ShowtimeForm from './ShowtimeForm';
// import './Showtimes.scss';

// class Showtimes extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             showtimes: [],
//             totalShowtimes: 0,
//             currentPage: 1,
//             totalPages: 0,
//             limit: 10,
//             sortField: 'start_time',
//             sortOrder: 'ASC',
//             search: '',
//             isLoading: false,
//             isModalOpen: false,
//             isEditMode: false,
//             selectedShowtime: null,
//             theater: null, // Thông tin phòng chiếu
//         };
//     }

//     async componentDidMount() {
//         this.getTheaterFromParams();
//     }

//     getTheaterFromParams = () => {
//         const { match } = this.props;
//         const theaterId = match.params.theaterId;
//         // Giả sử bạn có hàm để lấy thông tin phòng chiếu theo ID
//         // Bạn có thể gọi API hoặc lấy từ Redux store
//         // Ví dụ:
//         this.setState({ theaterId }, () => {
//             this.fetchShowtimes();
//         });
//     };

//     // Fetch showtimes with pagination
//     fetchShowtimes = async () => {
//         const { theaterId, currentPage, limit, sortField, sortOrder, search } = this.state;
//         if (!theaterId) {
//             toast.error('Không xác định được phòng chiếu!');
//             return;
//         }

//         this.setState({ isLoading: true });

//         try {
//             const response = await getShowtimesApi(theaterId, currentPage, limit, sortField, sortOrder, search);
//             console.log("check getshowtime ",response)
//             if (response && response.status === 'success') {
//                 this.setState({
//                     showtimes: response.data.showtimes,
//                     totalShowtimes: response.data.totalShowtimes,
//                     totalPages: response.data.totalPages,
//                     isLoading: false,
//                 });
//             } else {
//                 toast.error('Lỗi khi lấy danh sách suất chiếu.');
//                 this.setState({ isLoading: false });
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi gọi API lấy danh sách suất chiếu.');
//             this.setState({ isLoading: false });
//         }
//     };
//     // Thêm phương thức để lấy danh sách phòng chiếu
//     // fetchTheaters = async () => {
//     //     try {
//     //         const response = await getTheatersApi(); // Giả sử bạn có API để lấy danh sách phòng chiếu
//     //         if (response && response.data.status === 'success') {
//     //             this.setState({ theaters: response.data.theaters });
//     //         } else {
//     //             toast.error('Lỗi khi lấy danh sách phòng chiếu.');
//     //         }
//     //     } catch (error) {
//     //         console.error(error);
//     //         toast.error('Lỗi khi gọi API lấy danh sách phòng chiếu.');
//     //     }
//     // };
//     // Mở Modal Thêm/Sửa Suất Chiếu
//     openModal = (showtime = null) => {
//         if (showtime) {
//             // Chế độ chỉnh sửa
//             this.setState({
//                 isModalOpen: true,
//                 isEditMode: true,
//                 selectedShowtime: showtime,
//             });
//         } else {
//             // Chế độ thêm mới
//             this.setState({
//                 isModalOpen: true,
//                 isEditMode: false,
//                 selectedShowtime: null,
//             });
//         }
//     };

//     // Đóng Modal
//     closeModal = () => {
//         this.setState({
//             isModalOpen: false,
//             isEditMode: false,
//             selectedShowtime: null,
//         });
//     };

//     // Xử lý thêm mới hoặc cập nhật suất chiếu
//     handleSaveShowtime = async (showtimeData) => {
//         const { isEditMode, selectedShowtime, theaterId } = this.state;

//         try {
//             let response;
//             if (isEditMode) {
//                 response = await updateShowtimeApi(selectedShowtime.id, showtimeData);
//             } else {
//                 response = await createShowtimeApi(theaterId, showtimeData);
//                 console.log("check createshowtime", response)

                
//             }

//             if (response && response.status === 'success') {
//                 toast.success(`${isEditMode ? 'Cập nhật' : 'Thêm mới'} suất chiếu thành công`);
//                 this.closeModal();
//                 this.fetchShowtimes();
//             } else {
//                 toast.error('Lỗi khi lưu thông tin suất chiếu.');
//             }
//         } catch (error) {
//             toast.error('Lỗi khi gọi API.');
//             console.error(error);
//         }
//     };

//     // Xóa suất chiếu
//     handleDeleteShowtime = async (showtimeId) => {
//         if (window.confirm('Bạn có chắc chắn muốn xóa suất chiếu này?')) {
//             try {
//                 const response = await deleteShowtimeApi(showtimeId);
//                 if (!response) {
//                     toast.success('Xóa suất chiếu thành công');
//                     this.fetchShowtimes();
//                 } else {
//                     toast.error('Lỗi khi xóa suất chiếu.');
//                 }
//             } catch (error) {
//                 toast.error('Lỗi khi gọi API.');
//                 console.error(error);
//             }
//         }
//     };

//     // Xử lý thay đổi trang
//     handlePageChange = ({ selected }) => {
//         this.setState({ currentPage: selected + 1 }, () => {
//             this.fetchShowtimes();
//         });
//     };

//     // Xử lý thay đổi số suất chiếu trên mỗi trang
//     handleLimitChange = (e) => {
//         this.setState({ limit: parseInt(e.target.value), currentPage: 1 }, () => {
//             this.fetchShowtimes();
//         });
//     };

//     // Xử lý tìm kiếm
//     handleSearchChange = (e) => {
//         this.setState({ search: e.target.value, currentPage: 1 }, () => {
//             this.fetchShowtimes();
//         });
//     };

//     render() {
//         const {
//             showtimes,
//             totalShowtimes,
//             currentPage,
//             totalPages,
//             limit,
//             isLoading,
//             isModalOpen,
//             isEditMode,
//             selectedShowtime,
//             theaterId,
//             search,
//         } = this.state;

//         const pageCount = Math.ceil(totalShowtimes / limit);

//         return (
//             <div className="showtimes-container">
//                 <h2>Quản lý Suất Chiếu</h2>
//                 <div className="actions">
//                     <Button color="primary" onClick={() => this.openModal()}>Thêm Suất Chiếu Mới</Button>
//                 </div>

//                 {/* Tìm kiếm */}
//                 <div className="search-bar">
//                     <Input
//                         type="text"
//                         placeholder="Tìm kiếm suất chiếu theo phim hoặc phòng chiếu"
//                         value={search}
//                         onChange={this.handleSearchChange}
//                     />
//                 </div>

//                 {/* Bảng danh sách suất chiếu */}
//                 <div className="showtimes-table">
//                     {isLoading ? (
//                         <div className="loading-spinner">
//                             <Spinner color="primary" />
//                         </div>
//                     ) : (
//                         <Table responsive>
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Phòng Chiếu</th>
//                                     <th>Phim</th>
//                                     <th>Thời Gian Bắt Đầu</th>
//                                     <th>Thời Gian Kết Thúc</th>
//                                     <th>Trạng Thái</th>
//                                     <th>Hành Động</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {showtimes.length > 0 ? (
//                                     showtimes.map((showtime, index) => (
//                                         <tr key={showtime.id}>
//                                             <td>{(currentPage - 1) * limit + index + 1}</td>
//                                             <td>{showtime.theater.name}</td>
//                                             <td>{showtime.movie.title}</td>
//                                             <td>{new Date(showtime.start_time).toLocaleString()}</td>
//                                             <td>{new Date(showtime.end_time).toLocaleString()}</td>
//                                             <td>{showtime.status}</td>
//                                             <td>
//                                                 <Button color="warning" size="sm" onClick={() => this.openModal(showtime)}>Sửa</Button>{' '}
//                                                 <Button color="danger" size="sm" onClick={() => this.handleDeleteShowtime(showtime.id)}>Xóa</Button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="7">Không có suất chiếu nào.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </Table>
//                     )}
//                 </div>

//                 {/* Phân trang */}
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

//                 {/* Chọn số suất chiếu trên mỗi trang */}
//                 <div className="limit-selector">
//                     <Label for="limit">Số suất chiếu trên mỗi trang:</Label>{' '}
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

//                 {/* Modal Thêm/Sửa Suất Chiếu */}
//                 <Modal isOpen={isModalOpen} toggle={this.closeModal} size="lg">
//                     <ModalHeader toggle={this.closeModal}>
//                         {isEditMode ? 'Sửa Suất Chiếu' : 'Thêm Suất Chiếu Mới'}
//                     </ModalHeader>
//                     <ModalBody>
//                         <ShowtimeForm
//                             showtime={selectedShowtime}
//                             theaterId={theaterId}
//                             onSave={this.handleSaveShowtime}
//                             onCancel={this.closeModal}
//                             isEditMode={isEditMode}
//                             movies={this.state.movies}
//                             theaters={this.state.theaters}
//                         />
//                     </ModalBody>
//                 </Modal>
//             </div>
//         );
//     }
// }
// export default withRouter(Showtimes);
