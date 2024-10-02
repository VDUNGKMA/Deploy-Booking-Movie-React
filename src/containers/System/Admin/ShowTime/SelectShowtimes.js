
    import React, { Component } from 'react';
    import {
        getCinemasApi,
        getTheatersByCinemaApi,
        getShowtimesByTheaterApi,
        createShowtimeApi,
        updateShowtimeApi,
        deleteShowtimeApi,
    } from '../../../../services/userService';
    import {
        Button,
        Form,
        FormGroup,
        Label,
        Input,
        Table,
        Spinner,
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter,
    } from 'reactstrap';
    import { toast } from 'react-toastify';
    import ReactPaginate from 'react-paginate';
    import Select from 'react-select';
    import ShowtimeForm from './ShowtimeForm'; // Giả sử bạn đã tạo component ShowtimeForm.js
    import './SelectShowtimes.scss';

    class SelectShowtimes extends Component {
        constructor(props) {
            super(props);
            this.state = {
                cinemas: [],
                theaters: [],
                showtimes: [],
                selectedCinema: null, // Đối tượng chọn từ react-select
                selectedTheater: null, // Đối tượng chọn từ react-select
                isLoadingCinemas: false,
                isLoadingTheaters: false,
                isLoadingShowtimes: false,
                error: null,
                // Phân trang cho showtimes
                currentPage: 1,
                totalPages: 0,
                limit: 10,
                sortField: 'start_time',
                sortOrder: 'ASC',
                search: '',
                // Modal
                isModalOpen: false,
                isEditMode: false,
                selectedShowtime: null,
            };
        }

        componentDidMount() {
            this.fetchCinemas();
        }

        // Fetch danh sách rạp
        fetchCinemas = async () => {
            this.setState({ isLoadingCinemas: true });
            try {
                const response = await getCinemasApi();
                if (response && response.status === 'success') {
                    const cinemas = response.data.map(cinema => ({
                        value: cinema.id,
                        label: cinema.name,
                    }));
                    this.setState({ cinemas, isLoadingCinemas: false });
                } else {
                    toast.error('Lỗi khi lấy danh sách rạp.');
                    this.setState({ isLoadingCinemas: false });
                }
            } catch (error) {
                console.error(error);
                toast.error('Lỗi khi gọi API lấy danh sách rạp.');
                this.setState({ isLoadingCinemas: false });
            }
        };

        // Fetch danh sách phòng chiếu theo rạp
        fetchTheaters = async (cinemaId) => {
            if (!cinemaId) {
                this.setState({ theaters: [], selectedTheater: null, showtimes: [] });
                return;
            }
            this.setState({ isLoadingTheaters: true, theaters: [], selectedTheater: null, showtimes: [] });
            try {
                const response = await getTheatersByCinemaApi(cinemaId);
                if (response && response.status === 'success') {
                    const theaters = response.data.map(theater => ({
                        value: theater.id,
                        label: theater.name,
                    }));
                    this.setState({ theaters, isLoadingTheaters: false });
                } else {
                    toast.error('Lỗi khi lấy danh sách phòng chiếu.');
                    this.setState({ isLoadingTheaters: false });
                }
            } catch (error) {
                console.error(error);
                toast.error('Lỗi khi gọi API lấy danh sách phòng chiếu.');
                this.setState({ isLoadingTheaters: false });
            }
        };

        // Fetch danh sách suất chiếu theo phòng chiếu
        // fetchShowtimes = async (theaterId, page = 1, limit = 10, sortField = 'start_time', sortOrder = 'ASC', search = '') => {
        //     if (!theaterId) {
        //         this.setState({ showtimes: [], totalPages: 0 });
        //         return;
        //     }
        //     this.setState({ isLoadingShowtimes: true, showtimes: [], totalPages: 0 });
        //     try {
        //         const response = await getShowtimesByTheaterApi(theaterId, page, limit, sortField, sortOrder, search);
        //         console.log("check res getshow time ", response)
        //         if (response && response.status === 'success') {
        //             const showtimes = response.data.showtimes.map(showtime =>
        //             ({
        //                 id: showtime.id,
        //                 movie: showtime.movie.title,
        //                 movie_id: showtime.movie_id,
        //                 start_time: showtime.start_time,
        //                 end_time: showtime.end_time,
        //                 status: showtime.status,

        //             }));
        //             this.setState({
        //                 showtimes,
        //                 totalPages: response.data.totalPages,
        //                 isLoadingShowtimes: false,
        //             });
        //         } else {
        //             toast.error('Lỗi khi lấy danh sách suất chiếu.');
        //             this.setState({ isLoadingShowtimes: false });
        //         }
        //     } catch (error) {
        //         console.error(error);
        //         toast.error('Lỗi khi gọi API lấy danh sách suất chiếu.');
        //         this.setState({ isLoadingShowtimes: false });
        //     }
        // };
        fetchShowtimes = async () => {
            const { selectedTheater, currentPage, limit, sortField, sortOrder, search } = this.state;
            if (!selectedTheater) {
                this.setState({ showtimes: [], totalPages: 0 });
                return;
            }

            this.setState({ isLoadingShowtimes: true, showtimes: [], totalPages: 0 });
            try {
                console.log("check selectedTheater", selectedTheater)
                const response = await getShowtimesByTheaterApi(selectedTheater.value, currentPage, limit, sortField, sortOrder, search);
                console.log("check res getshow time ", response)
                if (response && response.status === 'success') {
                    const showtimes = response.data.showtimes.map(showtime => ({
                        id: showtime.id,
                        movie: showtime.movie.title,
                        movie_id: showtime.movie_id,
                        start_time: showtime.start_time,
                        end_time: showtime.end_time,
                        status: showtime.status,
                        price: showtime.price, // Thêm price
                    }));
                    this.setState({
                        showtimes,
                        totalPages: response.data.totalPages,
                        isLoadingShowtimes: false,
                    });
                } else {
                    toast.error('Lỗi khi lấy danh sách suất chiếu.');
                    this.setState({ isLoadingShowtimes: false });
                }
            } catch (error) {
                console.error(error);
                toast.error('Lỗi khi gọi API lấy danh sách suất chiếu.');
                this.setState({ isLoadingShowtimes: false });
            }
        };
        // Xử lý chọn rạp
        handleCinemaChange = (selectedOption) => {
            this.setState({ selectedCinema: selectedOption, currentPage: 1 }, () => {
                this.fetchTheaters(selectedOption ? selectedOption.value : '');
            });
        };

        // Xử lý chọn phòng chiếu
        handleTheaterChange = (selectedOption) => {
            this.setState({ selectedTheater: selectedOption, currentPage: 1 }, () => {
                this.fetchShowtimes(selectedOption ? selectedOption.value : '', 1, this.state.limit, this.state.sortField, this.state.sortOrder, this.state.search);
            });
        };

        // Xử lý phân trang cho showtimes
        handlePageChange = (pageNumber) => {
            const newPage = pageNumber.selected + 1;
            const { selectedTheater, limit, sortField, sortOrder, search } = this.state;
            this.setState({ currentPage: newPage }, () => {
                this.fetchShowtimes(selectedTheater.value, newPage, limit, sortField, sortOrder, search);
            });
        };

        // Xử lý thay đổi số suất chiếu trên mỗi trang
        handleLimitChange = (e) => {
            const newLimit = parseInt(e.target.value);
            const { selectedTheater } = this.state;
            this.setState({ limit: newLimit, currentPage: 1 }, () => {
                this.fetchShowtimes(selectedTheater.value, 1, newLimit, this.state.sortField, this.state.sortOrder, this.state.search);
            });
        };

        // Xử lý tìm kiếm suất chiếu
        handleSearchChange = (e) => {
            const searchValue = e.target.value;
            const { selectedTheater, limit } = this.state;
            this.setState({ search: searchValue, currentPage: 1 }, () => {
                this.fetchShowtimes(selectedTheater.value, 1, limit, this.state.sortField, this.state.sortOrder, searchValue);
            });
        };

        // Mở modal tạo mới suất chiếu
        openCreateModal = () => {
            this.setState({
                isModalOpen: true,
                isEditMode: false,
                selectedShowtime: null,
            });
        };

        // Mở modal chỉnh sửa suất chiếu
        openEditModal = (showtime) => {
            this.setState({
                isModalOpen: true,
                isEditMode: true,
                selectedShowtime: showtime,
            });
        };

        // Đóng modal
        closeModal = () => {
            this.setState({
                isModalOpen: false,
                isEditMode: false,
                selectedShowtime: null,
            });
        };

        // Xử lý lưu suất chiếu (tạo mới hoặc chỉnh sửa)
        // handleSaveShowtime = async (showtimeData) => {
        //     const { isEditMode, selectedShowtime, selectedTheater } = this.state;
        //     try {
        //         let response;
        //         if (isEditMode) {
        //             // Cập nhật suất chiếu
        //             // console.log("check res selectedshowtime", selectedShowtime)
        //             response = await updateShowtimeApi(selectedShowtime.id, showtimeData);

        //         } else {
        //             // Tạo mới suất chiếu


        //             response = await createShowtimeApi(selectedTheater.value, showtimeData);
        //             console.log("check res create ", response)

        //         }

        //         if (response && response.status === 'success') {
        //             toast.success(`${isEditMode ? 'Cập nhật' : 'Thêm mới'} suất chiếu thành công`);
        //             this.closeModal();
        //             this.fetchShowtimes(selectedTheater.value, this.state.currentPage, this.state.limit, this.state.sortField, this.state.sortOrder, this.state.search);
        //         } else {
        //             toast.error('Lỗi khi lưu thông tin suất chiếu.');
        //         }
        //     } catch (error) {
        //         toast.error('Lỗi khi gọi API.');
        //         console.error(error);
        //     }
        // };
        handleSaveShowtime = async (showtimeData) => {
            const { isEditMode, selectedShowtime, selectedTheater, currentPage, limit, sortField, sortOrder, search } = this.state;
            try {
                let response;
                if (isEditMode) {
                    response = await updateShowtimeApi(selectedShowtime.id, showtimeData);
                } else {
                    response = await createShowtimeApi(showtimeData);
                    console.log("check res create ", response)
                }

                if (response && response.status === 'success') {
                    toast.success(`${isEditMode ? 'Cập nhật' : 'Thêm mới'} suất chiếu thành công`);
                    this.closeModal();
                    this.fetchShowtimes();
                } else {
                    toast.error('Lỗi khi lưu thông tin suất chiếu.');
                }
            } catch (error) {
                toast.error('Lỗi khi gọi API.');
                console.error(error);
            }
        };
        // Xử lý xóa suất chiếu
        // handleDeleteShowtime = async (showtimeId) => {
        //     if (window.confirm('Bạn có chắc chắn muốn xóa suất chiếu này?')) {
        //         try {
        //             const response = await deleteShowtimeApi(showtimeId);
        //             if (response && response.status === "success") {
        //                 toast.success('Xóa suất chiếu thành công');
        //                 const { selectedTheater, currentPage, limit, sortField, sortOrder, search } = this.state;
        //                 this.fetchShowtimes(selectedTheater.value, currentPage, limit, sortField, sortOrder, search);
        //             } else {
        //                 toast.error('Lỗi khi xóa suất chiếu.');
        //             }
        //         } catch (error) {
        //             toast.error('Lỗi khi gọi API.');
        //             console.error(error);
        //         }
        //     }
        // };
        handleDeleteShowtime = async (showtimeId) => {
            if (window.confirm('Bạn có chắc chắn muốn xóa suất chiếu này?')) {
                try {
                    const response = await deleteShowtimeApi(showtimeId);
                    if (response && response.status === "success") {
                        toast.success('Xóa suất chiếu thành công');
                        this.fetchShowtimes();
                    } else {
                        toast.error('Lỗi khi xóa suất chiếu.');
                    }
                } catch (error) {
                    toast.error('Lỗi khi gọi API.');
                    console.error(error);
                }
            }
        };
        render() {
            const {
                cinemas,
                theaters,
                showtimes,
                selectedCinema,
                selectedTheater,
                isLoadingCinemas,
                isLoadingTheaters,
                isLoadingShowtimes,
                currentPage,
                totalPages,
                limit,
                search,
                isModalOpen,
                isEditMode,
                selectedShowtime,
                sortField,
                sortOrder,
            } = this.state;

            const pageCount = totalPages;

            return (
                <div className="select-showtimes-container">
                    <h2>Chọn Suất Chiếu</h2>

                    {/* Form chọn rạp và phòng chiếu */}
                    <Form>
                        <FormGroup>
                            <Label for="cinema">Chọn Rạp</Label>
                            {isLoadingCinemas ? (
                                <Spinner size="sm" color="primary" />
                            ) : (
                                <Select
                                    id="cinema"
                                    name="cinema"
                                    options={cinemas}
                                    value={selectedCinema}
                                    onChange={this.handleCinemaChange}
                                    isClearable
                                    placeholder="-- Chọn Rạp --"
                                />
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label for="theater">Chọn Phòng Chiếu</Label>
                            {isLoadingTheaters ? (
                                <Spinner size="sm" color="primary" />
                            ) : (
                                <Select
                                    id="theater"
                                    name="theater"
                                    options={theaters}
                                    value={selectedTheater}
                                    onChange={this.handleTheaterChange}
                                    isClearable
                                    isDisabled={!selectedCinema || theaters.length === 0}
                                    placeholder={selectedCinema ? "-- Chọn Phòng Chiếu --" : "Vui lòng chọn rạp trước"}
                                />
                            )}
                        </FormGroup>
                        {selectedTheater && (
                            <div className="sort-options">
                                <FormGroup>
                                    <Label for="sortField">Sắp Xếp Theo</Label>
                                    <Input
                                        type="select"
                                        name="sortField"
                                        id="sortField"
                                        value={sortField}
                                        onChange={(e) => this.setState({ sortField: e.target.value }, this.fetchShowtimes)}
                                    >
                                        <option value="start_time">Thời Gian Bắt Đầu</option>
                                        <option value="price">Giá</option>
                                        {/* Thêm các tùy chọn sắp xếp khác nếu cần */}
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="sortOrder">Thứ Tự</Label>
                                    <Input
                                        type="select"
                                        name="sortOrder"
                                        id="sortOrder"
                                        value={sortOrder}
                                        onChange={(e) => this.setState({ sortOrder: e.target.value.toUpperCase() }, this.fetchShowtimes)}
                                    >
                                        <option value="ASC">Tăng Dần</option>
                                        <option value="DESC">Giảm Dần</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        )}
                    </Form>

                    {/* Nút Tạo Suất Chiếu Mới */}
                    {selectedTheater && (
                        <div className="actions">
                            <Button color="primary" onClick={this.openCreateModal}>Thêm Suất Chiếu Mới</Button>
                        </div>
                    )}

                    {/* Tìm kiếm suất chiếu */}
                    {selectedTheater && (
                        <Form className="search-form">
                            <FormGroup>
                                <Label for="search">Tìm kiếm</Label>
                                <Input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="Tìm kiếm suất chiếu theo phim hoặc trạng thái"
                                    value={search}
                                    onChange={this.handleSearchChange}
                                />
                            </FormGroup>
                        </Form>
                    )}

                    {/* Bảng danh sách suất chiếu */}
                    {selectedTheater && (
                        <div className="showtimes-table">
                            {isLoadingShowtimes ? (
                                <div className="loading-spinner">
                                    <Spinner color="primary" />
                                </div>
                            ) : (
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Phim</th>
                                            <th>Thời Gian Bắt Đầu</th>
                                            <th>Thời Gian Kết Thúc</th>
                                            <th>Giá (VNĐ)</th> {/* Thêm cột Giá */}
                                            <th>Trạng Thái</th>
                                            <th>Hành Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showtimes.length > 0 ? (
                                            showtimes.map((showtime, index) => (
                                                <tr key={showtime.id}>
                                                    <td>{(currentPage - 1) * limit + index + 1}</td>
                                                    <td>{showtime.movie}</td>
                                                    <td>{new Date(showtime.start_time).toLocaleString()}</td>
                                                    <td>{new Date(showtime.end_time).toLocaleString()}</td>
                                                    <td>{Number(showtime.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td> {/* Hiển thị Giá */}
                                                    <td>{showtime.status}</td>
                                                    <td>
                                                        <Button color="warning" size="sm" onClick={() => this.openEditModal(showtime)}>Sửa</Button>{' '}
                                                        <Button color="danger" size="sm" onClick={() => this.handleDeleteShowtime(showtime.id)}>Xóa</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7">Không có suất chiếu nào.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    )}

                    {/* Phân trang */}
                    {selectedTheater && pageCount > 1 && (
                        <div className="pagination-container">
                            <ReactPaginate
                                previousLabel={'«'}
                                nextLabel={'»'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={totalPages}
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

                    {/* Chọn số suất chiếu trên mỗi trang */}
                    {selectedTheater && (
                        <div className="limit-selector">
                            <Label for="limit">Số suất chiếu trên mỗi trang:</Label>{' '}
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
                    )}

                    {/* Modal tạo mới/chỉnh sửa suất chiếu */}
                    <Modal isOpen={isModalOpen} toggle={this.closeModal} size="lg">
                        <ModalHeader toggle={this.closeModal}>
                            {isEditMode ? 'Chỉnh Sửa Suất Chiếu' : 'Thêm Suất Chiếu Mới'}
                        </ModalHeader>
                        <ModalBody>
                            <ShowtimeForm
                                showtime={selectedShowtime}
                                theaterId={selectedTheater ? selectedTheater.value : null}
                                onSave={this.handleSaveShowtime}
                                onCancel={this.closeModal}
                                isEditMode={isEditMode}
                            />
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }
    export default SelectShowtimes;
