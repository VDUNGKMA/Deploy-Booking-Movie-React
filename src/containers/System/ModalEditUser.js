import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
class ModalEditUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      email: '',
      password: '',
      username: '',
      phone_number: '',
      role_id: null,
      image: null, // Thêm state cho file ảnh
      previewImageUrl: props.userCurrent.image || null

    }

  };


  componentDidMount() {
    console.log('test did mount:', this.props.userCurrent);
    let user = this.props.userCurrent
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: 'pwd',
        username: user.username,
        phone_number: user.phone_number,
        role_id: user.role_id
      })
    }


  }

  toggle = () => {
    this.props.toogleEditUserFromParent()
  }
  handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Tạo URL xem trước ảnh
      const previewUrl = URL.createObjectURL(file);
      this.setState({
        image: file,         // Lưu ảnh mới
        previewImageUrl: previewUrl // Lưu URL xem trước
      });
    }
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
  handleSaveUser = () => {
    let isValid = this.checkValidInput();
    if (isValid) {
      let user = {
        id: this.state.id,
        email: this.state.email,
        username: this.state.username,
        phone_number: this.state.phone_number,
        role_id: this.state.role_id,
        image: this.state.image, // Thêm ảnh đã chọn (nếu có)
      };
      this.props.editUser(user); // Gọi hàm editUser và truyền user
    }
  }

  render() {
    // console.log('check props from parent ',this.props);
    return (
      <Modal isOpen={this.props.isOpenModalEditUser}
        toggle={() => { this.toggle() }}
        className='modal-user-container'
        size='lg' >
        <ModalHeader toggle={() => { this.toggle() }}>Update User</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>Email</label>
              <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                value={this.state.email} disabled
              ></input>
            </div>
            <div className='input-container'>
              <label>Password</label>
              <input type='password'
                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                value={this.state.password} disabled
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
            <div className='input-container max-width-input'>
              <label>Role</label>
              {/* <input type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                value={this.state.address}
              ></input> */}
              <select
                onChange={(event) => { this.handleOnChangeInput(event, 'role_id') }}
                value={this.state.role_id}
              >
                {console.log("check role_id", this.state.role_id)} 
                <option >Select Role</option>
                <option value={1}>Admin</option>
                <option value={2}>Staff</option>
                <option value={3}>Customer</option>

              </select>
            </div>
            <div className="input-container">
              <label>Profile Image</label>
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
          <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
            Update user
          </Button>
          <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
            Close
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
