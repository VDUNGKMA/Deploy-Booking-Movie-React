import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersByRoleApi, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import './userManage.scss'
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'
import { emitter } from '../../utils/emitter'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
            selectedRole: 2, // Mặc định chọn vai trò "user"
            currentPage: 1, // Default to first page
            totalPages: 1, // Initialize total pages
            searchQuery: ''
        }
    }

    async componentDidMount() {
        // await this.getAllUserFromReact();
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        const { selectedRole, currentPage } = this.state;
        let response = await getUsersByRoleApi(selectedRole, currentPage, 10, this.state.searchQuery); // Fetch 10 users per page
        if (response && response.status === "success") {
            this.setState({
                arrUsers: response.data.users.reverse(),
                totalPages: response.data.totalPages
            });
        }
    }
 
    handleRoleChange = async (event) => {
        this.setState({
            selectedRole: parseInt(event.target.value, 10),
            currentPage: 1
        }, this.getAllUsers); // Reset to first page on role change
    }
    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearchSubmit = () => {
        this.getAllUsers();
    }
    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage }, this.getAllUsers);
    }
    renderPagination = () => {
        const { currentPage, totalPages } = this.state;
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`page-button ${i === currentPage ? 'active' : ''}`}
                    onClick={() => this.handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return <div className="pagination">{pages}</div>;
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        });
    }

    toogleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    }

    toogleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        });
    }

    createNewUser = async (data) => {
        try {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('username', data.username);
            formData.append('phone_number', data.phone_number);
            formData.append('role_id', data.role_id);
            if (data.image) {
                formData.append('image', data.image); // Append image to formData
            }

            let response = await createNewUserService(formData); // Send formData
            console.log(response); // In ra để kiểm tra response
            if (response && response.status === 'success') {
                await this.getAllUsers();
                this.setState({ isOpenModalUser: false });
                toast.success('Create user succeed');
                emitter.emit('EVEN_CLEAR_MODAL_DATA');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    doEditUser = async (user) => {
        try {
            // Tạo FormData để chứa dữ liệu người dùng
            const formData = new FormData();
            formData.append('id', user.id);
            formData.append('email', user.email);
            formData.append('username', user.username);
            formData.append('phone_number', user.phone_number);
            formData.append('role_id', user.role_id);

            // Nếu có ảnh mới, thêm vào FormData
            if (user.image) {
                formData.append('image', user.image); // user.image là file ảnh được chọn
            }

            // Gửi formData tới service
            let res = await editUserService(user.id, formData);
            console.log("check res edit",res)

            if (res && res.status === "success") {
                this.setState({
                    isOpenModalEditUser: false
                });
                toast.success("Update user succeed");
                await this.getAllUsers();
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (data) => {
        try {
            let res = await deleteUserService(data.id);
            if (res && res.status === "success") {
                toast.success("Delete user succeed");
                await this.getAllUsers();
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toogleFromParent={this.toogleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpenModalEditUser={this.state.isOpenModalEditUser}
                        toogleEditUserFromParent={this.toogleEditUserModal}
                        userCurrent={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage User</div>
                <div className="controls-container">
                    <div className="role-select-container">
                        <label htmlFor="roleSelect">Select Role:</label>
                        <select
                            id="roleSelect"
                            value={this.state.selectedRole}
                            onChange={this.handleRoleChange}
                        >
                            <option value={1}>Admin</option>
                            <option value={2}>Staff</option>
                            <option value={3}>User</option>
                        </select>
                    </div>

                    {/* Search Container */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by username or email"
                            value={this.state.searchQuery}
                            onChange={this.handleSearchChange}
                        />
                        <button onClick={this.handleSearchSubmit}>Search</button>
                    </div>
                </div>
                <div className='mx-2'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i> Add new User
                    </button>
                </div>
                <div className='users-table mt-3 mx-2'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Phone Number</th>
                                <th>RoleId</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {this.state.arrUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{user.role_id}</td>
                                    {console.log("check image",user)}
                                    <td>
                                        <img
                                            src={user.image || 'https://via.placeholder.com/50'}
                                            alt={user.username}
                                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                        />
                                    </td> {/* Hiển thị hình ảnh */}
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditUser(user)}>
                                            <i className="far fa-edit"></i>
                                        </button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(user)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {this.renderPagination()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
