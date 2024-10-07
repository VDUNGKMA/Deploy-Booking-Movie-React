import React, { useState, useEffect } from 'react';
import { fetchShowtimesByTheater, fetchSeatsByShowtime, fetchTheaterStatus } from '../../../services/userService';
import './TheaterDetails.scss'; // Import file SCSS cho giao diện

const TheaterDetails = ({ theater }) => {
    const [showtimes, setShowtimes] = useState([]);
    const [showtimeId, setShowtimeId] = useState('');
    const [seats, setSeats] = useState([]);
    const [status, setStatus] = useState({});
    const [isSeatMapModalOpen, setIsSeatMapModalOpen] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchShowtimes = async () => {
            if (theater.id) {
                const response = await fetchShowtimesByTheater(theater.id, today);
                setShowtimes(response);
            }
        };
        fetchShowtimes();
    }, [theater.id, today]);

    const handleShowtimeSelect = async (showtimeId) => {
        setShowtimeId(showtimeId);

        const seatsResponse = await fetchSeatsByShowtime(theater.id, showtimeId);
        setSeats(seatsResponse);

        const statusResponse = await fetchTheaterStatus(theater.id, showtimeId);
        setStatus(statusResponse);
    };

    const toggleSeatMapModal = () => {
        setIsSeatMapModalOpen(!isSeatMapModalOpen);
    };

    return (
        <div className="theater-details">
            <h3 className="theater-details__title">Chi tiết phòng chiếu: {theater.name}</h3>
            <div className="theater-details__controls">
                <label htmlFor="showtime-select">Chọn suất chiếu:</label>
                <select
                    id="showtime-select"
                    value={showtimeId}
                    onChange={(e) => handleShowtimeSelect(e.target.value)}
                >
                    <option value="">-- Chọn suất chiếu --</option>
                    {showtimes.map((showtime) => (
                        <option key={showtime.id} value={showtime.id}>
                            {new Date(showtime.start_time).toLocaleTimeString()} - {new Date(showtime.end_time).toLocaleTimeString()}
                        </option>
                    ))}
                </select>
            </div>

            {seats.length > 0 && (
                <div className="theater-details__seats">
                    <h4>Sơ đồ ghế:</h4>
                    <div className="seat-map-preview" onClick={toggleSeatMapModal}>
                        {/* Hiển thị sơ đồ ghế nhỏ, nhấp vào để mở modal */}
                        {seats.map((seat) => (
                            <div
                                key={seat.seatId}
                                className={`seat ${seat.isBooked ? 'seat--booked' : 'seat--available'}`}
                            >
                                {seat.row}-{seat.number}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {status && (
                <div className="theater-details__status">
                    <p>Tổng số ghế: <span>{status.totalSeats}</span></p>
                    <p>Số ghế đã đặt: <span>{status.bookedSeats}</span></p>
                    <p>Trạng thái phòng: <span>{status.isFull ? 'Đầy' : 'Còn chỗ'}</span></p>
                </div>
            )}

            {/* Modal hiển thị sơ đồ ghế */}
            {isSeatMapModalOpen && (
                <div className="seat-map-modal">
                    <div className="seat-map-modal__content">
                        <button onClick={toggleSeatMapModal} className="close-modal">&times;</button>
                        <h4>Sơ đồ ghế</h4>
                        <div className="seat-map-expanded">
                            {seats.map((seat) => (
                                <div
                                    key={seat.seatId}
                                    className={`seat ${seat.isBooked ? 'seat--booked' : 'seat--available'}`}
                                >
                                    {seat.row}-{seat.number}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TheaterDetails;