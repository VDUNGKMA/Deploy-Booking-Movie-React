// // src/containers/System/Admin/ShowtimeForm.js

// import React, { Component } from 'react';
// import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
// import PropTypes from 'prop-types';

// class ShowtimeForm extends Component {
//     constructor(props) {
//         super(props);
//         const { showtime } = this.props;
//         this.state = {
//             theater_id: showtime ? showtime.theater_id : '',
//             movie_id: showtime ? showtime.movie_id : '',
//             start_time: showtime ? this.formatDate(showtime.start_time) : '',
//             end_time: showtime ? this.formatDate(showtime.end_time) : '',
//             status: showtime ? showtime.status : 'Scheduled',
//             errors: {}
//         };
//     }

//     // Hàm định dạng datetime-local
//     formatDate = (date) => {
//         const d = new Date(date);
//         const pad = (n) => n < 10 ? '0' + n : n;
//         return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
//     };

//     handleChange = (e) => {
//         const { name, value } = e.target;
//         this.setState({ [name]: value });
//     };

//     validate = () => {
//         const { theater_id, movie_id, start_time, end_time } = this.state;
//         const errors = {};
//         if (!theater_id) errors.theater_id = 'Vui lòng chọn phòng chiếu.';
//         if (!movie_id) errors.movie_id = 'Vui lòng chọn phim.';
//         if (!start_time) errors.start_time = 'Vui lòng nhập thời gian bắt đầu.';
//         if (!end_time) errors.end_time = 'Vui lòng nhập thời gian kết thúc.';
//         if (start_time && end_time && new Date(start_time) >= new Date(end_time)) {
//             errors.end_time = 'Thời gian kết thúc phải sau thời gian bắt đầu.';
//         }
//         this.setState({ errors });
//         return Object.keys(errors).length === 0;
//     };

//     handleSubmit = (e) => {
//         e.preventDefault();
//         if (this.validate()) {
//             const { theater_id, movie_id, start_time, end_time, status } = this.state;
//             this.props.onSave({
//                 theater_id,
//                 movie_id,
//                 start_time: new Date(start_time),
//                 end_time: new Date(end_time),
//                 status
//             });
//         }
//     };

//     render() {
//         const { showtime, theaterId, onCancel } = this.props;
//         const { theater_id, movie_id, start_time, end_time, status, errors } = this.state;

//         return (
//             <Form onSubmit={this.handleSubmit}>
//                 <FormGroup>
//                     <Label for="movie_id">Phim</Label>
//                     <Input
//                         type="select"
//                         name="movie_id"
//                         id="movie_id"
//                         value={movie_id}
//                         onChange={this.handleChange}
//                         invalid={!!errors.movie_id}
//                         required
//                     >
//                         <option value="">-- Chọn Phim --</option>
//                         {/* Giả sử bạn có danh sách phim trong props hoặc gọi API để lấy */}
//                         {/* Ví dụ: */}
//                         {this.props.movies && this.props.movies.map(movie => (
                            
//                             <option key={movie.id} value={movie.id}>{movie.title}</option>
//                             && console.log("check id:", movie.id)
//                         ))}
                        
//                     </Input>
//                     {errors.movie_id && <FormFeedback>{errors.movie_id}</FormFeedback>}
//                 </FormGroup>

//                 <FormGroup>
//                     <Label for="theater_id">Phòng Chiếu</Label>
//                     <Input
//                         type="select"
//                         name="theater_id"
//                         id="theater_id"
//                         value={theater_id}
//                         onChange={this.handleChange}
//                         invalid={!!errors.theater_id}
//                         required
//                         disabled={!!theaterId} // Nếu đã chọn phòng chiếu, không thể thay đổi
//                     >
//                         <option value="">-- Chọn Phòng Chiếu --</option>
//                         {/* Giả sử bạn có danh sách phòng chiếu trong props hoặc gọi API để lấy */}
//                         {/* Ví dụ: */}
//                         {this.props.theaters && this.props.theaters.map(theater => (
//                             <option key={theater.id} value={theater.id}>{theater.name}</option>
//                         ))}
//                     </Input>
//                     {errors.theater_id && <FormFeedback>{errors.theater_id}</FormFeedback>}
//                 </FormGroup>

//                 <FormGroup>
//                     <Label for="start_time">Thời Gian Bắt Đầu</Label>
//                     <Input
//                         type="datetime-local"
//                         name="start_time"
//                         id="start_time"
//                         value={start_time}
//                         onChange={this.handleChange}
//                         invalid={!!errors.start_time}
//                         required
//                     />
//                     {errors.start_time && <FormFeedback>{errors.start_time}</FormFeedback>}
//                 </FormGroup>

//                 <FormGroup>
//                     <Label for="end_time">Thời Gian Kết Thúc</Label>
//                     <Input
//                         type="datetime-local"
//                         name="end_time"
//                         id="end_time"
//                         value={end_time}
//                         onChange={this.handleChange}
//                         invalid={!!errors.end_time}
//                         required
//                     />
//                     {errors.end_time && <FormFeedback>{errors.end_time}</FormFeedback>}
//                 </FormGroup>

//                 <FormGroup>
//                     <Label for="status">Trạng Thái</Label>
//                     <Input
//                         type="select"
//                         name="status"
//                         id="status"
//                         value={status}
//                         onChange={this.handleChange}
//                     >
//                         <option value="Scheduled">Đã Đặt Lịch</option>
//                         <option value="Cancelled">Đã Hủy</option>
//                         <option value="Completed">Đã Hoàn Thành</option>
//                     </Input>
//                 </FormGroup>

