import React, { Component } from 'react';
import { getAllGenresApi, deleteGenreApi } from '../../../services/userService'; // Import deleteGenreApi
import { toast } from 'react-toastify';
import './ManageGenre.scss';
import EditGenreModal from './EditGenreModal'; // Import modal component

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
                toast.error('Failed to fetch genres');
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred');
        }
    }

    handleEditGenre = (genre) => {
        this.setState({
            isModalOpen: true,
            selectedGenre: genre,
            isNewGenre: false, // Not a new genre, it's editing
        });
    }

    handleAddNewGenre = () => {
        this.setState({
            isModalOpen: true,
            selectedGenre: { genre_name: '' }, // Set an empty genre object for the modal
            isNewGenre: true, // Indicate that this is for adding a new genre
        });
    }

    handleDeleteGenre = async (genreId) => {
        try {
            const response = await deleteGenreApi(genreId); // Call the delete API
            if (response.status !== 404) {
                // Remove the deleted genre from state
                this.setState({
                    genres: this.state.genres.filter((genre) => genre.id !== genreId),
                });
                toast.success('Deleted genre success');
            } else {
                toast.error('Failed to delete genre');
            }
        } catch (error) {
            toast.error('Error deleting genre: ' + error.message);
        }
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    }

    handleSaveGenre = (updatedGenre) => {
        if (this.state.isNewGenre) {
            // Adding a new genre
            this.setState({
                genres: [...this.state.genres, updatedGenre], // Add the new genre to the list
                isModalOpen: false,
            });
            toast.success('Genre added successfully!');
        } else {
            // Editing an existing genre
            const updatedGenres = this.state.genres.map((genre) =>
                genre.id === updatedGenre.id ? updatedGenre : genre
            );
            this.setState({
                genres: updatedGenres,
                isModalOpen: false,
            });
            toast.success('Genre updated successfully!');
        }
    }

    render() {
        const { genres, isModalOpen, selectedGenre } = this.state;

        return (
            <div className="genres-list-container">
                <div className="title">
                    <button className="btn btn-success add-genre-btn" onClick={this.handleAddNewGenre}>
                        Add New Genre
                    </button>
                    <h2>Danh sách thể loại phim mới nhất</h2>
                </div>
                <table className="table-genres">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Thể Loại</th>
                            <th>Actions</th>
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
                        isNewGenre={this.state.isNewGenre} // Pass to modal if it's a new genre
                    />
                )}
            </div>
        );
    }
}

export default GenresList;
