// // import React, { Component } from 'react';
// // import {
// //     getTicketsApi,
// //     createTicketApi,
// //     cancelTicketApi,
// // } from '../../../../services/userService';
// // import {
// //     Button,
// //     Table,
// //     Spinner,
// //     Modal,
// //     ModalHeader,
// //     ModalBody,
// //     ModalFooter,
// // } from 'reactstrap';
// // import ReactPaginate from 'react-paginate';
// // import { toast } from 'react-toastify';
// // import TicketForm from './TicketForm'; // Component để tạo/edit vé
// // import './TicketList.scss';

// // class TicketList extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             tickets: [],
// //             isLoading: false,
// //             error: null,
// //             // Phân trang
// //             currentPage: 1,
// //             totalPages: 0,
// //             limit: 10,
// //             sortField: 'createdAt',
// //             sortOrder: 'DESC',
// //             search: '',
// //             // Modal
// //             isModalOpen: false,
// //             isEditMode: false,
// //             selectedTicket: null,
// //         };
// //     }

// //     componentDidMount() {
// //         this.fetchTickets();
// //     }

// //     // Fetch danh sách vé
// //     fetchTickets = async () => {
// //         const { currentPage, limit, sortField, sortOrder, search } = this.state;
// //         this.setState({ isLoading: true });
// //         try {
// //             const params = {
// //                 page: currentPage,
// //                 limit,
// //                 sortField,
// //                 sortOrder,
// //                 search,
// //             };
// //             const response = await getTicketsApi(params);
// //             // console.log("check res ticket", response
// //             if (response && response.status === 'success') {
// //                 const tickets = response.data.tickets.map(ticket => ({
// //                     id: ticket.id,
// //                     user: ticket.user.username,
// //                     movie: ticket.showtime.movie.title,
// //                     seat: `${ticket.seat.row}-${ticket.seat.number}`,
// //                     start_time: ticket.showtime.start_time,
// //                     end_time: ticket.showtime.end_time,
// //                     price: ticket.price,
// //                     status: ticket.status,
// //                 }));
// //                 this.setState({
// //                     tickets,
// //                     totalPages: response.data.totalPages,
// //                     isLoading: false,
// //                 });
// //             } else {
// //                 toast.error('Lỗi khi lấy danh sách vé.');
// //                 this.setState({ isLoading: false });
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error('Lỗi khi gọi API lấy danh sách vé.');
// //             this.setState({ isLoading: false });
// //         }
// //     };

// //     // Xử lý phân trang
// //     handlePageChange = (pageNumber) => {
// //         const newPage = pageNumber.selected + 1;
// //         this.setState({ currentPage: newPage }, this.fetchTickets);
// //     };

// //     // Xử lý thay đổi số vé trên mỗi trang
// //     handleLimitChange = (e) => {
// //         const newLimit = parseInt(e.target.value);
// //         this.setState({ limit: newLimit, currentPage: 1 }, this.fetchTickets);
// //     };

// //     // Xử lý tìm kiếm
// //     handleSearchChange = (e) => {
// //         const searchValue = e.target.value;
// //         this.setState({ search: searchValue, currentPage: 1 }, this.fetchTickets);
// //     };

// //     // Mở modal tạo mới vé
// //     openCreateModal = () => {
// //         this.setState({
// //             isModalOpen: true,
// //             isEditMode: false,
// //             selectedTicket: null,
// //         });
// //     };

// //     // Mở modal chỉnh sửa vé (nếu có)
// //     openEditModal = (ticket) => {
// //         this.setState({
// //             isModalOpen: true,
// //             isEditMode: true,
// //             selectedTicket: ticket,
// //         });
// //     };

// //     // Đóng modal
// //     closeModal = () => {
// //         this.setState({
// //             isModalOpen: false,
// //             isEditMode: false,
// //             selectedTicket: null,
// //         });
// //     };

