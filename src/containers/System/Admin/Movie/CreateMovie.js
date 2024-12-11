import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateMovie.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
import { createMovieApi, getAllGenresApi } from '../../../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

const mdParser = new MarkdownIt();

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
            poster: null,
            trailer: null,
            descriptionHTML: '',
            descriptionMarkdown: '',
            showModal: false,
            isLoading: false,
            genres: [],
            selectedGenres: [],
        };
    }

    async componentDidMount() {
        try {
            let res = await getAllGenresApi();
            if (res && res.status === 'success') {
                const genres = res.data.map((genre) => ({
                    value: genre.id,
                    label: genre.genre_name,
                }));
                this.setState({ genres });
            } else {
                toast.error('Không thể tải danh sách thể loại.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Lỗi khi tải danh sách thể loại.');
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };

    handleOnchangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            this.setState({
                poster: file,
            });
        }
    };

    handleOnchangeVideo = (event) => {
        let file = event.target.files[0];
        if (file) {
            this.setState({
                trailer: file,
            });
        }
    };

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleChangeSelect = (selectedGenres) => {
        this.setState({ selectedGenres });
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    handleSaveNewMovie = async () => {
        const {
            title,
            descriptionHTML,
            release_date,
            duration,
            director,
            rating,
            poster,
            trailer,
            selectedGenres,
        } = this.state;

        if (
            !title ||
            !descriptionHTML ||
            !release_date ||
            !duration ||
            !director ||
            !rating ||
            !poster ||
            !trailer ||
            selectedGenres.length === 0
        ) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        this.setState({ isLoading: true });

        const genreIds = selectedGenres.map((genre) => genre.value);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', descriptionHTML);
        formData.append('release_date', release_date);
        formData.append('duration', Number(duration));
        formData.append('director', director);
        formData.append('rating', Number(rating));
        formData.append('poster', poster);
        formData.append('trailer', trailer);
        formData.append('genres', JSON.stringify(genreIds));

        try {
            let res = await createMovieApi(formData);
            if (res && res.status === 'success') {
                toast.success('Phim mới đã được thêm thành công!');
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
                    isLoading: false,
                });
            } else {
                toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.log(error);
            toast.error('Lỗi khi thêm phim.');
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { poster, trailer, showModal, isLoading } = this.state;

        return (
            <div className="manage-movie-container">
                <div className="mm-title">Quản Lý Phim</div>

                <div className="add-new-movie row">
                    <div className="col-6 form-group">
                        <label>Tên Phim</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.title}
                            onChange={(event) => this.handleOnchangeInput(event, 'title')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Đạo Diễn</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.director}
                            onChange={(event) => this.handleOnchangeInput(event, 'director')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Ngày Phát Hành</label>
                        <input
                            className="form-control"
                            type="date"
                            value={this.state.release_date}
                            onChange={(event) => this.handleOnchangeInput(event, 'release_date')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Thời Lượng (phút)</label>
                        <input
                            className="form-control"
                            type="number"
                            min="0"
                            value={this.state.duration}
                            onChange={(event) => this.handleOnchangeInput(event, 'duration')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Xếp Hạng</label>
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
                        <label>Thể Loại</label>
                        <Select
                            value={this.state.selectedGenres}
                            onChange={this.handleChangeSelect}
                            options={this.state.genres}
                            isMulti={true}
                            placeholder="Chọn thể loại..."
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Ảnh Bìa Phim</label>
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
                        <label>Trailer</label>
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

                    <div className="col-12 form-group">
                        <label>Mô Tả</label>
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
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang Lưu...' : 'Lưu Phim'}
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
