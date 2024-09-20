import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/Movie/EditDeleteMovie';
import Header from '../containers/Header/Header';
// import ManageCinema from '../containers/System/Admin/ManageDoctor';
import ManageCinema from '../containers/System/Doctor/ManageCinema';
import GenresList from '../containers/System/Genres/ManageGenre';
import ManageMovie from '../containers/System/Admin/Movie/CreateMovie';
import ManageSeats from '../containers/System/Doctor/ManageSeats';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-cinemas" component={ManageCinema} />
                            <Route path="/system/cinemas/:cinemaId/theaters/:theaterId/seats" component={ManageSeats} />
                            <Route path="/system/manage-genres" component={GenresList} />
                            <Route path="/system/manage-movie" component={ManageMovie} />



                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