// //     // Xử lý lưu vé (tạo mới hoặc chỉnh sửa)
// //     handleSaveTicket = async (ticketData) => {
// //         const { isEditMode } = this.state;
// //         try {
// //             let response;
// //             if (isEditMode) {
// //                 // Nếu có chức năng chỉnh sửa vé, bạn có thể thêm ở đây
// //                 // response = await updateTicketApi(selectedTicket.id, ticketData);
// //             } else {
// //                 // Tạo vé mới
// //                 response = await createTicketApi(ticketData);
// //             }

// //             if (response && response.status === 'success') {
// //                 toast.success(`${isEditMode ? 'Cập nhật' : 'Tạo'} vé thành công`);
// //                 this.closeModal();
// //                 this.fetchTickets();
// //             } else {
// //                 toast.error('Lỗi khi lưu thông tin vé.');
// //             }
// //         } catch (error) {
// //             toast.error('Lỗi khi gọi API.');
// //             console.error(error);
// //         }
// //     };

// //     // Xử lý hủy vé
// //     handleCancelTicket = async (ticketId) => {
// //         if (window.confirm('Bạn có chắc chắn muốn hủy vé này?')) {
// //             try {
// //                 const response = await cancelTicketApi(ticketId);
// //                 if (response && response.status === "success") {
// //                     toast.success('Hủy vé thành công');
// //                     this.fetchTickets();
// //                 } else {
// //                     toast.error('Lỗi khi hủy vé.');
// //                 }
// //             } catch (error) {
// //                 toast.error('Lỗi khi gọi API.');
// //                 console.error(error);
// //             }
// //         }
// //     };

// //     render() {
// //         const {
// //             tickets,
// //             isLoading,
// //             currentPage,
// //             totalPages,
// //             limit,
// //             search,
// //             isModalOpen,
// //             isEditMode,
// //             selectedTicket,
// //         } = this.state;

// //         const pageCount = totalPages;

// //         return (
// //             <div className="ticket-list-container">
// //                 <h2>Quản Lý Vé</h2>

// //                 {/* Nút Tạo Vé Mới */}
// //                 <div className="actions">
// //                     <Button color="primary" onClick={this.openCreateModal}>Tạo Vé Mới</Button>
// //                 </div>

// //                 {/* Tìm kiếm vé */}
// //                 <div className="search-form">
// //                     <input
// //                         type="text"
// //                         placeholder="Tìm kiếm vé theo tên người dùng, phim hoặc trạng thái"
// //                         value={search}
// //                         onChange={this.handleSearchChange}
// //                     />
// //                 </div>

// //                 {/* Bảng danh sách vé */}
// //                 <div className="tickets-table">
// //                     {isLoading ? (
// //                         <div className="loading-spinner">
// //                             <Spinner color="primary" />
// //                         </div>
// //                     ) : (
// //                         <Table responsive>
// //                             <thead>
// //                                 <tr>
// //                                     <th>#</th>
// //                                     <th>Người Dùng</th>
// //                                     <th>Phim</th>
// //                                     <th>Ghế</th>
// //                                     <th>Thời Gian Bắt Đầu</th>
// //                                     <th>Thời Gian Kết Thúc</th>
// //                                     <th>Giá (VNĐ)</th>
// //                                     <th>Trạng Thái</th>
// //                                     <th>Hành Động</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {tickets.length > 0 ? (
// //                                     tickets.map((ticket, index) => (
// //                                         <tr key={ticket.id}>
// //                                             <td>{(currentPage - 1) * limit + index + 1}</td>
// //                                             <td>{ticket.user}</td>
// //                                             <td>{ticket.movie}</td>
// //                                             <td>{ticket.seat}</td>
// //                                             <td>{new Date(ticket.start_time).toLocaleString()}</td>
// //                                             <td>{new Date(ticket.end_time).toLocaleString()}</td>
// //                                             <td>{Number(ticket.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
// //                                             <td>{ticket.status}</td>
// //                                             <td>
// //                                                 {/* Nếu có chức năng chỉnh sửa vé, thêm nút Sửa */}
// //                                                 {/* <Button color="warning" size="sm" onClick={() => this.openEditModal(ticket)}>Sửa</Button> {' '} */}
// //                                                 <Button color="danger" size="sm" onClick={() => this.handleCancelTicket(ticket.id)}>Hủy</Button>
// //                                             </td>
// //                                         </tr>
// //                                     ))
// //                                 ) : (
// //                                     <tr>
// //                                         <td colSpan="9">Không có vé nào.</td>
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
// //                             ariaLabelBuilder={(page) => `Page ${page}`}
// //                             previousClassName={'previous'}
// //                             nextClassName={'next'}
// //                         />
// //                     </div>
// //                 )}

