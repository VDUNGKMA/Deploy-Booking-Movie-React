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
            previewPoster: '', // Lưu trữ URL ảnh xem trước
            previewTrailer: '', // Lưu trữ URL video xem trước
            isLoading: false
        };
    }

    // Lấy danh sách phim khi component được mount
    async componentDidMount() {
        try {
            let response = await getAllMoviesApi();
            console.log("check res getallapi", response)
            if (response && response.data) {
                this.setState({
                    movies: response.data.movies.reverse(),
                });
            }
            // Lấy danh sách thể loại
            let genreResponse = await getAllGenresApi(); // Hàm này bạn cần định nghĩa trong userService
            if (genreResponse && genreResponse.data) {
                this.setState({
                    genres: genreResponse.data,
                });
            }
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu');
        }
    }
    getGenreOptions = () => {
        return this.state.genres.map((genre) => ({
            value: genre.id,
            label: genre.genre_name,
        }));
    };

    // Mở modal chỉnh sửa
    handleEditMovie = (movie) => {
        const formattedReleaseDate = movie.release_date.split('T')[0];

        // Chuyển đổi danh sách thể loại thành định dạng cho react-select
        const selectedGenres = movie.genres
            ? movie.genres.map((genre) => ({
                value: genre.id,
                label: genre.genre_name,
            }))
            : [];

        this.setState({
            isEditModalOpen: true,
            selectedMovie: {
                ...movie,
                release_date: formattedReleaseDate,
                genres: selectedGenres, // Lưu danh sách thể loại đã chọn
            },
            previewPoster: movie.poster_url,
            previewTrailer: movie.trailer_url,
        });
    };

    handleGenreChange = (selectedOptions) => {
        this.setState({
            selectedMovie: {
                ...this.state.selectedMovie,
                genres: selectedOptions || [],
            },
        });
    };


    // Đóng modal chỉnh sửa
    closeModal = () => {
        this.setState({
            isEditModalOpen: false,
            selectedMovie: null,
            previewPoster: '',
            previewTrailer: '',
        });
    };

    // Xử lý thay đổi dữ liệu trong form chỉnh sửa
    handleInputChange = (e, field) => {
        let movieCopy = { ...this.state.selectedMovie };
        movieCopy[field] = e.target.value;
        this.setState({
            selectedMovie: movieCopy,
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

    // Xử lý khi lưu thay đổi
    handleSaveChanges = async () => {
        const { selectedMovie } = this.state;
        this.setState({ isLoading: true });
        try {
            let formData = new FormData();
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

            // Lấy danh sách ID thể loại
            const genreIds = selectedMovie.genres.map((genre) => genre.value);
            formData.append('genres', JSON.stringify(genreIds));

            let response = await updateMovieApi(selectedMovie.id, formData);
            console.log("check res update", response)
            if (response && response.status === 'success') {
                this.setState({ isLoading: false })
                this.setState((prevState) => ({
                    movies: prevState.movies.map((movie) =>
                        movie.id === selectedMovie.id
                            ? {
                                ...selectedMovie, genres: response.data.genres,
                                poster_url: response.data.poster_url
                            }
                            : movie
                    ),
                }));
                this.closeModal();
                toast.success('Cập nhật phim thành công');


            } else {
                toast.error('Lỗi khi cập nhật phim');
            }
        } catch (error) {
            toast.error('Lỗi khi gọi API cập nhật phim');
        }
    };


    // Thêm hàm handleDeleteMovie vào lớp ManageMovie
    handleDeleteMovie = async (movieId) => {
        try {
            // Gọi API để xóa phim
            let response = await deleteMovieApi(movieId);
            if (response && response.status === 'success') {
                toast.success('Xóa phim thành công');
                // Cập nhật lại danh sách phim trong state
                this.setState((prevState) => ({
                    movies: prevState.movies.filter((movie) => movie.id !== movieId),
                }));
            } else {
                toast.error('Lỗi khi xóa phim');
            }
        } catch (error) {
            toast.error('Lỗi khi gọi API xóa phim');
        }
    };

    render() {
        const { movies, isEditModalOpen, selectedMovie, previewPoster, previewTrailer, isLoading } = this.state;

        return (
            <div className="manage-movie-container">
                <h2>Danh sách các phim</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Phim</th>
                            <th>Ngày Bắt Đầu</th>
                            <th>Thời lượng</th>
                            <th>Đạo diễn</th>
                            <th>Poster</th>
                            <th>Thể Loại</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies && movies.length > 0 ? (
                            movies.map((movie, index) => (
                                <tr key={index}>
                                    <td>{movie.id}</td>
                                    <td>{movie.title}</td>
                                    <td>{movie.release_date.split('T')[0]}</td>
                                    <td>{movie.duration}</td>
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
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => this.handleEditMovie(movie)}
                                        >
                                            <i className="fa fa-edit"></i> Chỉnh sửa
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.handleDeleteMovie(movie.id)}
                                        >
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

                {/* Modal chỉnh sửa phim */}
                {selectedMovie && (
                    
                    <Modal isOpen={isEditModalOpen} toggle={this.closeModal}>
                        <ModalHeader toggle={this.closeModal}>Chỉnh sửa phim</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        value={selectedMovie.title}
                                        onChange={(e) => this.handleInputChange(e, 'title')}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        type="textarea"
                                        id="description"
                                        value={selectedMovie.description}
                                        onChange={(e) => this.handleInputChange(e, 'description')}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="releaseDate">Release Date</Label>
                                    <Input
                                        type="date"
                                        id="releaseDate"
                                        value={selectedMovie.release_date}
                                        onChange={(e) => this.handleInputChange(e, 'release_date')}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="duration">Duration</Label>
                                    <Input
                                        type="number"
                                        id="duration"
                                        value={selectedMovie.duration}
                                        onChange={(e) => this.handleInputChange(e, 'duration')}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="director">Director</Label>
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
                          
                            <Button color="secondary" onClick={this.closeModal}>
                                Hủy
                            </Button>
                            <Button color="primary" onClick={this.handleSaveChanges}>
                                Lưu thay đổi
                                {isLoading &&
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                }
                            </Button>
                           
                            
                        </ModalFooter>
                    </Modal>
                    
                )}
               
            </div>
        );
    }
}

export default withRouter(ManageMovie);
