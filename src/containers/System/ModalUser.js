import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      username: '',
      phone_number: '',
      role_id: null,
      image: null, // Thêm state cho ảnh
      previewImageUrl: null // State lưu trữ URL ảnh xem trước
    }
    this.listenToEmitter()
  };

  listenToEmitter() {
    emitter.on('EVEN_CLEAR_MODAL_DATA', () => {
      // reset state
      this.setState({
        email: '',
        password: '',
        username: '',
        phone_number: '',
        role_id: null,
        image: null, // Reset ảnh
        previewImageUrl: null // Reset URL preview
      })
    })
  }

  toggle = () => {
    this.props.toogleFromParent()
  }

  handleOnChangeInput = (event, id) => {
    let value = event.target.value;
    if (id === 'role_id') {
      value = parseInt(value); // Chuyển giá trị thành số nếu là role_id
    }
    this.setState({
      [id]: value
    });
  }

  // Hàm xử lý chọn ảnh
  handleOnChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh xem trước
      this.setState({
        image: file, // Lưu file ảnh
        previewImageUrl: previewUrl // Lưu URL preview
      });
    }
  }

  checkValidInput = () => {
    let valid = true
    let arrInput = ['email', 'password', 'username', 'phone_number', 'role_id']
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        valid = false

        alert('Missing input: ' + arrInput[i])
        break;

      }
    }
    return valid
  }

  // Hàm thêm người dùng mới
  handleAddNewUser = () => {
    let isValid = this.checkValidInput()
    if (isValid) {
      // Gọi API để tạo người dùng mới với dữ liệu và ảnh
      this.props.createNewUser(this.state);
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}
        toggle={() => { this.toggle() }}
        className='modal-user-container'
        size='lg' >
        <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>Email</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                value={this.state.email}
              ></input>
            </div>
            <div className='input-container'>
              <label>Password</label>
              <input type='password'
                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                value={this.state.password}
              ></input>
            </div>
            <div className='input-container'>
              <label>Username</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'username') }}
                value={this.state.username}
              ></input>
            </div>
            <div className='input-container'>
              <label>Phone Number</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'phone_number') }}
                value={this.state.phone_number}
              ></input>
            </div>
            <div className='input-container '>
              <label>Role</label>
              <select
                onChange={(event) => { this.handleOnChangeInput(event, 'role_id') }}
                value={this.state.role_id}
              >
                <option >Select Role</option>
                <option value={1}>Admin</option>
                <option value={2}>Staff</option>
              </select>
            </div>
            <div className='input-container'>
              <label>Image</label>
              <input type='file' onChange={this.handleOnChangeImage}></input> {/* Thêm input chọn file */}
            </div>
            {/* Hiển thị ảnh preview nếu có */}
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
          <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>
            Add new User
          </Button>
          <Button color="secondary" className='px-3' onClick={() => { emitter.emit('EVEN_CLEAR_MODAL_DATA') }}>
            Reset
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
