import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import *  as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditonChange({ html, text }) {
    console.log('handleEditonChange', html, text);
}
/** Life Cycle
 *  run constructor (init state)
 *  DidMount (set state)
 *  render

 */
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }


    async componentDidMount() {
        this.props.fetchUserRedux()

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }

    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }
    render() {
        console.log('check list userredux', this.props.listUsers);
        console.log('check state user redeux', this.state);
        let arrUser = this.state.userRedux
        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tr>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Phone number</th>
                        <th>Role id</th>
                        <th>Action</th>
                    </tr>

                    {arrUser && arrUser.length > 0 &&

                        arrUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.phone_number}</td>
                                    <td>{item.role_id}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}
                                        >
                                            <i className="far fa-edit"></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}
                                        >
                                            <i className="fas fa-trash"></i>

                                        </button>

                                    </td>
                                </tr>

                            )
                        })

                    }
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditonChange} />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchUserManageStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteAUser(id)),
        editUserRedux: (data) => dispatch(actions.editAUser(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
