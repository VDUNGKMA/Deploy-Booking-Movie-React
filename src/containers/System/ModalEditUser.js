import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      password: '',
      username: '',
      phone_number: '',
      role_id: null,
      image: null,
      previewImageUrl: props.userCurrent.image || null,
    };
  }

  componentDidMount() {
    const user = this.props.userCurrent;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: 'pwd',
        username: user.username,
        phone_number: user.phone_number,
        role_id: user.role_id,
      });
    }
  }

  toggle = () => {
    this.props.toogleEditUserFromParent();
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      this.setState({
        image: file,
        previewImageUrl: previewUrl,
      });
    }
  };

  handleOnChangeInput = (event, id) => {
    let value = event.target.value;
    if (id === 'role_id') {
      value = parseInt(value);
    }
    this.setState({
      [id]: value,
    });
  };

  checkValidInput = () => {
    const arrInput = ['email', 'password', 'username', 'phone_number', 'role_id'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert('Thiếu thông tin: ' + arrInput[i]);
        return false;
      }
    }
    return true;
  };

  handleSaveUser = () => {
    if (this.checkValidInput()) {
      const user = {
        id: this.state.id,
        email: this.state.email,
        username: this.state.username,
        phone_number: this.state.phone_number,
        role_id: this.state.role_id,
        image: this.state.image,
      };
      this.props.editUser(user);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpenModalEditUser}
        toggle={this.toggle}
        className="modal-user-container"
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Cập nhật người dùng</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Mật khẩu</label>
              <input
                type="password"
                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                value={this.state.password}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Tên người dùng</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, 'username')}
                value={this.state.username}
              />
            </div>
            <div className="input-container">
              <label>Số điện thoại</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, 'phone_number')}
                value={this.state.phone_number}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Vai trò</label>
              <select
                onChange={(event) => this.handleOnChangeInput(event, 'role_id')}
                value={this.state.role_id}
              >
                <option>Chọn vai trò</option>
                <option value={1}>Quản trị viên</option>
                <option value={2}>Nhân viên</option>
                <option value={3}>Khách hàng</option>
              </select>
            </div>
            <div className="input-container">
              <label>Ảnh đại diện</label>
              <input type="file" accept="image/*" onChange={this.handleImageChange} />
            </div>
            {this.state.previewImageUrl && (
              <div className="image-preview">
                <img
                  src={this.state.previewImageUrl}
                  alt="Preview"
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="px-3" onClick={this.handleSaveUser}>
            Cập nhật
          </Button>
          <Button color="secondary" className="px-3" onClick={this.toggle}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
