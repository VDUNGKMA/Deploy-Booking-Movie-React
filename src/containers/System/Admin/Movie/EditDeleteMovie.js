import React, { Component } from 'react';
import { getAllMoviesApi, deleteMovieApi, updateMovieApi, getAllGenresApi } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';

class ManageMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            genres: [],
            isEditModalOpen: false,
            selectedMovie: null,
            previewPoster: '',
            previewTrailer: '',
            isLoading: false,
            currentPage: 1,
            totalPages: 1,
            moviesPerPage: 5,
            searchQuery: '' // Track the search input
        };
    }

    // Fetch movies and genres when component mounts
    async componentDidMount() {
        await this.fetchMovies();
        await this.fetchGenres();
    }

    // Fetch movies based on current page and search query
    fetchMovies = async () => {
        const { currentPage, moviesPerPage, searchQuery } = this.state;
        try {
            const response = await getAllMoviesApi(currentPage, moviesPerPage, searchQuery);
            if (response && response.data) {
                this.setState({
                    movies: response.data.movies,
                    totalPages: response.data.totalPages
                });
            }
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu phim.');
        }
    };

    // Fetch genres
    fetchGenres = async () => {
        try {
            const response = await getAllGenresApi();
            if (response && response.data) {
                this.setState({
                    genres: response.data
                });
            }
        } catch (error) {
            toast.error('Lỗi khi lấy danh sách thể loại.');
        }
    };

    // Create genre options for react-select
    getGenreOptions = () => {
        return this.state.genres.map((genre) => ({
            value: genre.id,
            label: genre.genre_name
        }));
    };

    // Handle pagination
    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage }, this.fetchMovies);
    };

    // Open edit modal
    handleEditMovie = (movie) => {
        const formattedReleaseDate = movie.release_date.split('T')[0];
        const selectedGenres = movie.genres
            ? movie.genres.map((genre) => ({
                value: genre.id,
                label: genre.genre_name
            }))
            : [];
        this.setState({
            isEditModalOpen: true,
            selectedMovie: { ...movie, release_date: formattedReleaseDate, genres: selectedGenres },
            previewPoster: movie.poster_url,
            previewTrailer: movie.trailer_url
        });
    };

    // Close edit modal
    closeModal = () => {
        this.setState({
            isEditModalOpen: false,
            selectedMovie: null,
            previewPoster: '',
            previewTrailer: ''
        });
    };

    handleInputChange = (e, field) => {
        const movieCopy = { ...this.state.selectedMovie };
        movieCopy[field] = e.target.value;
        this.setState({ selectedMovie: movieCopy });
    };

    handleGenreChange = (selectedOptions) => {
        this.setState({
            selectedMovie: { ...this.state.selectedMovie, genres: selectedOptions || [] }
        });
    };
    handlePosterUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Hiển thị ảnh xem trước
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    previewPoster: reader.result,
                    selectedMovie: {
                        ...this.state.selectedMovie,
                        posterFile: file, // Lưu trữ tệp tin
                    },
                });
            };
            reader.readAsDataURL(file);
        }
    };
    // Xử lý upload video
    handleTrailerUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Hiển thị video xem trước
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    previewTrailer: reader.result,
                    selectedMovie: {
                        ...this.state.selectedMovie,
                        trailerFile: file, // Lưu trữ tệp tin
                    },
                });
            };
            reader.readAsDataURL(file);
        }
    };  
    // Handle search input change
    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    // Trigger search when search button is clicked
    handleSearchSubmit = () => {
        this.setState({ currentPage: 1 }, this.fetchMovies); // Reset to first page for a new search
    };

    // Save changes to movie
    handleSaveChanges = async () => {
        const { selectedMovie } = this.state;
        this.setState({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append('title', selectedMovie.title);
            formData.append('description', selectedMovie.description);
            formData.append('release_date', selectedMovie.release_date);
            formData.append('duration', selectedMovie.duration);
            formData.append('director', selectedMovie.director);
            formData.append('rating', selectedMovie.rating);
            if (selectedMovie.posterFile) {
                formData.append('poster', selectedMovie.posterFile);
            }
            if (selectedMovie.trailerFile) {
                formData.append('trailer', selectedMovie.trailerFile);
            }
            const genreIds = selectedMovie.genres.map((genre) => genre.value);
            formData.append('genres', JSON.stringify(genreIds));

            const response = await updateMovieApi(selectedMovie.id, formData);
            if (response && response.status === 'success') {
                this.setState((prevState) => ({
                    movies: prevState.movies.map((movie) =>
                        movie.id === selectedMovie.id
                            ? { ...selectedMovie, genres: response.data.genres, poster_url: response.data.poster_url }
                            : movie
                    ),
                    isLoading: false
                }));
                this.closeModal();
                toast.success('Cập nhật phim thành công');
            } else {
                toast.error('Lỗi khi cập nhật phim');
                this.setState({ isLoading: false });
            }
        } catch (error) {
            toast.error('Lỗi khi gọi API cập nhật phim');
            this.setState({ isLoading: false });
        }
    };

    // Delete a movie
    handleDeleteMovie = async (movieId) => {
        try {
            const response = await deleteMovieApi(movieId);
            if (response && response.status === 'success') {
                toast.success('Xóa phim thành công');
                this.setState((prevState) => ({
                    movies: prevState.movies.filter((movie) => movie.id !== movieId)
                }));
            } else {
                toast.error('Lỗi khi xóa phim');
            }
        } catch (error) {
            toast.error('Lỗi khi gọi API xóa phim');
        }
    };

    renderPagination = () => {
        const { currentPage, totalPages } = this.state;
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`page-button ${i === currentPage ? 'active' : ''}`}
                    onClick={() => this.handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return <div className="pagination">{pages}</div>;
    };

    render() {
        const { movies, isEditModalOpen, selectedMovie, previewPoster, previewTrailer, isLoading, searchQuery } = this.state;

        return (
            <div className="manage-movie-container">
                <h2>Quản Lý Phim</h2>

                {/* Search Input */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên phim..."
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        className="form-control search-input"
                    />
                    <button onClick={this.handleSearchSubmit} className="btn btn-primary search-button">
                        Tìm Kiếm
                    </button>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Phim</th>
                            <th>Ngày Phát Hành</th>
                            <th>Thời Lượng</th>
                            <th>Đạo Diễn</th>
                            <th>Poster</th>
                            <th>Thể Loại</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies && movies.length > 0 ? (
                            movies.map((movie, index) => (
                                <tr key={index}>
                                    <td>{movie.id}</td>
                                    <td>{movie.title}</td>
                                    <td>{movie.release_date.split('T')[0]}</td>
                                    <td>{movie.duration} phút</td>
                                    <td>{movie.director}</td>
                                    <td>
                                        <img src={movie.poster_url} alt="Poster" style={{ width: '50px', height: '75px' }} />
                                    </td>
                                    <td>
                                        {movie.genres && movie.genres.length > 0
                                            ? movie.genres.map((genre) => genre.genre_name).join(', ')
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => this.handleEditMovie(movie)}>
                                            <i className="fa fa-edit"></i> Chỉnh Sửa
                                        </button>
                                        <button className="btn btn-danger" onClick={() => this.handleDeleteMovie(movie.id)}>
                                            <i className="fa fa-trash"></i> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">Không có phim nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {this.renderPagination()}

                {/* Edit Movie Modal */}
                {selectedMovie && (
                    <Modal isOpen={isEditModalOpen} toggle={this.closeModal}>
                        <ModalHeader toggle={this.closeModal}>Chỉnh Sửa Phim</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="title">Tên phim</Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        value={selectedMovie.title}
                                        onChange={(e) => this.handleInputChange(e, 'title')}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="description">Nội dung</Label>
                                    <Input
                                        type="textarea"
                                        id="description"
                                        value={selectedMovie.description}
                                        onChange={(e) => this.handleInputChange(e, 'description')}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="releaseDate">Ngày phát hành</Label>
                                    <Input
                                        type="date"
                                        id="releaseDate"
                                        value={selectedMovie.release_date}
                                        onChange={(e) => this.handleInputChange(e, 'release_date')}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="duration">Thời lượng</Label>
                                    <Input
                                        type="number"
                                        id="duration"
                                        value={selectedMovie.duration}
                                        onChange={(e) => this.handleInputChange(e, 'duration')}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="director">Đạo diễn</Label>
                                    <Input
                                        type="text"
                                        id="director"
                                        value={selectedMovie.director}
                                        onChange={(e) => this.handleInputChange(e, 'director')}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="rating">Rating</Label>
                                    <Input
                                        type="number"
                                        id="rating"
                                        value={selectedMovie.rating}
                                        onChange={(e) => this.handleInputChange(e, 'rating')}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="genres">Thể Loại</Label>
                                    <Select
                                        isMulti
                                        name="genres"
                                        options={this.getGenreOptions()}
                                        value={selectedMovie.genres}
                                        onChange={this.handleGenreChange}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder="Chọn thể loại..."
                                    />
                                </FormGroup>


                                <FormGroup>
                                    <Label for="posterUrl">Poster URL</Label>
                                    <Input type="file" onChange={this.handlePosterUpload} />
                                    {previewPoster && (
                                        <div>
                                            <img src={previewPoster} alt="Poster Preview" style={{ width: '100px', height: '150px' }} />
                                        </div>
                                    )}
                                </FormGroup>

                                <FormGroup>
                                    <Label for="trailerUrl">Trailer URL</Label>
                                    <Input type="file" accept="video/*" onChange={this.handleTrailerUpload} />
                                    {previewTrailer && (
                                        <div>
                                            <video controls style={{ width: '300px' }}>
                                                <source src={previewTrailer} type="video/mp4" />
                                                Trình duyệt của bạn không hỗ trợ thẻ video.
                                            </video>
                                        </div>
                                    )}
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.closeModal}>Hủy</Button>
                            <Button color="primary" onClick={this.handleSaveChanges} disabled={isLoading}>
                                {isLoading ? 'Đang Lưu...' : 'Lưu Thay Đổi'}
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </div>
        );
    }
}

export default withRouter(ManageMovie);
