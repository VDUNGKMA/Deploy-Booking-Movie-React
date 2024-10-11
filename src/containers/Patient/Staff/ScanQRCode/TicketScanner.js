import React, { useState } from 'react';
import jsQR from 'jsqr';
import axios from '../../../../axios';
import moment from 'moment';
import './TicketScanner.scss';

const TicketScanner = () => {
    const [ticketData, setTicketData] = useState(null);
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showUsedModal, setShowUsedModal] = useState(false); // Modal cho vé đã sử dụng
    const [showExpiredModal, setShowExpiredModal] = useState(false); // Modal cho vé quá hạn

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target.result;

            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

                if (qrCode) {
                    handleQRCodeScan(qrCode.data);
                } else {
                    setError("QR code không hợp lệ hoặc không thể quét.");
                    setTicketData(null);
                }
            };
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleQRCodeScan = async (data) => {
        try {
            const response = await axios.post('/api/staff/ticket/scan', { qrData: data });
            if (response.data) {
                setTicketData(response.data);
            }
            setError(null);
        } catch (err) {
            console.error("Lỗi khi xác thực mã QR:", err);
            setError("Xác thực mã QR thất bại.");
            setTicketData(null);
        }
    };

   
    const handleTicketValidation = async () => {
        try {
            const response = await axios.patch(`/api/staff/ticket/validate/${ticketData.ticketId}`);

            // Hiển thị modal xác thực thành công
            setShowSuccessModal(true);
            setTicketData(null); // Xóa thông tin vé sau khi xác thực

        } catch (err) {
            console.error("Lỗi khi xác thực vé:", err);

            // Kiểm tra và hiển thị thông báo cụ thể
            const errorMessage = err.response?.data?.message;

            if (errorMessage === "This ticket has already been used") {
                setShowUsedModal(true);
            } else if (errorMessage === "This ticket is expired") {
                setShowExpiredModal(true);
            } else {
                setError("Xác thực vé thất bại.");
            }
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
        setShowUsedModal(false);
        setShowExpiredModal(false);
    };

    return (
        <div className="ticket-scanner">
            <h2>Quét và xác thực vé</h2>

            <input type="file" accept="image/*" onChange={handleImageUpload} className="upload-input" />

            {error && <p className="error-message">{error}</p>}
            {ticketData && (
                <div className="ticket-info">
                    <h3>Thông tin vé</h3>
                    <p><strong>Người đặt:</strong> {ticketData.user.username}</p>
                    <p><strong>Thời gian đặt vé:</strong> {moment(ticketData.bookingTime).format('DD/MM/YYYY HH:mm:ss')}</p>
                    <p><strong>Phim:</strong> {ticketData.movie}</p>
                    <p><strong>Rạp:</strong> {ticketData.cinema}</p>
                    <p><strong>Phòng chiếu:</strong> {ticketData.theater}</p>
                    <p><strong>Ghế:</strong> {ticketData.seats}</p>
                    {/* <p><strong>Giá vé:</strong> {ticketData.price} VND</p> */}
                    <p>
                        <strong>Giá vé:</strong>
                        {new Intl.NumberFormat('vi-VN',
                            { style: 'currency', currency: 'VND' }
                        ).format(ticketData.price)}
                    </p>

                    <p><strong>Thời gian chiếu phim:</strong> {moment(ticketData.startTime).format('DD/MM/YYYY HH:mm:ss')}</p>
                    <p><strong>Thời gian kết thúc phim:</strong> {moment(ticketData.endTime).format('DD/MM/YYYY HH:mm:ss')}</p>


                    <button onClick={handleTicketValidation} className="validate-button">Xác thực vé</button>
                </div>
            )}

            {/* Modal cho xác thực thành công */}
            {showSuccessModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Xác thực thành công!</h3>
                        <p>Vé đã được xác thực thành công.</p>
                        <button onClick={closeModal} className="close-modal-button">Đóng</button>
                    </div>
                </div>
            )}

            {/* Modal cho vé đã sử dụng */}
            {showUsedModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Vé đã được sử dụng!</h3>
                        <p>Vé này đã được sử dụng trước đó.</p>
                        <button onClick={closeModal} className="close-modal-button">Đóng</button>
                    </div>
                </div>
            )}

            {/* Modal cho vé quá hạn */}
            {showExpiredModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Vé đã hết hạn!</h3>
                        <p>Vé này không còn hợp lệ do quá hạn sử dụng.</p>
                        <button onClick={closeModal} className="close-modal-button">Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketScanner;
