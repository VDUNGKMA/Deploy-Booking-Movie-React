import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      phone_number: '',
      role_id: null,
      image: null,
      previewImageUrl: null,
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on('EVEN_CLEAR_MODAL_DATA', () => {
      this.setState({
        email: '',
        password: '',
        username: '',
        phone_number: '',
        role_id: null,
        image: null,
        previewImageUrl: null,
      });
    });
  }

  toggle = () => {
    this.props.toogleFromParent();
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

  handleOnChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      this.setState({
        image: file,
        previewImageUrl: previewUrl,
      });
    }
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

  handleAddNewUser = () => {
    if (this.checkValidInput()) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className="modal-user-container"
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Tạo người dùng mới</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Mật khẩu</label>
              <input
                type="password"
                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                value={this.state.password}
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
            <div className="input-container">
              <label>Vai trò</label>
              <select
                onChange={(event) => this.handleOnChangeInput(event, 'role_id')}
                value={this.state.role_id}
              >
                <option>Chọn vai trò</option>
                <option value={1}>Quản trị viên</option>
                <option value={2}>Nhân viên</option>
              </select>
            </div>
            <div className="input-container">
              <label>Ảnh đại diện</label>
              <input type="file" onChange={this.handleOnChangeImage} />
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
          <Button color="primary" className="px-3" onClick={this.handleAddNewUser}>
            Thêm người dùng
          </Button>
          <Button color="secondary" className="px-3" onClick={() => emitter.emit('EVEN_CLEAR_MODAL_DATA')}>
            Đặt lại
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
