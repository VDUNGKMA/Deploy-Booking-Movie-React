import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import './sendOTP.scss';
import { handleVerifyOtpApi } from '../../services/userService';

const SendOTP = (props) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleInput = (element, index) => {
        const value = element.value;

        if (/^[0-9]$/.test(value)) {
            let otpArray = [...otp];
            otpArray[index] = value;
            setOtp(otpArray);

            if (index < otp.length - 1 && value !== '') {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace') {
            let otpArray = [...otp];
            otpArray[index] = '';

            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
            setOtp(otpArray);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').split('');
        let otpArray = [...otp];

        pasteData.forEach((char, index) => {
            if (/^[0-9]$/.test(char) && index < otp.length) {
                otpArray[index] = char;
            }
        });

        setOtp(otpArray);
    };

    const handleVerifyOTP = async () => {
        if (otp.includes('')) {
            setError('Vui lòng nhập đầy đủ mã OTP.');
            return;
        }
        setError('');
        const otpCode = otp.join('');

        try {
            const response = await handleVerifyOtpApi(email, otpCode);
            if (response && response.status === 'success') {
                setSuccess('Mã OTP xác thực thành công!');
                setError('');
                console.log('OTP verified:', response);
                history.push({
                    pathname: '/reset-password',
                    state: { email } // Make sure the email is passed here
                });

            } else {
                setError(response.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
                setSuccess('');
            }
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    return (
        <div className="otp-background">
            <div className="otp-box">
                <h2>Nhập mã OTP</h2>
                <div className="otp-input-container" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            maxLength="1"
                            className="otp-input"
                            value={digit}
                            onInput={(e) => handleInput(e.target, index)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                        />
                    ))}
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button className="verify-otp-button" onClick={handleVerifyOTP}>
                    Xác thực OTP
                </button>
            </div>
        </div>
    );
};

export default SendOTP;