// //                 {/* Chọn số vé trên mỗi trang */}
// //                 <div className="limit-selector">
// //                     <label htmlFor="limit">Số vé trên mỗi trang:</label>{' '}
// //                     <select
// //                         id="limit"
// //                         value={limit}
// //                         onChange={this.handleLimitChange}
// //                         style={{ width: '80px', display: 'inline-block' }}
// //                     >
// //                         <option value="5">5</option>
// //                         <option value="10">10</option>
// //                         <option value="20">20</option>
// //                         <option value="50">50</option>
// //                     </select>
// //                 </div>

// //                 {/* Modal tạo mới/chỉnh sửa vé */}
// //                 <Modal isOpen={isModalOpen} toggle={this.closeModal} size="lg">
// //                     <ModalHeader toggle={this.closeModal}>
// //                         {isEditMode ? 'Chỉnh Sửa Vé' : 'Tạo Vé Mới'}
// //                     </ModalHeader>
// //                     <ModalBody>
// //                         <TicketForm
// //                             ticket={selectedTicket}
// //                             onSave={this.handleSaveTicket}
// //                             onCancel={this.closeModal}
// //                             isEditMode={isEditMode}
// //                         />
// //                     </ModalBody>
// //                 </Modal>
// //             </div>
// //         );
// //     }
// // }
// //     export default TicketList;

// // src/containers/System/Admin/components/TicketList.js

// import React, { Component } from 'react';
// import {
//     getTicketsForAdminApi, // Sử dụng API mới
//     createTicketApi,
//     cancelTicketApi,
// } from '../../../../services/userService';
// import {
//     Button,
//     Table,
//     Spinner,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Form,
//     FormGroup,
//     Label,
//     Input,
// } from 'reactstrap';
// import ReactPaginate from 'react-paginate';
// import { toast } from 'react-toastify';
// import TicketForm from './TicketForm'; // Component để tạo/edit vé
// import './TicketList.scss';

// class TicketList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             tickets: [],
//             isLoading: false,
//             error: null,
//             // Phân trang
//             currentPage: 1,
//             totalPages: 0,
//             limit: 10,
//             sortField: 'createdAt',
//             sortOrder: 'DESC',
//             search: '',
//             // Modal
//             isModalOpen: false,
//             isEditMode: false,
//             selectedTicket: null,
//         };
//     }

//     componentDidMount() {
//         this.fetchTickets();
//     }

//     // Fetch danh sách vé
//     fetchTickets = async () => {
//         const { currentPage, limit, sortField, sortOrder, search } = this.state;
//         this.setState({ isLoading: true });
//         try {
//             const params = {
//                 page: currentPage,
//                 limit,
//                 sortField,
//                 sortOrder,
//                 search,
//             };
//             const response = await getTicketsForAdminApi(params);
//             if (response && response.status === 'success') {
//                 console.log("check ticket aaa", response)
//                 const tickets = response.data.tickets.map(ticket => ({
//                     id: ticket.id,
//                     user: ticket.user.username,
//                     movie: ticket.movie.title,
//                     showtime: `${new Date(ticket.showtime.start_time).toLocaleString()} - ${new Date(ticket.showtime.end_time).toLocaleString()}`,
//                     seat: `${ticket.seats.row}-${ticket.seats.number}`,
//                     price: ticket.price,
//                     status: ticket.status,
//                 }));
//                 this.setState({
//                     tickets,
//                     totalPages: response.data.totalPages,
//                     isLoading: false,
//                 });
//             } else {
//                 toast.error('Lỗi khi lấy danh sách vé.');
//                 this.setState({ isLoading: false });
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error(error.message || 'Lỗi khi gọi API lấy danh sách vé.');
//             this.setState({ isLoading: false });
//         }
//     };