//                 <Button color="primary" type="submit">
//                     {this.props.isEditMode ? 'Cập Nhật' : 'Thêm Mới'}
//                 </Button>{' '}
//                 <Button color="secondary" onClick={onCancel}>Hủy</Button>
//             </Form>
//         );
//     }
// }
//     ShowtimeForm.propTypes = {
//         showtime: PropTypes.object,
//         theaterId: PropTypes.number.isRequired,
//         onSave: PropTypes.func.isRequired,
//         onCancel: PropTypes.func.isRequired,
//         isEditMode: PropTypes.bool,
//         movies: PropTypes.array, // Danh sách phim
//         theaters: PropTypes.array, // Danh sách phòng chiếu
//     };

//     export default ShowtimeForm;
// src/containers/System/Admin/Showtime/ShowtimeForm.js

import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import { getAllMoviesApi } from '../../../../services/userService';

class ShowtimeForm extends Component {
    constructor(props) {
        super(props);
        const { showtime } = this.props;
        this.state = {
            movie_id: showtime ? showtime.movie_id : '',
            start_time: showtime ? this.formatDate(showtime.start_time) : '',
            end_time: showtime ? this.formatDate(showtime.end_time) : '',
            status: showtime ? showtime.status : 'Scheduled',
            movies: [], // Danh sách phim, bạn cần lấy từ API
            errors: {}
        };
    }

    componentDidMount() {
        this.fetchMovies();
    }

    // Hàm định dạng datetime-local
    formatDate = (date) => {
        const d = new Date(date);
        const pad = (n) => n < 10 ? '0' + n : n;
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    // Hàm lấy danh sách phim
    fetchMovies = async () => {
        try {
            // Giả sử bạn có access to getMoviesApi
            const response = await getAllMoviesApi();
            if (response && response.status === 'success') {
                const movies = response.data.movies.map(movie => ({
                    value: movie.id,
                    label: movie.title,
                }));
                this.setState({ movies });
            } else {
                toast.error('Lỗi khi lấy danh sách phim.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Lỗi khi gọi API lấy danh sách phim.');
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    validate = () => {
        const { movie_id, start_time, end_time } = this.state;
        const errors = {};
        if (!movie_id) errors.movie_id = 'Vui lòng chọn phim.';
        if (!start_time) errors.start_time = 'Vui lòng nhập thời gian bắt đầu.';
        if (!end_time) errors.end_time = 'Vui lòng nhập thời gian kết thúc.';
        if (start_time && end_time && new Date(start_time) >= new Date(end_time)) {
            errors.end_time = 'Thời gian kết thúc phải sau thời gian bắt đầu.';
        }
        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            const { movie_id, theaterId, start_time, end_time, status } = this.state;
            const showtimeData = {
                movie_id,
                theater_id: this.props.theaterId,
                start_time: new Date(start_time),
                end_time: new Date(end_time),
                status
            };
            this.props.onSave(showtimeData);
        }
    };

    render() {
        const { movies, movie_id, start_time, end_time, status, errors } = this.state;
        const { onCancel, isEditMode, theaterId } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="movie_id">Phim</Label>
                    <Input
                        type="select"
                        name="movie_id"
                        id="movie_id"
                        value={movie_id}
                        onChange={this.handleChange}
                        invalid={!!errors.movie_id}
                        required
                    >
                        <option value="">-- Chọn Phim --</option>
                        {movies.map(movie => (
                            <option key={movie.value} value={movie.value}>{movie.label}</option>
                        ))}
                    </Input>
                    {errors.movie_id && <FormFeedback>{errors.movie_id}</FormFeedback>}
                </FormGroup>

                <FormGroup>
                    <Label for="start_time">Thời Gian Bắt Đầu</Label>
                    <Input
                        type="datetime-local"
                        name="start_time"
                        id="start_time"
                        value={start_time}
                        onChange={this.handleChange}
                        invalid={!!errors.start_time}
                        required
                    />
                    {errors.start_time && <FormFeedback>{errors.start_time}</FormFeedback>}
                </FormGroup>

                <FormGroup>
                    <Label for="end_time">Thời Gian Kết Thúc</Label>
                    <Input
                        type="datetime-local"
                        name="end_time"
                        id="end_time"
                        value={end_time}
                        onChange={this.handleChange}
                        invalid={!!errors.end_time}
                        required
                    />
                    {errors.end_time && <FormFeedback>{errors.end_time}</FormFeedback>}
                </FormGroup>

                <FormGroup>
                    <Label for="status">Trạng Thái</Label>
                    <Input
                        type="select"
                        name="status"
                        id="status"
                        value={status}
                        onChange={this.handleChange}
                    >
                        <option value="Scheduled">Đã Đặt Lịch</option>
                        <option value="Cancelled">Đã Hủy</option>
                        <option value="Completed">Đã Hoàn Thành</option>
                    </Input>
                </FormGroup>

                <Button color="primary" type="submit">
                    {isEditMode ? 'Cập Nhật' : 'Thêm Mới'}
                </Button>{' '}
                <Button color="secondary" onClick={onCancel}>Hủy</Button>
            </Form>
        );
    }
}
    ShowtimeForm.propTypes = {
        showtime: PropTypes.object,
        theaterId: PropTypes.number.isRequired,
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        isEditMode: PropTypes.bool,
    };

    export default ShowtimeForm;
