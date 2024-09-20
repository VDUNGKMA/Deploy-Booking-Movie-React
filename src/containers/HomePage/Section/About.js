import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>

                <div className='section-about-header'>
                    Truyền thông  nói gì về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>

                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>

                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Từ thực tế sản xuất nội dung về các đơn vị bệnh viện, phòng khám, BookingCare nhận thấy hiếm có cơ sở khám chữa bệnh nào hoàn hảo 100%. Các bệnh viện, phòng khám nhận được không ít phản hồi tiêu cực xuất phát từ dịch vụ khách hàng, nhân viên bệnh viện thiếu thân thiện, tận tình, chờ khám quá lâu, khâu làm thủ tục, thanh toán chậm chạp,...

                            Với những đánh giá tiêu cực này phòng khám phải xử lý ra sao? Xóa hết review tiêu cực có phải là giải pháp hiệu quả?

                            Thực tế, khách hàng thường có xu hướng nghi ngờ những địa chỉ chỉ toàn đánh giá 5 sao. Liệu đó có phải là review ảo, của nhân viên bệnh viện,  phòng khám?</p>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
