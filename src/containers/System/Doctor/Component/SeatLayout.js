// src/containers/System/Admin/components/SeatLayout.js

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'reactstrap';
import './SeatLayout.scss'; // Tạo file CSS riêng nếu cần
import { FaCouch, FaChair, FaStar } from 'react-icons/fa'; // Sử dụng react-icons để biểu tượng

const SeatLayout = ({ seats, onSeatClick }) => {
    // Nhóm ghế theo hàng
    const groupedSeats = seats.reduce((acc, seat) => {
        if (!acc[seat.row]) {
            acc[seat.row] = [];
        }
        acc[seat.row].push(seat);
        return acc;
    }, {});

    // Sắp xếp hàng theo thứ tự ABC...
    const sortedRows = Object.keys(groupedSeats).sort();

    return (
        <div className="seat-layout">
            {sortedRows.map((row) => (
                <div key={row} className="seat-row">
                    <span className="row-label">{row}</span>
                    <div className="seats">
                        {groupedSeats[row]
                            .sort((a, b) => a.number - b.number)
                            .map((seat) => (
                                // <Button
                                //     key={seat.id}
                                //     className={`seat ${seat.status}`}
                                //     onClick={() => onSeatClick(seat)}
                                //     disabled={seat.status === 'booked'}
                                // >
                                //     {seat.number}
                                // </Button>
                                <SeatButton
                                    key={seat.id}
                                    seat={seat}
                                    onClick={() => onSeatClick(seat)}
                                />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
const SeatButton = ({ seat, onClick }) => {
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    // Xác định lớp CSS dựa trên loại ghế
    const seatClass = `seat ${seat.status} ${seat.type.toLowerCase()}`;

    // Chọn biểu tượng dựa trên loại ghế
    let SeatIcon;
    switch (seat.type) {
        case 'VIP':
            SeatIcon = FaStar;
            break;
        case 'Couple':
            SeatIcon = FaCouch;
            break;
        default:
            SeatIcon = FaChair;
    }

    return (
        <>
            <Button
                id={`seat-${seat.id}`}
                className={seatClass}
                onClick={onClick}
                disabled={seat.status === 'booked'}
                size="sm"
            >
                <SeatIcon />
                <span className="seat-number">{seat.number}</span>
            </Button>
            <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target={`seat-${seat.id}`}
                toggle={toggle}
            >
                {`Ghế ${seat.number} - ${seat.type} - ${seat.status}`}
            </Tooltip>
        </>
    );
};
SeatLayout.propTypes = {
    seats: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            row: PropTypes.string.isRequired,
            number: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,// "available", "reserved", "booked"
            type: PropTypes.string.isRequired, // "Normal", "VIP", "Couple"
        })
    ).isRequired,
    onSeatClick: PropTypes.func.isRequired,
};
SeatButton.propTypes = {
    seat: PropTypes.shape({
        id: PropTypes.number.isRequired,
        row: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
export default SeatLayout;
