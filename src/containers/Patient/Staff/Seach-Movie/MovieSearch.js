import React, { useState } from 'react';
import axios from '../../../../axios';
import moment from 'moment';
import './MovieSearch.scss';

const MovieSearch = () => {
    const [movieTitle, setMovieTitle] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get('/api/staff/movies/search-showtimes', {
                params: { movieTitle, date: searchDate }
            });
            setMovies(response);
            setError(null);
        } catch (err) {
            console.error('Error fetching movie showtimes:', err);
            setError('Không tìm thấy phim hoặc có lỗi khi tải dữ liệu');
            setMovies(null);
        }
    };

    return (
        <div className="movie-search">
            <h2 className="movie-search__title">Tìm kiếm phim và suất chiếu</h2>
            <div className="movie-search__controls">
                <input
                    type="text"
                    value={movieTitle}
                    onChange={(e) => setMovieTitle(e.target.value)}
                    placeholder="Nhập tên phim"
                />
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>

            {error && <p className="error-message">{error}</p>}
            {movies && (
                <div className="movie-search__results">
                    {movies.map(movie => (
                        <div key={movie.movieId}>
                            <h3>Kết quả cho phim: {movie.title}</h3>
                            {movie.showtimes.length > 0 ? (
                                Object.entries(movie.showtimes.reduce((result, showtime) => {
                                    const cinemaName = showtime.theater.cinema.name;
                                    const theaterName = showtime.theater.name;

                                    if (!result[cinemaName]) result[cinemaName] = {};
                                    if (!result[cinemaName][theaterName]) result[cinemaName][theaterName] = [];

                                    result[cinemaName][theaterName].push({
                                        startTime: showtime.startTime,
                                        endTime: showtime.endTime
                                    });

                                    return result;
                                }, {})).map(([cinemaName, theaters]) => (
                                    <div key={cinemaName} className="cinema-group">
                                        <h4>Rạp: {cinemaName}</h4>
                                        {Object.entries(theaters).map(([theaterName, showtimes]) => (
                                            <div key={theaterName} className="theater-group">
                                                <h5>Phòng chiếu: {theaterName}</h5>
                                                <ul className="showtime-list">
                                                    {showtimes.map((showtime, index) => (
                                                        <li key={index} className="showtime-item">
                                                            {moment(showtime.startTime).format('HH:mm')} - {moment(showtime.endTime).format('HH:mm')}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <p>Không có suất chiếu cho phim này vào ngày đã chọn.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieSearch;
