import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateMovie.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
import { createMovieApi, getAllGenresApi } from '../../../../services/userService'; // Import the movie API service
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'; // Eye icon from FontAwesome
import Select from 'react-select';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            release_date: '',
            duration: '',
            director: '',
            rating: '',
            poster: null, // Store file for image
            trailer: null, // Store file for video
            descriptionHTML: '',
            descriptionMarkdown: '',
            showModal: false, // Controls modal visibility
            isLoading: false, // State để kiểm soát trạng thái loading
            genres: [], // Danh sách các thể loại từ API
            selectedGenres: [], // Các thể loại được chọn
        };
    }

    // Lấy danh sách thể loại khi component được mount
    async componentDidMount() {
        try {
            let res = await getAllGenresApi();
            console.log("check genres api:", res)
            if (res && res.status === 'success') {
                // Chuyển đổi dữ liệu thành định dạng phù hợp cho react-select
                const genres = res.data.map((genre) => ({
                    value: genre.id,
                    label: genre.genre_name,
                }));
                this.setState({ genres });
            } else {
                toast.error('Failed to fetch genres.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error while fetching genres.');
        }
    }

    // Handle markdown editor change
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };

    // Handle image file change
    handleOnchangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            this.setState({
                poster: file, // Store the file object
            });
        }
    };

    // Handle video file change
    handleOnchangeVideo = (event) => {
        let file = event.target.files[0];
        if (file) {
            this.setState({
                trailer: file, // Store the file object
            });
        }
    };

    // Handle input change for form fields
    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    // Handle select change
    handleChangeSelect = (selectedGenres) => {
        this.setState({ selectedGenres });
    };

    // Toggle modal for viewing image
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    // Handle save new movie
    handleSaveNewMovie = async () => {
        const {
            title,
            descriptionHTML,
            release_date,
            duration,
            director,
            rating,
            poster, // Holds image file
            trailer, // Holds video file
            selectedGenres,
        } = this.state;

        // Kiểm tra nếu bất kỳ trường nào trống
        if (
            !title ||
            !descriptionHTML ||
            !release_date ||
            !duration ||
            !director ||
            !rating ||
            !poster ||
            !trailer ||
            selectedGenres.length === 0 // Kiểm tra xem có chọn ít nhất một thể loại hay không
        ) {
            toast.error('All fields are required. Please fill out all the fields.');
            return; // Dừng lại nếu có trường nào trống
        }

        // Bật trạng thái loading
        this.setState({ isLoading: true });

        // Lấy danh sách các ID thể loại đã chọn
        const genreIds = selectedGenres.map((genre) => genre.value);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', descriptionHTML);
        formData.append('release_date', release_date);
        formData.append('duration', Number(duration));
        formData.append('director', director);
        formData.append('rating', Number(rating));
        formData.append('poster', poster); // Append image file
        formData.append('trailer', trailer); // Append video file
        formData.append('genres', JSON.stringify(genreIds)); // Gửi danh sách thể loại dưới dạng chuỗi JSON
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        try {
            let res = await createMovieApi(formData); // Call the API
            if (res && res.status === 'success') {
                toast.success('New movie added successfully!');
                this.setState({
                    title: '',
                    description: '',
                    release_date: '',
                    duration: '',
                    director: '',
                    rating: '',
                    poster: null,
                    trailer: null,
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    selectedGenres: [],
                    isLoading: false, // Tắt loading khi hoàn thành
                });
            } else {
                toast.error('Something went wrong. Please try again.');
                this.setState({ isLoading: false }); // Tắt loading khi gặp lỗi
            }
        } catch (error) {
            console.log(error);
            toast.error('Error while adding movie.');
            this.setState({ isLoading: false }); // Tắt loading khi gặp lỗi
        }
    };

    render() {
        const { poster, trailer, showModal, isLoading } = this.state;

        return (
            <div className="manage-movie-container">
                <div className="mm-title">Manage Movies</div>

                <div className="add-new-movie row">
                    <div className="col-6 form-group">
                        <label>Movie Title</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.title}
                            onChange={(event) => this.handleOnchangeInput(event, 'title')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Director</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.director}
                            onChange={(event) => this.handleOnchangeInput(event, 'director')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Release Date</label>
                        <input
                            className="form-control"
                            type="date"
                            value={this.state.release_date}
                            onChange={(event) => this.handleOnchangeInput(event, 'release_date')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Duration (in minutes)</label>
                        <input
                            className="form-control"
                            type="number"
                            min="0"
                            value={this.state.duration}
                            onChange={(event) => this.handleOnchangeInput(event, 'duration')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Rating</label>
                        <input
                            className="form-control"
                            type="number"
                            step="0.1"
                            min="0"
                            value={this.state.rating}
                            onChange={(event) => this.handleOnchangeInput(event, 'rating')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Genres</label>
                        <Select
                            value={this.state.selectedGenres}
                            onChange={this.handleChangeSelect}
                            options={this.state.genres}
                            isMulti={true}
                            placeholder="Select genres..."
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Movie Poster</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={(event) => this.handleOnchangeImage(event)}
                        />
                        {poster && (
                            <div className="image-preview">
                                <img src={URL.createObjectURL(poster)} alt="Poster Preview" />
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="icon-eye"
                                    onClick={this.toggleModal}
                                />
                            </div>
                        )}
                    </div>

                    <div className="col-6 form-group">
                        <label>Trailer Video</label>
                        <input
                            className="form-control"
                            type="file"
                            accept="video/*"
                            onChange={(event) => this.handleOnchangeVideo(event)}
                        />
                        {trailer && (
                            <div className="video-preview">
                                <video controls src={URL.createObjectURL(trailer)} width="300"></video>
                            </div>
                        )}
                    </div>

                    <div className="col-12 ">
                        <label>
                            <b>Description</b>
                        </label>
                        <MdEditor
                            value={this.state.descriptionMarkdown}
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />

                    </div>

                    <div className="col-12">
                        <button
                            className="btn-save-movie"
                            onClick={this.handleSaveNewMovie}
                            disabled={isLoading} // Disable button khi đang loading
                        >
                            {isLoading ? 'Saving...' : 'Save Movie'}
                        </button>
                    </div>
                </div>

                {showModal && poster && (
                    <div className="image-modal">
                        <div className="image-modal-content">
                            <span className="close-modal" onClick={this.toggleModal}>
                                &times;
                            </span>
                            <img src={URL.createObjectURL(poster)} alt="Full Poster" className="full-image" />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMovie);
