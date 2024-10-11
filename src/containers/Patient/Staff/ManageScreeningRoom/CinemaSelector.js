// src/components/CinemaSelector.js
import React, { useEffect, useState } from 'react';
import { getCinemasApi, fetchTheatersByCinema } from '../../../../services/userService';
import TheaterDetails from './TheaterDetails';
import './CinemaSelector.scss'
const CinemaSelector = () => {
    const [cinemas, setCinemas] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState('');
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        // Lấy danh sách rạp chiếu khi component được mount
        const fetchCinemas = async () => {
            try {
                const response = await getCinemasApi();
                setCinemas(response.data);
            } catch (error) {
                console.error('Error fetching cinemas:', error);
            }
        };

        fetchCinemas();
    }, []);

    const handleCinemaSelect = async (cinemaId) => {
        setSelectedCinema(cinemaId);
        if (cinemaId) {
            try {
                const response = await fetchTheatersByCinema(cinemaId);
                setTheaters(response || []);
            } catch (error) {
                console.error('Error fetching theaters:', error);
            }
        } else {
            setTheaters([]);
        }
    };

    return (
        <div className="cinema-selector">
            <h1>Quản lý phòng chiếu</h1>

            <label>Chọn rạp chiếu:</label>
            <select value={selectedCinema} onChange={(e) => handleCinemaSelect(e.target.value)}>
                <option value="">-- Chọn rạp chiếu --</option>
                {cinemas.map((cinema) => (
                    <option key={cinema.id} value={cinema.id}>
                        {cinema.name}
                    </option>
                ))}
            </select>

            <div className="theater-list">
                {theaters.length > 0 ? (
                    theaters.map((theater) => <TheaterDetails key={theater.id} theater={theater} />)
                ) : (
                    <p>Không có phòng chiếu nào cho rạp đã chọn.</p>
                )}
            </div>
        </div>
    );
};

export default CinemaSelector;
