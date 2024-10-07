import React, { useEffect, useState } from 'react';
import axios from '../../../../axios';
import { Bar } from 'react-chartjs-2';
import './RevenueByShowtime.scss'; // Import file SCSS

const RevenueByShowtime = () => {
    const [showtimeRevenueData, setShowtimeRevenueData] = useState({});
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchShowtimeRevenue = async () => {
        if (!startDate || !endDate) {
            alert('Please select both start and end dates!');
            return;
        }

        try {
            const response = await axios.get('/api/admin/revenue/showtimes', {
                params: { startDate, endDate },
            });

            const showtimes = response.map((item) => {
                const startTime = new Date(item.startTime).toLocaleTimeString();
                const endTime = new Date(item.endTime).toLocaleTimeString();
                return `${startTime} - ${endTime}`;
            });

            const revenues = response.map((item) => parseFloat(item.totalRevenue));

            setShowtimeRevenueData({
                labels: showtimes,
                datasets: [
                    {
                        label: 'Doanh thu (VND)',
                        data: revenues,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching showtime revenue:', error);
        }
    };

    useEffect(() => {
        fetchShowtimeRevenue();
    }, []);

    return (
        <div className="revenue-dashboard">
            <h1>Revenue by Showtime</h1>

            {/* Phần chọn khoảng thời gian */}
            <div className="date-picker-container">
                <div className="date-picker">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="date-picker">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button className="btn" onClick={fetchShowtimeRevenue}>Refresh Data</button>
            </div>

            {/* Biểu đồ doanh thu theo suất chiếu */}
            <div className="chart-container">
                <Bar
                    data={showtimeRevenueData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: { position: 'top' },
                        title: {
                            display: true,
                            text: 'Doanh thu theo Suất Chiếu',
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: (value) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                                },
                            }],
                        },
                    }}
                />
            </div>

            {/* Bảng hiển thị dữ liệu */}
            <table className="revenue-table">
                <thead>
                    <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {showtimeRevenueData.labels &&
                        showtimeRevenueData.labels.map((label, index) => (
                            <tr key={index}>
                                <td>{label}</td>
                                <td>{label}</td>
                                <td>{parseFloat(showtimeRevenueData.datasets[0].data[index]).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default RevenueByShowtime;
