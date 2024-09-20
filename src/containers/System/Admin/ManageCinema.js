import React, { Component } from 'react';
import { createCinemaApi, getCinemasApi, updateCinemaApi, deleteCinemaApi } from '../../../services/userService';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import './ManageCinema.scss'
class ManageCinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cinemas: [],
            isModalOpen: false,
            isEditMode: false,
            selectedCinema: null,
            previewImage: '',
            imageFile: null,
        };
    }

    async componentDidMount() {
        try {
            const response = await getCinemasApi();
            console.log("check get cinemasapi", response)
            if (response && response.status === 'success') {
                this.setState({ cinemas: response.data.reverse() });
            } else {
                toast.error('Lỗi khi lấy danh sách rạp chiếu phim');
            }
        } catch (error) {
            toast.error('Lỗi khi gọi API');
        }
    }

    openModal = () => {
        this.setState({
            isModalOpen: true,
            isEditMode: false,
            selectedCinema: {
                name: '',
                location: '',
                number_of_halls: '',
            },
            previewImage: '',
            imageFile: null,
        });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleInputChange = (e, field) => {
        const { selectedCinema } = this.state;
        selectedCinema[field] = e.target.value;
        this.setState({ selectedCinema });
    };

    handleImageChange = (e) => {
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

    handleSubmit = async () => {
        const { isEditMode, selectedCinema, imageFile } = this.state;
        const formData = new FormData();
        formData.append('name', selectedCinema.name);
        formData.append('location', selectedCinema.location);
        formData.append('number_of_halls', selectedCinema.number_of_halls);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            let response;
            if (isEditMode) {
                response = await updateCinemaApi(selectedCinema.id, formData);
            } else {
                response = await createCinemaApi(formData);
            }

            if (response && response.status === 'success') {
                this.setState({ isModalOpen: false });
                toast.success(`${isEditMode ? 'Cập nhật' : 'Thêm mới'} rạp chiếu phim thành công`);
                this.componentDidMount(); // Reload danh sách
            } else {
                toast.error('Lỗi khi lưu thông tin rạp chiếu phim');
            }
        } catch (error) {
            toast.error('Lỗi khi gọi API');
        }
    };

    handleEditCinema = (cinema) => {
        this.setState({
            isModalOpen: true,
            isEditMode: true,
            selectedCinema: { ...cinema },
            previewImage: cinema.image_url,
            imageFile: null,
        });
    };

    handleDeleteCinema = async (cinemaId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa rạp chiếu phim này?')) {
            try {
                const response = await deleteCinemaApi(cinemaId);
                if (!response && response.status !== "fail") {
                    this.componentDidMount(); // Reload danh sách
                    toast.success('Xóa rạp chiếu phim thành công');
                } else {
                    toast.error('Lỗi khi xóa rạp chiếu phim');
                }
            } catch (error) {
                toast.error('Lỗi khi gọi API');
            }
        }
    };

    render() {
        const { cinemas, isModalOpen, isEditMode, selectedCinema, previewImage } = this.state;

        return (
            <div className="manage-cinema-container">
                <h2>Quản lý rạp chiếu phim</h2>
                <Button color="primary" onClick={this.openModal}>Thêm mới</Button>
                <Table>
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
                        {cinemas.map((cinema, index) => (
                            <tr key={cinema.id}>
                                <td>{cinema.id}</td>
                                <td>{cinema.name}</td>
                                <td>{cinema.location}</td>
                                <td>{cinema.number_of_halls}</td>
                                <td>
                                    <img src={cinema.image_url} alt={cinema.name} style={{ width: '100px' }} />
                                </td>
                                <td>
                                    <Button color="primary" onClick={() => this.handleEditCinema(cinema)}>Chỉnh sửa</Button>{' '}
                                    <Button color="danger" onClick={() => this.handleDeleteCinema(cinema.id)}>Xóa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal thêm mới/chỉnh sửa rạp chiếu phim */}
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} toggle={this.closeModal}>
                        <ModalHeader toggle={this.closeModal}>
                            {isEditMode ? 'Chỉnh sửa rạp chiếu phim' : 'Thêm mới rạp chiếu phim'}
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="name">Tên rạp</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        value={selectedCinema.name}
                                        onChange={(e) => this.handleInputChange(e, 'name')}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="location">Địa điểm</Label>
                                    <Input
                                        type="text"
                                        id="location"
                                        value={selectedCinema.location}
                                        onChange={(e) => this.handleInputChange(e, 'location')}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="number_of_halls">Số lượng phòng</Label>
                                    <Input
                                        type="number"
                                        id="number_of_halls"
                                        value={selectedCinema.number_of_halls}
                                        onChange={(e) => this.handleInputChange(e, 'number_of_halls')}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Hình ảnh</Label>
                                    <Input type="file" id="image" onChange={this.handleImageChange} />
                                    {previewImage && (
                                        <div>
                                            <img src={previewImage} alt="Preview" style={{ width: '200px' }} />
                                        </div>
                                    )}
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.closeModal}>Hủy</Button>
                            <Button color="primary" onClick={this.handleSubmit}>{isEditMode ? 'Cập nhật' : 'Thêm mới'}</Button>
                        </ModalFooter>
                    </Modal>
                )}
            </div>
        );
    }
}

export default withRouter(ManageCinema);
