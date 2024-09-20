// // src/containers/System/Admin/components/ManageSeatModal.js

// import React, { Component } from 'react';
// import {
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Button,
//     Form,
//     FormGroup,
//     Label,
//     Input,
//     Table,
// } from 'reactstrap';
// import { toast } from 'react-toastify';
// import {
//     getSeatsByTheaterApi,
//     createSeatApi,
//     updateSeatApi,
//     deleteSeatApi,
//     updateSeatStatusApi,
// } from '../../../services/userService';

// class ManageSeatModal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             seats: [],
//             isAddEditSeatModalOpen: false,
//             isEditSeatMode: false,
//             selectedSeat: null,
//             seatRow: '',
//             seatNumber: '',
//             seatType: '',
//         };
//     }

//     componentDidMount() {
//         this.fetchSeats();
//     }

//     componentDidUpdate(prevProps) {
//         // Nếu theaterId thay đổi, reload danh sách ghế
//         if (prevProps.theaterId !== this.props.theaterId) {
//             this.fetchSeats();
//         }
//     }

//     // Fetch seats by theater
//     fetchSeats = async () => {
//         const { theaterId } = this.props;
//         console.log("check therid", theaterId)
//         if (!theaterId) return;

//         try {
//             const response = await getSeatsByTheaterApi(theaterId);
//             console.log("chek ress get seat by theater", response)
//             if (response && response.status === 'success') {
//                 this.setState({ seats: response.data.seats });
//             } else {
//                 toast.error('Lỗi khi lấy danh sách ghế');
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi gọi API');
//         }
//     };

//     // Open Add/Edit Seat Modal
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

//     // Close Add/Edit Seat Modal
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

//     // Handle Seat Input Change
//     handleSeatInputChange = (e, field) => {
//         this.setState({ [field]: e.target.value });
//     };

//     // Submit Seat Form
//     handleSeatSubmit = async () => {
//         const { isEditSeatMode, seatRow, seatNumber, seatType, selectedSeat } = this.state;
//         const { theaterId } = this.props;

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
//                 this.fetchSeats(); // Reload danh sách ghế
//             } else {
//                 toast.error('Lỗi khi lưu thông tin ghế');
//             }
//         } catch (error) {
//             toast.error('Lỗi khi gọi API');
//         }
//     };

//     // Delete Seat
//     handleDeleteSeat = async (seatId) => {
//         const { theaterId } = this.props;
//         if (window.confirm('Bạn có chắc chắn muốn xóa ghế này?')) {
//             try {
//                 const response = await deleteSeatApi(theaterId, seatId);
//                 if (response && response.status === 'success') {
//                     toast.success('Xóa ghế thành công');
//                     this.fetchSeats();
//                 } else {
//                     toast.error('Lỗi khi xóa ghế');
//                 }
//             } catch (error) {
//                 toast.error('Lỗi khi gọi API');
//             }
//         }
//     };

//     // Update Seat Status
//     handleUpdateSeatStatus = async (seat, newStatus) => {
//         const { theaterId } = this.props;
//         try {
//             const response = await updateSeatStatusApi(theaterId, seat.id, newStatus);
//             if (response && response.status === 'success') {
//                 toast.success('Cập nhật trạng thái ghế thành công');
//                 this.fetchSeats();
//             } else {
//                 toast.error('Lỗi khi cập nhật trạng thái ghế');
//             }
//         } catch (error) {
//             toast.error('Lỗi khi gọi API');
//         }
//     };

//     render() {
//         const { isAddEditSeatModalOpen, isEditSeatMode, seatRow, seatNumber, seatType, seats } = this.state;

//         return (
//             <div>
//                 <h5>Danh sách ghế ngồi</h5>
//                 <div className="add-seat-button">
//                     <Button color="success" onClick={() => this.openAddEditSeatModal()}>Thêm ghế mới</Button>
//                 </div>
//                 <Table responsive>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Hàng</th>
//                             <th>Số ghế</th>
//                             <th>Loại ghế</th>
//                             <th>Giá</th>
//                             <th>Trạng thái</th>
//                             <th>Hành động</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {seats.length > 0 ? (
//                             seats.map((seat, index) => (
//                                 <tr key={seat.id}>
//                                     <td>{index + 1}</td>
//                                     <td>{seat.row}</td>
//                                     <td>{seat.number}</td>
//                                     <td>{seat.type}</td>
//                                     <td>{seat.price.toLocaleString()} VND</td>
//                                     <td>{seat.status}</td>
//                                     <td>
//                                         <Button color="primary" size="sm" onClick={() => this.openAddEditSeatModal(seat)}>Sửa</Button>{' '}
//                                         <Button color="danger" size="sm" onClick={() => this.handleDeleteSeat(seat.id)}>Xóa</Button>{' '}
//                                         <Button
//                                             color={seat.status === 'available' ? 'warning' : 'secondary'}
//                                             size="sm"
//                                             onClick={() => this.handleUpdateSeatStatus(seat, seat.status === 'available' ? 'reserved' : 'available')}
//                                         >
//                                             {seat.status === 'available' ? 'Đặt' : 'Hủy đặt'}
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="7">Không có ghế nào.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>

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
//         );
//     }
// }

// export default ManageSeatModal;
