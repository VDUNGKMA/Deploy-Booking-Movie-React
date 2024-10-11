import React, { useState, useEffect } from 'react';
import axios from '../../../../axios';
import './RevenueDashboard.scss';

const RevenueDashboard = () => {
    const [cinemas, setCinemas] = useState([]); // Lưu danh sách rạp
    const [selectedCinema, setSelectedCinema] = useState(''); // Rạp được chọn
    const [selectedDate, setSelectedDate] = useState(''); // Ngày được chọn
    const [selectedMonth, setSelectedMonth] = useState(''); // Tháng được chọn
    const [selectedYear, setSelectedYear] = useState(''); // Năm được chọn
    const [revenue, setRevenue] = useState([]); // Lưu doanh thu theo ngày
    const [monthlyRevenue, setMonthlyRevenue] = useState([]); // Lưu doanh thu theo tháng
    const [yearlyRevenue, setYearlyRevenue] = useState([]); // Lưu doanh thu theo năm

    // Lấy danh sách các rạp chiếu phim
    const fetchCinemas = async () => {
        try {
            const response = await axios.get('/api/admin/cinemas');
            setCinemas(response.data);
        } catch (error) {
            console.error('Error fetching cinemas:', error);
        }
    };

    useEffect(() => {
        fetchCinemas();
    }, []);

    const fetchDailyRevenue = async () => {
        try {
            if (!selectedCinema || !selectedDate) return;
            const apiUrl = selectedCinema === 'all'
                ? '/api/admin/revenue/total/daily'
                : '/api/admin/revenue/daily';

            const response = await axios.get(apiUrl, {
                params: {
                    cinemaId: selectedCinema === 'all' ? null : selectedCinema,
                    date: selectedDate,
                },
            });
            setRevenue(response);
        } catch (error) {
            console.error('Error fetching daily revenue:', error);
        }
    };

    const fetchMonthlyRevenue = async () => {
        try {
            if (!selectedCinema || !selectedMonth) return;
            const [year, month] = selectedMonth.split('-');
            const apiUrl = selectedCinema === 'all'
                ? '/api/admin/revenue/total/monthly'
                : '/api/admin/revenue/monthly';

            const response = await axios.get(apiUrl, {
                params: {
                    cinemaId: selectedCinema === 'all' ? null : selectedCinema,
                    month: month,
                    year: year,
                },
            });
            setMonthlyRevenue(response);
        } catch (error) {
            console.error('Error fetching monthly revenue:', error);
        }
    };

    const fetchYearlyRevenue = async () => {
        try {
            if (!selectedCinema || !selectedYear) return;
            const apiUrl = selectedCinema === 'all'
                ? '/api/admin/revenue/total/yearly'
                : '/api/admin/revenue/yearly';

            const response = await axios.get(apiUrl, {
                params: {
                    cinemaId: selectedCinema === 'all' ? null : selectedCinema,
                    year: selectedYear,
                },
            });
            setYearlyRevenue(response);
        } catch (error) {
            console.error('Error fetching yearly revenue:', error);
        }
    };

    useEffect(() => {
        fetchDailyRevenue();
    }, [selectedCinema, selectedDate]);

    useEffect(() => {
        fetchMonthlyRevenue();
    }, [selectedCinema, selectedMonth]);

    useEffect(() => {
        fetchYearlyRevenue();
    }, [selectedCinema, selectedYear]);

    return (
        <div className="revenue-dashboard-container">
            <h1>Thống kê doanh thu theo rạp</h1>

            {/* Dropdown chọn rạp */}
            <div className="input-group">
                <label>Chọn rạp:</label>
                <select
                    value={selectedCinema}
                    onChange={(e) => setSelectedCinema(e.target.value)}
                >
                    <option value="">-- Chọn rạp chiếu phim --</option>
                    <option value="all">Tất cả các rạp</option>
                    {cinemas.map((cinema) => (
                        <option key={cinema.id} value={cinema.id}>
                            {cinema.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Giao diện theo hàng, 3 cột */}
            <div className="revenue-row">
                {/* Doanh thu theo ngày */}
                <div className="revenue-column">
                    <h2>Doanh thu theo ngày:</h2>
                    <div className="input-group">
                        <label>Chọn ngày:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    {revenue.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên phòng chiếu</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenue.map((rev, index) => (
                                    <tr key={index}>
                                        <td>{selectedCinema === 'all' ? 'Tất cả phòng chiếu' : rev.theaterName}</td>
                                        <td>
                                            {rev.totalRevenue
                                                ? rev.totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                                : 'Chưa có dữ liệu'}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Chưa có dữ liệu doanh thu theo ngày.</p>
                    )}
                </div>

                {/* Doanh thu theo tháng */}
                <div className="revenue-column">
                    <h2>Doanh thu theo tháng:</h2>
                    <div className="input-group">
                        <label>Chọn tháng:</label>
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        />
                    </div>
                    {monthlyRevenue.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên phòng chiếu</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyRevenue.map((rev, index) => (
                                    <tr key={index}>
                                        <td>{selectedCinema === 'all' ? 'Tất cả phòng chiếu' : rev.theaterName}</td>
                                        <td>
                                            {rev.totalRevenue
                                                ? rev.totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                                : 'Chưa có dữ liệu'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Chưa có dữ liệu doanh thu theo tháng.</p>
                    )}
                </div>

                {/* Doanh thu theo năm */}
                <div className="revenue-column">
                    <h2>Doanh thu theo năm:</h2>
                    <div className="input-group">
                        <label>Chọn năm:</label>
                        <input
                            type="number"
                            min="2000"
                            max="2100"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        />
                    </div>
                    {yearlyRevenue.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên phòng chiếu</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {yearlyRevenue.map((rev, index) => (
                                    <tr key={index}>
                                        <td>{selectedCinema === 'all' ? 'Tất cả phòng chiếu' : rev.theaterName}</td>
                                        <td>
                                            {rev.totalRevenue
                                                ? rev.totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                                : 'Chưa có dữ liệu'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Chưa có dữ liệu doanh thu theo năm.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RevenueDashboard;
