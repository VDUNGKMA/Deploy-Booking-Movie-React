import React, { Component } from 'react';
import { updateGenreApi, createGenreApi } from '../../../services/userService';
import './EditGenreModal.scss';

class EditGenreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.genre.genre_name || '', // Initialize with genre_name from props
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.genre.id !== this.props.genre.id) {
            this.setState({ name: this.props.genre.genre_name || '' });
        }
    }

    handleInputChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleSave = async () => {
        const { genre, onSave, isNewGenre } = this.props;
        const updatedGenreData = {
            genre_name: this.state.name, // Use genre_name for both add and edit
        };

        try {
            let response;
            if (isNewGenre) {
                // Call the API to create a new genre
                response = await createGenreApi(updatedGenreData);
            } else {
                // Call the API to update an existing genre
                response = await updateGenreApi(genre.id, updatedGenreData);
            }

            if (response.status === "success") {
                onSave(response.data); // Pass the new/updated genre back to the parent component
                console.log('Thể loại đã được lưu thành công!');
            } else {
                console.error('Lưu thể loại thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi lưu thể loại:', error);
        }
    }

    render() {
        const { onClose, isNewGenre } = this.props;

        return (
            <div className="modal-overlay">
                <div className="modal-edit-content">
                    <div className="modal-header">
                        <h3>{isNewGenre ? 'Thêm Thể Loại Mới' : 'Chỉnh Sửa Thể Loại'}</h3>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Tên Thể Loại</label>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={this.handleSave}>
                            {isNewGenre ? 'Thêm Mới' : 'Lưu'}
                        </button>
                        <button className="btn btn-danger" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditGenreModal;
