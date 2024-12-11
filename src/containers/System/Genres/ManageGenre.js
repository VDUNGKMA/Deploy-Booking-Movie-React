import React, { Component } from 'react';
import { getAllGenresApi, deleteGenreApi } from '../../../services/userService';
import { toast } from 'react-toastify';
import './ManageGenre.scss';
import EditGenreModal from './EditGenreModal';

class GenresList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            isModalOpen: false,
            selectedGenre: null,
            isNewGenre: false, // To differentiate between adding a new genre and editing an existing one
        };
    }

    async componentDidMount() {
        try {
            const response = await getAllGenresApi();
            if (response && response.status === 'success') {
                this.setState({
                    genres: response.data,
                });
            } else {
                toast.error('Không thể tải danh sách thể loại');
            }
        } catch (error) {
            toast.error(error.message || 'Đã xảy ra lỗi');
        }
    }

    handleEditGenre = (genre) => {
        this.setState({
            isModalOpen: true,
            selectedGenre: genre,
            isNewGenre: false,
        });
    }

    handleAddNewGenre = () => {
        this.setState({
            isModalOpen: true,
            selectedGenre: { genre_name: '' },
            isNewGenre: true,
        });
    }

    handleDeleteGenre = async (genreId) => {
        try {
            const response = await deleteGenreApi(genreId);
            if (response.status !== 404) {
                this.setState({
                    genres: this.state.genres.filter((genre) => genre.id !== genreId),
                });
                toast.success('Xóa thể loại thành công');
            } else {
                toast.error('Xóa thể loại thất bại');
            }
        } catch (error) {
            toast.error('Lỗi khi xóa thể loại: ' + error.message);
        }
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    }

    handleSaveGenre = (updatedGenre) => {
        if (this.state.isNewGenre) {
            // Adding a new genre
            this.setState({
                genres: [...this.state.genres, updatedGenre],
                isModalOpen: false,
            });
            toast.success('Thêm thể loại thành công!');
        } else {
            // Editing an existing genre
            const updatedGenres = this.state.genres.map((genre) =>
                genre.id === updatedGenre.id ? updatedGenre : genre
            );
            this.setState({
                genres: updatedGenres,
                isModalOpen: false,
            });
            toast.success('Cập nhật thể loại thành công!');
        }
    }

    render() {
        const { genres, isModalOpen, selectedGenre } = this.state;

        return (
            <div className="genres-list-container">
                <div className="title">
                    <button className="btn btn-success add-genre-btn" onClick={this.handleAddNewGenre}>
                        Thêm Thể Loại Mới
                    </button>
                    <h2>Danh Sách Thể Loại Phim</h2>
                </div>
                <table className="table-genres">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Thể Loại</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres.map((genre) => (
                            <tr key={genre.id}>
                                <td>{genre.id}</td>
                                <td>{genre.genre_name}</td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => this.handleEditGenre(genre)}
                                    >
                                        <i className="far fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => this.handleDeleteGenre(genre.id)}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isModalOpen && (
                    <EditGenreModal
                        genre={selectedGenre}
                        onClose={this.handleCloseModal}
                        onSave={this.handleSaveGenre}
                        isNewGenre={this.state.isNewGenre}
                    />
                )}
            </div>
        );
    }
}

export default GenresList;
