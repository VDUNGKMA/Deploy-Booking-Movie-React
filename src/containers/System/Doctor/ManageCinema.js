// src/containers/System/Admin/ManageCinema.js

import React, { Component } from 'react';
import {
    getCinemasApi,
    createCinemaApi,
    updateCinemaApi,
    deleteCinemaApi,
    getTheatersByCinemaApi,
    createTheaterApi,
    updateTheaterApi,
    deleteTheaterApi,
} from '../../../services/userService';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Table,
    Spinner,
} from 'reactstrap';
// import ManageSeatModal from './ManageSeatModal';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import './ManageCinema.scss';

class ManageCinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cinemas: [],
            isCinemaModalOpen: false,
            isEditCinemaMode: false,
            selectedCinema: null,
            previewImage: '',
            imageFile: null,
            loading: false,
            // Theater Management
            isManageTheatersModalOpen: false, // State riêng cho Manage Theaters Modal
            isAddEditTheaterModalOpen: false, // State riêng cho Add/Edit Theater Modal
            isEditTheaterMode: false,
            selectedTheater: null,
            theaters: [],
            selectedCinemaForTheaters: null,
            theaterName: '',
            theaterCapacity: '',
            // Seat Management
            // isManageSeatsModalOpen: false,
            // selectedTheaterForSeats: null,
        };
    }

    async componentDidMount() {
        await this.fetchCinemas();
    }

    // Fetch cinemas
    fetchCinemas = async () => {
        try {
            const response = await getCinemasApi();
            if (response && response.status === 'success') {
                this.setState({ cinemas: response.data }); // Giả sử response.data.cinemas chứa danh sách rạp
            } else {
                toast.error('Lỗi khi lấy danh sách rạp chiếu phim');
            }
        } catch (error) {
            console.error(error);
            toast.error('Lỗi khi gọi API');
        }
    };

    // Open Cinema Modal
    openCinemaModal = (cinema = null) => {
        if (cinema) {
            // Chế độ chỉnh sửa
            this.setState({
                isCinemaModalOpen: true,
                isEditCinemaMode: true,
                selectedCinema: { ...cinema },
                previewImage: cinema.image_url || '',
                imageFile: null,
                // Đóng các modal khác nếu mở
                isManageTheatersModalOpen: false,
                isAddEditTheaterModalOpen: false,
                // isManageSeatsModalOpen: false,
            });
        } else {
            // Chế độ thêm mới
            this.setState({
                isCinemaModalOpen: true,
                isEditCinemaMode: false,
                selectedCinema: {
                    name: '',
                    location: '',
                    number_of_halls: '',
                },
                previewImage: '',
                imageFile: null,
                // Đóng các modal khác nếu mở
                isManageTheatersModalOpen: false,
                isAddEditTheaterModalOpen: false,
                // isManageSeatsModalOpen: false,
            });
        }
    };
    
    openManageSeatsPage = (theater) => {
        const { history } = this.props;
        const { selectedCinemaForTheaters } = this.state;
        if (!selectedCinemaForTheaters || !theater) {
            toast.error('Không xác định được rạp hoặc phòng chiếu!');
            return;
        }

        // Đóng tất cả các modal trước khi điều hướng
        this.setState({
            isManageTheatersModalOpen: false,
            isAddEditTheaterModalOpen: false,
            isCinemaModalOpen: false,
            isAddEditSeatModalOpen: false,
        }, () => {
            console.log("check cilkdfjslf", theater)
            // Điều hướng sau khi state đã được cập nhật
            history.push({
                pathname: `/system/cinemas/${selectedCinemaForTheaters.id}/theaters/${theater.id}/seats`,
                state: { theater: theater }
            });

            // history.push(`/system/cinemas/${selectedCinemaForTheaters.id}/theaters/${theater.id}/seats`,theater);
        });
    };

    // Close Cinema Modal
    closeCinemaModal = () => {
        this.setState({ isCinemaModalOpen: false });
    };
    // Close Manage Seats Modal
    // closeManageSeatsModal = () => {
    //     this.setState({
    //         isManageSeatsModalOpen: false,
    //         selectedTheaterForSeats: null,
    //     });
    // };

    // Handle Cinema Input Change
    handleCinemaInputChange = (e, field) => {
        const { selectedCinema } = this.state;
        selectedCinema[field] = e.target.value;
        this.setState({ selectedCinema });
    };

    // Handle Cinema Image Change
    handleCinemaImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({ imageFile: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ previewImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Submit Cinema Form
    handleCinemaSubmit = async () => {
        const { isEditCinemaMode, selectedCinema, imageFile } = this.state;
        const formData = new FormData();
        formData.append('name', selectedCinema.name);
        formData.append('location', selectedCinema.location);
        formData.append('number_of_halls', selectedCinema.number_of_halls);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        this.setState({ loading: true }); // Start loading
        try {
            let response;
            if (isEditCinemaMode) {
                response = await updateCinemaApi(selectedCinema.id, formData);
            } else {
                response = await createCinemaApi(formData);
            }

            if (response && response.status === 'success') {
                toast.success(`${isEditCinemaMode ? 'Cập nhật' : 'Thêm mới'} rạp chiếu phim thành công`);
                this.setState({ isCinemaModalOpen: false });
                this.fetchCinemas();
            } else {
                toast.error('Lỗi khi lưu thông tin rạp chiếu phim');
            }
        } catch (error) {
            toast.error('Lỗi khi gọi API');
        } finally {
            this.setState({ loading: false }); // Stop loading
        }
    };

    // Edit Cinema
    handleEditCinema = (cinema) => {
        this.openCinemaModal(cinema);
    };

    // Delete Cinema
    handleDeleteCinema = async (cinemaId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa rạp chiếu phim này?')) {
            try {
                const response = await deleteCinemaApi(cinemaId);
                if (!response) {
                    toast.success('Xóa rạp chiếu phim thành công');
                    this.fetchCinemas();
                } else {
                    toast.error('Lỗi khi xóa rạp chiếu phim');
                }
            } catch (error) {
                toast.error('Lỗi khi gọi API');
            }
        }
    };

    // Open Manage Theaters Modal
    openManageTheatersModal = async (cinema) => {
        this.setState({
            isManageTheatersModalOpen: true,
            selectedCinemaForTheaters: cinema,
            theaters: [],
            // Đóng các modal khác nếu mở
            isCinemaModalOpen: false,
            isAddEditTheaterModalOpen: false,
            // isManageSeatsModalOpen: false,
        });

        try {
            const response = await getTheatersByCinemaApi(cinema.id);
            if (response && response.status === 'success') {
                this.setState({ theaters: response.data }); // Giả sử response.data.theaters chứa danh sách phòng chiếu
            } else {
                toast.error('Lỗi khi lấy danh sách phòng chiếu');
            }
        } catch (error) {
            toast.error('Lỗi khi gọi API');
        }
    };

    // Close Manage Theaters Modal
    closeManageTheatersModal = () => {
        this.setState({
            isManageTheatersModalOpen: false,
            selectedCinemaForTheaters: null,
            theaters: [],
            theaterName: '',
            theaterCapacity: '',
            selectedTheater: null,
            isEditTheaterMode: false,
            isAddEditTheaterModalOpen: false,
            // Đóng các modal seats nếu mở
            // isManageSeatsModalOpen: false,
        });
    };

    // Open Add Theater Modal
    openAddTheaterModal = () => {
        this.setState({
            isAddEditTheaterModalOpen: true,
            isEditTheaterMode: false,
            theaterName: '',
            theaterCapacity: '',
            selectedTheater: null,
        });
    };

    // Open Edit Theater Modal
    openEditTheaterModal = (theater) => {
        this.setState({
            isAddEditTheaterModalOpen: true,
            isEditTheaterMode: true,
            selectedTheater: theater,
            theaterName: theater.name,
            theaterCapacity: theater.capacity,
        });
    };

    // Close Add/Edit Theater Modal
    closeAddEditTheaterModal = () => {
        this.setState({
            isAddEditTheaterModalOpen: false,
            selectedTheater: null,
            isEditTheaterMode: false,
            theaterName: '',
            theaterCapacity: '',
        });
    };

    // Handle Theater Input Change
    handleTheaterInputChange = (e, field) => {
        this.setState({ [field]: e.target.value });
    };

    // Submit Theater Form
    handleTheaterSubmit = async () => {
        const { isEditTheaterMode, selectedCinemaForTheaters, theaterName, theaterCapacity, selectedTheater } = this.state;

        if (!theaterName || !theaterCapacity) {
            toast.error('Vui lòng nhập đầy đủ thông tin phòng chiếu');
            return;
        }
        this.setState({ loading: true }); // Start loading
        try {
            let response;
            if (isEditTheaterMode) {
                response = await updateTheaterApi(selectedTheater.id, {
                    name: theaterName,
                    capacity: theaterCapacity,
                });
            } else {
                response = await createTheaterApi(selectedCinemaForTheaters.id, {
                    name: theaterName,
                    capacity: theaterCapacity,
                });
            }

            if (response && response.status === 'success') {
                toast.success(`${isEditTheaterMode ? 'Cập nhật' : 'Thêm mới'} phòng chiếu thành công`);
                this.setState({ isAddEditTheaterModalOpen: false });
                await this.fetchCinemas();
                // Reload danh sách phòng chiếu
                this.openManageTheatersModal(selectedCinemaForTheaters);
            } else {
                toast.error('Lỗi khi lưu thông tin phòng chiếu');
            }
        } catch (error) {
            toast.error('Lỗi khi gọi API');
        } finally {
            this.setState({ loading: false }); // Stop loading
        }
    };

    // Delete Theater
    handleDeleteTheater = async (theaterId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phòng chiếu này?')) {
            try {
                const response = await deleteTheaterApi(theaterId);
                if (response && response.status === 'success') {
                    toast.success('Xóa phòng chiếu thành công');
                    this.setState((prevState) => ({
                        theaters: prevState.theaters.filter((theater) => theater.id !== theaterId),
                    }));
                } else {
                    toast.error('Lỗi khi xóa phòng chiếu');
                }
            } catch (error) {
                toast.error('Lỗi khi gọi API');
            }
        }
    };

    render() {
        const {
            cinemas,
            isCinemaModalOpen,
            isEditCinemaMode,
            selectedCinema,
            previewImage,
            isManageTheatersModalOpen,
            selectedCinemaForTheaters,
            theaters,
            isAddEditTheaterModalOpen,
            isEditTheaterMode,
            theaterName,
            theaterCapacity,
            selectedTheater,
            // Seat Management
            isManageSeatsModalOpen,
            selectedTheaterForSeats,
            loading, 
        } = this.state;

        return (
            <div className="manage-cinema-container">
                <h2>Quản lý rạp chiếu phim</h2>
                <div className="add-cinema-button">
                    <Button color="success" onClick={() => this.openCinemaModal()}>Thêm mới</Button>
                </div>
                <div className="cinema-table">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên rạp</th>
                                <th>Địa điểm</th>
                                <th>Số lượng phòng</th>
                                <th>Hình ảnh</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cinemas.length > 0 ? (
                                cinemas.map((cinema, index) => (
                                    <tr key={cinema.id}>
                                        <td>{index + 1}</td>
                                        <td>{cinema.name}</td>
                                        <td>{cinema.location}</td>
                                        <td>{cinema.number_of_halls}</td>
                                        <td>
                                            {cinema.image_url ? (
                                                <img src={cinema.image_url} alt={cinema.name} className="cinema-image" />
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
                                        <td className="action-buttons">
                                            <Button color="primary" onClick={() => this.handleEditCinema(cinema)}>Chỉnh sửa</Button>{' '}
                                            <Button color="danger" onClick={() => this.handleDeleteCinema(cinema.id)}>Xóa</Button>{' '}
                                            <Button color="info" onClick={() => this.openManageTheatersModal(cinema)}>Quản lý phòng chiếu</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Không có rạp chiếu phim nào.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Modal thêm mới/chỉnh sửa rạp chiếu phim */}
                <Modal isOpen={isCinemaModalOpen} toggle={this.closeCinemaModal}>
                    <ModalHeader toggle={this.closeCinemaModal}>
                        {isEditCinemaMode ? 'Chỉnh sửa rạp chiếu phim' : 'Thêm mới rạp chiếu phim'}
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Tên rạp</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={selectedCinema ? selectedCinema.name : ''}
                                    onChange={(e) => this.handleCinemaInputChange(e, 'name')}
                                    placeholder="Nhập tên rạp"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Địa điểm</Label>
                                <Input
                                    type="text"
                                    id="location"
                                    value={selectedCinema ? selectedCinema.location : ''}
                                    onChange={(e) => this.handleCinemaInputChange(e, 'location')}
                                    placeholder="Nhập địa điểm"
                                />
                            </FormGroup>
                            {/* <FormGroup>
                                <Label for="number_of_halls">Số lượng phòng</Label>
                                <Input
                                    type="number"
                                    id="number_of_halls"
                                    value={selectedCinema ? selectedCinema.number_of_halls : ''}
                                    onChange={(e) => this.handleCinemaInputChange(e, 'number_of_halls')}
                                    placeholder="Nhập số lượng phòng"
                                />
                            </FormGroup> */}
                            <FormGroup>
                                <Label for="image">Hình ảnh</Label>
                                <Input type="file" id="image" onChange={this.handleCinemaImageChange} />
                                {previewImage && (
                                    <div
                                        style={{
                                            marginTop: '10px',
                                            width: '120px',         // Fixed frame width
                                            height: '80px',         // Fixed frame height
                                            border: '1px solid #ddd',
                                            borderRadius: '5px',
                                            overflow: 'hidden',     // Ensures image doesn't exceed the frame
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#f8f9fa'
                                        }}
                                    >
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            style={{
                                                maxWidth: '100%',    // Prevents image from exceeding container width
                                                maxHeight: '100%',   // Prevents image from exceeding container height
                                                objectFit: 'cover'   // Crops and centers the image within the frame
                                            }}
                                        />
                                    </div>
                                )}
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.closeCinemaModal}>Hủy</Button>
                        <Button color="primary" onClick={this.handleCinemaSubmit} disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner size="sm" color="light" /> Đang tải...
                                </>
                            ) : (
                                isEditCinemaMode ? 'Cập nhật' : 'Thêm mới'
                            )}
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* Modal quản lý phòng chiếu */}
                {selectedCinemaForTheaters && (
                    <Modal isOpen={isManageTheatersModalOpen} toggle={this.closeManageTheatersModal} size="lg" className="theater-modal">
                        <ModalHeader toggle={this.closeManageTheatersModal}>
                            Quản lý phòng chiếu cho rạp: {selectedCinemaForTheaters.name}
                        </ModalHeader>
                        <ModalBody>
                            <h5>Danh sách phòng chiếu</h5>
                            <div className="add-theater-button">
                                <Button color="success" onClick={() => this.openAddTheaterModal()}>Thêm phòng chiếu mới</Button>
                            </div>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên phòng chiếu</th>
                                        <th>Sức chứa</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {theaters.length > 0 ? (
                                        theaters.map((theater, index) => (
                                            <tr key={theater.id}>
                                                <td>{index + 1}</td>
                                                <td>{theater.name}</td>
                                                <td>{theater.capacity}</td>
                                                <td>
                                                    <Button color="primary" onClick={() => this.openEditTheaterModal(theater)}>Sửa</Button>{' '}
                                                    <Button color="danger" onClick={() => this.handleDeleteTheater(theater.id)}>Xóa</Button>{' '}
                                                    {/* <Button color="warning" onClick={() => this.openManageSeatsModal(theater)}>Quản lý ghế</Button> */}
                                                    <Button color="warning" onClick={() => this.openManageSeatsPage(theater)}>Quản lý ghế</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">Không có phòng chiếu nào.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.closeManageTheatersModal}>Đóng</Button>
                        </ModalFooter>
                    </Modal>
                )}

                {/* Modal thêm mới/chỉnh sửa phòng chiếu */}
                {isAddEditTheaterModalOpen && (
                    <Modal isOpen={isAddEditTheaterModalOpen} toggle={this.closeAddEditTheaterModal} size="md">
                        <ModalHeader toggle={this.closeAddEditTheaterModal}>
                            {isEditTheaterMode ? 'Chỉnh sửa phòng chiếu' : 'Thêm mới phòng chiếu'}
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="theaterName">Tên phòng chiếu</Label>
                                    <Input
                                        type="text"
                                        id="theaterName"
                                        value={theaterName}
                                        onChange={(e) => this.handleTheaterInputChange(e, 'theaterName')}
                                        placeholder="Nhập tên phòng chiếu"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="theaterCapacity">Sức chứa</Label>
                                    <Input
                                        type="number"
                                        id="theaterCapacity"
                                        value={theaterCapacity}
                                        onChange={(e) => this.handleTheaterInputChange(e, 'theaterCapacity')}
                                        placeholder="Nhập sức chứa"
                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.closeAddEditTheaterModal}>Hủy</Button>
                            <Button color="primary" onClick={this.handleTheaterSubmit} disabled={loading}>
                            
                                {loading ? (
                                    <>
                                        <Spinner size="sm" color="light" /> Đang tải...
                                    </>
                                ) : (
                                        isEditTheaterMode? 'Cập nhật': 'Thêm mới' 
                                )}
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
                {/* Modal quản lý ghế ngồi */}
                {/* <ManageSeatModal
                    isOpen={isManageSeatsModalOpen}
                    toggle={this.closeManageSeatsModal}
                    theaterId={selectedTheaterForSeats ? selectedTheaterForSeats.id : null}
                /> */}

            </div>
        );
    }
}
export default withRouter(ManageCinema);