//     // Xử lý phân trang
//     handlePageChange = (pageNumber) => {
//         const newPage = pageNumber.selected + 1;
//         this.setState({ currentPage: newPage }, this.fetchTickets);
//     };

//     // Xử lý thay đổi số vé trên mỗi trang
//     handleLimitChange = (e) => {
//         const newLimit = parseInt(e.target.value);
//         this.setState({ limit: newLimit, currentPage: 1 }, this.fetchTickets);
//     };

//     // Xử lý tìm kiếm
//     handleSearchChange = (e) => {
//         const searchValue = e.target.value;
//         this.setState({ search: searchValue, currentPage: 1 }, this.fetchTickets);
//     };

//     // Mở modal tạo mới vé
//     openCreateModal = () => {
//         this.setState({
//             isModalOpen: true,
//             isEditMode: false,
//             selectedTicket: null,
//         });
//     };

//     // Mở modal chỉnh sửa vé (nếu có)
//     openEditModal = (ticket) => {
//         this.setState({
//             isModalOpen: true,
//             isEditMode: true,
//             selectedTicket: ticket,
//         });
//     };

//     // Đóng modal
//     closeModal = () => {
//         this.setState({
//             isModalOpen: false,
//             isEditMode: false,
//             selectedTicket: null,
//         });
//     };

//     // Xử lý lưu vé (tạo mới hoặc chỉnh sửa)
//     handleSaveTicket = async (ticketData) => {
//         const { isEditMode } = this.state;
//         try {
//             let response;
//             if (isEditMode) {
//                 // Nếu có chức năng chỉnh sửa vé, bạn có thể thêm ở đây
//                 // response = await updateTicketApi(selectedTicket.id, ticketData);
//                 // Giả sử chưa có API update, bạn có thể bỏ qua hoặc triển khai tương tự như createTicketApi
//                 toast.error('Chức năng chỉnh sửa vé chưa được triển khai.');
//                 return;
//             } else {
//                 // Tạo vé mới
//                 response = await createTicketApi(ticketData);
//             }

//             if (response && response.status === 'success') {
//                 toast.success(`${isEditMode ? 'Cập nhật' : 'Tạo'} vé thành công`);
//                 this.closeModal();
//                 this.fetchTickets();
//             } else {
//                 // Nếu response không có status 'success', hiển thị thông báo lỗi từ backend nếu có
//                 const errorMessage = response.message || 'Lỗi khi lưu thông tin vé';
//                 toast.error(errorMessage);
//             }
//         } catch (error) {
//             // Kiểm tra xem backend có gửi thông báo lỗi cụ thể không
//             const errorMessage = error.message || 'Lỗi khi gọi API';
//             toast.error(errorMessage);
//         }
//     };

//     // Xử lý hủy vé
//     handleCancelTicket = async (ticketId) => {
//         if (window.confirm('Bạn có chắc chắn muốn hủy vé này?')) {
//             try {
//                 const response = await cancelTicketApi(ticketId);
//                 if (response && response.status === "success") {
//                     toast.success('Hủy vé thành công');
//                     this.fetchTickets();
//                 } else {
//                     toast.error('Lỗi khi hủy vé.');
//                 }
//             } catch (error) {
//                 toast.error(error.message || 'Lỗi khi gọi API.');
//                 console.error(error);
//             }
//         }
//     };

//     render() {
//         const {
//             tickets,
//             isLoading,
//             currentPage,
//             totalPages,
//             limit,
//             search,
//             isModalOpen,
//             isEditMode,
//             selectedTicket,
//         } = this.state;

//         const pageCount = totalPages;

//         return (
//             <div className="ticket-list-container">
//                 <h2>Quản Lý Vé</h2>

//                 {/* Nút Tạo Vé Mới */}
//                 <div className="actions">
//                     <Button color="primary" onClick={this.openCreateModal}>Tạo Vé Mới</Button>
//                 </div>

