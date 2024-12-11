import React, { useEffect, useState } from 'react';
import './RevenueByMovieWeekly.scss';
import { Bar } from 'react-chartjs-2';
import axios from '../../../../axios';

const RevenueByMovieWeekly = () => {
    const [weeklyRevenue, setWeeklyRevenue] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chartData, setChartData] = useState({});

    const fetchWeeklyRevenue = async () => {
        if (!startDate || !endDate) {
            alert('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!');
            return;
        }

        try {
            const response = await axios.get('/api/admin/revenue/movies/weekly', {
                params: { startDate, endDate },
            });

            setWeeklyRevenue(response);

            // Nhóm dữ liệu theo tuần
            const groupedData = response.reduce((acc, current) => {
                const week = `Tuần ${current.week}`;
                if (!acc[week]) acc[week] = [];
                acc[week].push({
                    movieTitle: current.movieTitle,
                    totalRevenue: parseFloat(current.totalRevenue),
                });
                return acc;
            }, {});

            // Chuẩn bị dữ liệu cho biểu đồ
            const weeks = Object.keys(groupedData);
            const movieTitles = [...new Set(response.map(item => item.movieTitle))]; // Danh sách tên phim
            const datasets = movieTitles.map(movieTitle => {
                return {
                    label: movieTitle,
                    data: weeks.map(week => {
                        const movie = groupedData[week].find(item => item.movieTitle === movieTitle);
                        return movie ? movie.totalRevenue : 0;
                    }),
                    backgroundColor: getRandomColor(),
                    borderColor: getRandomColor(),
                    borderWidth: 1,
                };
            });

            setChartData({
                labels: weeks,
                datasets: datasets,
            });
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu doanh thu theo tuần:', error);
        }
    };

    // Hàm tạo màu ngẫu nhiên cho từng cột
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="revenue-weekly-movie">
            <h1>Doanh Thu Phim Theo Tuần</h1>

            <div className="date-picker-container">
                <div className="date-picker">
                    <label>Chọn Ngày Bắt Đầu: </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="date-picker">
                    <label>Chọn Ngày Kết Thúc: </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <button className="btn" onClick={fetchWeeklyRevenue}>Lấy Doanh Thu</button>

            {/* Biểu đồ cột */}
            <div className="chart-container">
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: (value) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                                },
                            }],
                        },
                        title: {
                            display: true,
                            text: 'Doanh thu theo tuần và tên phim',
                        },
                    }}
                    height={400}
                />
            </div>

            {/* Bảng hiển thị dữ liệu doanh thu theo tuần */}
            <table>
                <thead>
                    <tr>
                        <th>Tuần</th>
                        <th>Tên Phim</th>
                        <th>Tổng Doanh Thu</th>
                        <th>Tổng Vé Bán</th>
                    </tr>
                </thead>
                <tbody>
                    {weeklyRevenue.map((revenue, index) => (
                        <tr key={index}>
                            <td>{`Tuần ${revenue.week}`}</td>
                            <td>{revenue.movieTitle}</td>
                            <td>{parseFloat(revenue.totalRevenue).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{revenue.totalTickets}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RevenueByMovieWeekly;
