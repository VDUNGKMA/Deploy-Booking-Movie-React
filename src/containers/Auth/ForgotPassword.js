// import React, { Component } from 'react';
// import { toast } from 'react-toastify';
// import { handleForgotPasswordApi } from '../../services/userService';
// import './ForgotPassword.scss'; // Importing SCSS file

// class ForgotPassword extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             error: ''
//         };
//     }

//     handleInputChange = (event) => {
//         this.setState({
//             email: event.target.value
//         });
//     };
//     handleBackToLogin = () => {
//         this.props.history.push('/login'); // Navigate to the login page
//     };
//     handleForgotPassword = async () => {
//         const email = this.state.email;
//         console.log("check email", email)
//         this.props.history.push({
//             pathname: '/send-otp',
//             state: { email } // Truyền email qua state
//         });
//         try {
//             const response = await handleForgotPasswordApi(email);
//             if (response && response.status === 'success') {
//                 toast.success('Password reset link has been sent to your email.');
//             } else {
//                 this.setState({ error: response.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
//             }
//         } catch (error) {
//             console.error('Lỗi từ API:', error); // In chi tiết lỗi ra console
//             this.setState({ error: 'We cannot find your email. Vui lòng kiểm tra email và thử lại.' });
//         }
//     };

//     render() {
//         return (
//             <div className="forgot-password-container">
//                 <header className="header">
//                     <h1>Booking Ticket Film</h1>
//                 </header>
//                 <div className="forgot-password-box">
//                     <div className="icon-container">
//                         <i className="icon-info"></i> {/* Use a relevant icon or an image here */}
//                     </div>
//                     <h2>Forgot Password</h2>
//                     <p className="forgot-description">
//                         Enter your email and we'll send you a link to reset your password.
//                     </p>
//                     <div className="input-wrapper">
//                         <input
//                             type="email"
//                             className="email-input"
//                             placeholder="Your email address"
//                             value={this.state.email}
//                             onChange={this.handleInputChange}
//                         />
//                         {this.state.error && <p className="error-message">{this.state.error}</p>}
//                     </div>
//                     <button className="submit-button" onClick={this.handleForgotPassword}>
//                         Submit
//                     </button>
//                     <p className="back-to-login" onClick={this.handleBackToLogin}>
//                         ← Back to Login
//                     </p>
//                 </div>
//                 <footer className="footer">
//                 </footer>
//             </div>
//         );
//     }
// }

// export default ForgotPassword;
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { handleForgotPasswordApi } from '../../services/userService';
import './ForgotPassword.scss'; 

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handleBackToLogin = () => {
        this.props.history.push('/login'); // Navigate to the login page
    };

    handleForgotPassword = async () => {
        const email = this.state.email;
        console.log("check email", email);
        this.props.history.push({
            pathname: '/send-otp',
            state: { email } // Truyền email qua state
        });
        try {
            const response = await handleForgotPasswordApi(email);
            if (response && response.status === 'success') {
                toast.success('Đường dẫn khôi phục mật khẩu đã được gửi đến email của bạn.');
            } else {
                this.setState({ error: response.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
            }
        } catch (error) {
            console.error('Lỗi từ API:', error); // In chi tiết lỗi ra console
            this.setState({ error: 'Chúng tôi không tìm thấy email của bạn. Vui lòng kiểm tra email và thử lại.' });
        }
    };

    render() {
        return (
            <div className="forgot-password-container">
                <header className="header">
                    <h1>Đặt Vé Phim</h1>
                </header>
                <div className="forgot-password-box">
                    <div className="icon-container">
                        <i className="icon-info"></i> {/* Use a relevant icon or an image here */}
                    </div>
                    <h2>Quên Mật Khẩu</h2>
                    <p className="forgot-description">
                        Nhập email của bạn và chúng tôi sẽ gửi đường dẫn khôi phục mật khẩu.
                    </p>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            className="email-input"
                            placeholder="Địa chỉ email của bạn"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                        {this.state.error && <p className="error-message">{this.state.error}</p>}
                    </div>
                    <button className="submit-button" onClick={this.handleForgotPassword}>
                        Gửi
                    </button>
                    <p className="back-to-login" onClick={this.handleBackToLogin}>
                        ← Quay lại đăng nhập
                    </p>
                </div>
                <footer className="footer">
                </footer>
            </div>
        );
    }
}

export default ForgotPassword;