//                 {/* Tìm kiếm vé */}
//                 <div className="search-form">
//                     <Input
//                         type="text"
//                         placeholder="Tìm kiếm vé theo tên người dùng, phim hoặc trạng thái"
//                         value={search}
//                         onChange={this.handleSearchChange}
//                     />
//                 </div>

//                 {/* Bảng danh sách vé */}
//                 <div className="tickets-table">
//                     {isLoading ? (
//                         <div className="loading-spinner">
//                             <Spinner color="primary" />
//                         </div>
//                     ) : (
//                         <Table responsive>
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Người Dùng</th>
//                                     <th>Phim</th>
//                                     <th>Suất Chiếu</th>
//                                     <th>Ghế</th>
//                                     <th>Giá (VNĐ)</th>
//                                     <th>Trạng Thái</th>
//                                     <th>Hành Động</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {console.log("check tickets", tickets)}
//                                 {tickets.length > 0 ? (
//                                     tickets.map((ticket, index) => (
//                                         <tr key={ticket.id}>
//                                             <td>{(currentPage - 1) * limit + index + 1}</td>
//                                             <td>{ticket.user}</td>
//                                             <td>{ticket.movie}</td>
//                                             <td>{ticket.showtime}</td>
//                                             <td>
//                                                 {ticket.seats && ticket.seats.length > 0 ? (
//                                                     ticket.seat.map(seat => (
                                                        
//                                                         <span key={seat.id} className="seat-info">
//                                                             {seat.row}-{seat.number} ({seat.type})
//                                                         </span>
                                                       
//                                                     ))
//                                                 ) : (
//                                                     <span>Không có ghế</span>
//                                                 )}
//                                             </td>
//                                             <td>{Number(ticket.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
//                                             <td>{ticket.status}</td>
//                                             <td>
//                                                 {/* Nếu có chức năng chỉnh sửa vé, thêm nút Sửa */}
//                                                 {/* <Button color="warning" size="sm" onClick={() => this.openEditModal(ticket)}>Sửa</Button> {' '} */}
//                                                 <Button color="danger" size="sm" onClick={() => this.handleCancelTicket(ticket.id)}>Hủy</Button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8">Không có vé nào.</td>
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

//                 {/* Chọn số vé trên mỗi trang */}
//                 <div className="limit-selector">
//                     <Label for="limit">Số vé trên mỗi trang:</Label>{' '}
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

//                 {/* Modal tạo mới/chỉnh sửa vé */}
//                 <Modal isOpen={isModalOpen} toggle={this.closeModal} size="lg">
//                     <ModalHeader toggle={this.closeModal}>
//                         {isEditMode ? 'Chỉnh Sửa Vé' : 'Tạo Vé Mới'}
//                     </ModalHeader>
//                     <ModalBody>
//                         <TicketForm
//                             ticket={selectedTicket}
//                             onSave={this.handleSaveTicket}
//                             onCancel={this.closeModal}
//                             isEditMode={isEditMode}
//                         />
//                     </ModalBody>
//                 </Modal>
//             </div>
//         );
//     }
// }
// export default TicketList;

// src/containers/System/Admin/components/TicketList.js

// TicketList.jsx

