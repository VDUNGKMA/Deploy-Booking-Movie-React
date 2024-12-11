// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { useLocation, useHistory } from 'react-router-dom';
// import { handleResetPasswordApi } from '../../services/userService'; // Import the API service
// import './ResetPassword.scss'; // SCSS styles

// const ResetPassword = ({ location }) => {
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const history = useHistory();
//     // Assuming email is passed from the previous page (like OTP page)
//     const email = location.state?.email || ''; // Retrieve email from state if it's passed

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleConfirmPasswordChange = (e) => {
//         setConfirmPassword(e.target.value);
//     };

//     const handleResetPassword = async () => {
//         if (password !== confirmPassword) {
//             setError('Passwords do not match.');
//             return;
//         }
//         console.log("email check",email)
//         if (!email) {
//             setError('Email is missing.');
//             return;
//         }

//         try {
//             const response = await handleResetPasswordApi(email, password);
//             if (response && response.status === 'success') {
//                 toast.success('Your password has been successfully reset!');
//                 setError('');
//                 history.push({
//                     pathname: '/login'
//                 });
//                 // Redirect to login after successful password reset
//                 // For example, you could use history.push('/login') if using react-router-dom
//             } else {
//                 setError(response.message || 'An error occurred. Please try again.');
//             }
//         } catch (err) {
//             setError('An error occurred while resetting the password. Please try again.');
//         }
//     };

//     return (
//         <div className="reset-password-container">
//             <div className="reset-password-box">
//                 <div className="icon-container">
//                     <i className="icon-lock"></i>
//                 </div>
//                 <h2>Reset Password</h2>
//                 <input
//                     type="password"
//                     placeholder="New Password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                 />
//                 {error && <p className="error-message">{error}</p>}
//                 <button className="reset-button" onClick={handleResetPassword}>
//                     Reset Password
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ResetPassword;
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useHistory } from 'react-router-dom';
import { handleResetPasswordApi } from '../../services/userService'; // Import the API service
import './ResetPassword.scss'; // SCSS styles

const ResetPassword = ({ location }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    // Assuming email is passed from the previous page (like OTP page)
    const email = location.state?.email || ''; // Retrieve email from state if it's passed

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp.');
            return;
        }
        console.log("email check", email);
        if (!email) {
            setError('Thiếu email.');
            return;
        }

        try {
            const response = await handleResetPasswordApi(email, password);
            if (response && response.status === 'success') {
                toast.success('Mật khẩu của bạn đã được đặt lại thành công!');
                setError('');
                history.push({
                    pathname: '/login'
                });
                // Redirect to login after successful password reset
            } else {
                setError(response.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.');
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <div className="icon-container">
                    <i className="icon-lock"></i>
                </div>
                <h2>Đặt Lại Mật Khẩu</h2>
                <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {error && <p className="error-message">{error}</p>}
                <button className="reset-button" onClick={handleResetPassword}>
                    Đặt Lại Mật Khẩu
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