import React, { Component } from 'react';
import {
    getTicketsForAdminApi, // Sử dụng API mới
    createTicketApi,
    cancelTicketApi,
} from '../../../../services/userService';
import {
    Button,
    Table,
    Spinner,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import TicketForm from './TicketForm'; // Component để tạo/edit vé
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './TicketList.scss';

class TicketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            isLoading: false,
            error: null,
            // Phân trang
            currentPage: 1,
            totalPages: 0,
            limit: 10,
            sortField: 'createdAt',
            sortOrder: 'DESC',
            search: '',
            // Modal
            isModalOpen: false,
            isEditMode: false,
            selectedTicket: null,
        };
    }

    componentDidMount() {
        this.fetchTickets();
    }

    // Fetch danh sách vé
    fetchTickets = async () => {
        const { currentPage, limit, sortField, sortOrder, search } = this.state;
        this.setState({ isLoading: true });
        try {
            const params = {
                page: currentPage,
                limit,
                sortField,
                sortOrder,
                search,
            };
            const response = await getTicketsForAdminApi(params);
            if (response && response.status === 'success') {
                const tickets = response.data.tickets.map(ticket => ({
                    id: ticket.id,
                    user: ticket.user.username,
                    movie: ticket.movie.title,
                    showtime: `${new Date(ticket.showtime.start_time).toLocaleString()} - ${new Date(ticket.showtime.end_time).toLocaleString()}`,
                    seat: ticket.seats && ticket.seats.length > 0
                        ? ticket.seats.map(seat => `${seat.row}-${seat.number}`).join(', ')
                        : 'N/A',
                    price: ticket.price,
                    status: ticket.status,
                }));
                this.setState({
                    tickets,
                    totalPages: response.data.totalPages,
                    isLoading: false,
                });
            } else {
                toast.error('Lỗi khi lấy danh sách vé.');
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Lỗi khi gọi API lấy danh sách vé.');
            this.setState({ isLoading: false });
        }
    };

    // Xử lý phân trang
    handlePageChange = (pageNumber) => {
        const newPage = pageNumber.selected + 1;
        this.setState({ currentPage: newPage }, this.fetchTickets);
    };

    // Xử lý thay đổi số vé trên mỗi trang
    handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        this.setState({ limit: newLimit, currentPage: 1 }, this.fetchTickets);
    };

    // Xử lý tìm kiếm
    handleSearchChange = (e) => {
        const searchValue = e.target.value;
        this.setState({ search: searchValue, currentPage: 1 }, this.fetchTickets);
    };

    // Mở modal tạo mới vé
    openCreateModal = () => {
        this.setState({
            isModalOpen: true,
            isEditMode: false,
            selectedTicket: null,
        });
    };

    // Mở modal chỉnh sửa vé (nếu có)
    openEditModal = (ticket) => {
        this.setState({
            isModalOpen: true,
            isEditMode: true,
            selectedTicket: ticket,
        });
    };

    // Đóng modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            isEditMode: false,
            selectedTicket: null,
        });
    };

    // Xử lý lưu vé (tạo mới hoặc chỉnh sửa)
    handleSaveTicket = async (ticketData) => {
        const { isEditMode } = this.state;
        try {
            let response;
            if (isEditMode) {
                // Nếu có chức năng chỉnh sửa vé, bạn có thể thêm ở đây
                // response = await updateTicketApi(selectedTicket.id, ticketData);
                // Giả sử chưa có API update, bạn có thể bỏ qua hoặc triển khai tương tự như createTicketApi
                toast.error('Chức năng chỉnh sửa vé chưa được triển khai.');
                return;
            } else {
                // Tạo vé mới
                response = await createTicketApi(ticketData);
            }

            if (response && response.status === 'success') {
                toast.success(`${isEditMode ? 'Cập nhật' : 'Tạo'} vé thành công`);
                this.closeModal();
                this.fetchTickets();
            } else {
                // Nếu response không có status 'success', hiển thị thông báo lỗi từ backend nếu có
                const errorMessage = response.message || 'Lỗi khi lưu thông tin vé';
                toast.error(errorMessage);
            }
        } catch (error) {
            // Kiểm tra xem backend có gửi thông báo lỗi cụ thể không
            const errorMessage = error.message || 'Lỗi khi gọi API';
            toast.error(errorMessage);
        }
    };

    // Xử lý hủy vé
    handleCancelTicket = async (ticketId) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy vé này?')) {
            try {
                const response = await cancelTicketApi(ticketId);
                if (response && response.status === "success") {
                    toast.success('Hủy vé thành công');
                    this.fetchTickets();
                } else {
                    toast.error('Lỗi khi hủy vé.');
                }
            } catch (error) {
                toast.error(error.message || 'Lỗi khi gọi API.');
                console.error(error);
            }
        }
    };

    render() {
        const {
            tickets,
            isLoading,
            currentPage,
            totalPages,
            limit,
            search,
            isModalOpen,
            isEditMode,
            selectedTicket,
        } = this.state;

        const pageCount = totalPages;

        return (
            <div className="ticket-list-container p-4">
                <h2 className="mb-4 text-center">Quản Lý Vé</h2>

                {/* Tìm kiếm và Hành Động */}
                <Row className="mb-3 align-items-center">
                    <Col md="6" sm="12" className="mb-2 mb-md-0">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FaSearch />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="text"
                                placeholder="Tìm kiếm vé theo tên người dùng, phim hoặc trạng thái"
                                value={search}
                                onChange={this.handleSearchChange}
                            />
                        </InputGroup>
                    </Col>
                    {/* <Col md="6" sm="12" className="text-md-right">
                        <Button color="primary" onClick={this.openCreateModal}>
                            <FaPlus /> Tạo Vé Mới
                        </Button>
                    </Col> */}
                </Row>

                {/* Bảng danh sách vé */}
                <div className="tickets-table">
                    {isLoading ? (
                        <div className="loading-spinner text-center my-4">
                            <Spinner color="primary" />
                        </div>
                    ) : (
                        <Table responsive hover bordered className="mb-4">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Người Dùng</th>
                                    <th>Phim</th>
                                    <th>Suất Chiếu</th>
                                    <th>Ghế</th>
                                    <th>Giá (VNĐ)</th>
                                    <th>Trạng Thái</th>
                                    {/* <th>Hành Động</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.length > 0 ? (
                                    tickets.map((ticket, index) => (
                                        <tr key={ticket.id}>
                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                            <td>{ticket.user}</td>
                                            <td>{ticket.movie}</td>
                                            <td>{ticket.showtime}</td>
                                            <td>{ticket.seat}</td>
                                            <td>{Number(ticket.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                            <td>
                                                <span className={`badge badge-${ticket.status === 'confirmed' ? 'success' : 'danger'}`}>
                                                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                                </span>
                                            </td>
                                            {/* <td> */}
                                                {/* Nếu có chức năng chỉnh sửa vé, thêm nút Sửa */}
                                                {/* <Button color="warning" size="sm" onClick={() => this.openEditModal(ticket)}>
                                                    <FaEdit /> Sửa
                                                </Button> {' '} */}
                                                {/* <Button color="danger" size="sm" onClick={() => this.handleCancelTicket(ticket.id)}>
                                                    <FaTrash /> Hủy
                                                </Button> */}
                                            {/* </td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">Không có vé nào.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </div>

                {/* Phân trang */}
                {pageCount > 1 && (
                    <Row className="align-items-center">
                        <Col md="6" sm="12" className="mb-2 mb-md-0">
                            <Form inline>
                                <FormGroup>
                                    <Label for="limit" className="mr-2">Số vé trên mỗi trang:</Label>
                                    <Input
                                        type="select"
                                        id="limit"
                                        value={limit}
                                        onChange={this.handleLimitChange}
                                        style={{ width: '80px' }}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col md="6" sm="12">
                            <ReactPaginate
                                previousLabel={'«'}
                                nextLabel={'»'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageChange}
                                containerClassName={'pagination justify-content-end'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                // breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                activeClassName={'active'}
                                forcePage={currentPage - 1}
                                ariaLabelBuilder={(page) => `Page ${page}`}
                            />
                        </Col>
                    </Row>
                )}

                {/* Modal tạo mới/chỉnh sửa vé */}
                <Modal isOpen={isModalOpen} toggle={this.closeModal} size="lg" centered>
                    <ModalHeader toggle={this.closeModal}>
                        {isEditMode ? 'Chỉnh Sửa Vé' : 'Tạo Vé Mới'}
                    </ModalHeader>
                    <ModalBody>
                        <TicketForm
                            ticket={selectedTicket}
                            onSave={this.handleSaveTicket}
                            onCancel={this.closeModal}
                            isEditMode={isEditMode}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default TicketList;
