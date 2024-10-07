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
import Showtimes from '../containers/System/Admin/ShowTime/Showtimes';
import SelectShowtimes from '../containers/System/Admin/ShowTime/SelectShowtimes';
import TicketList from '../containers/System/Admin/Tickets/TicketList';
import RevenueDashboard from '../containers/System/Admin/Revenue/RevenueDashboard';
import RevenueByMovieWeekly from '../containers/System/Admin/Revenue/RevenueByMovieWeekly';
import RevenueByShowtime from '../containers/System/Admin/Revenue/RevenueByShowtime';
import CinemaSelector from '../containers/Patient/Staff/CinemaSelector';
import TicketScanner from '../containers/Patient/Staff/ScanQRCode/TicketScanner';
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
                            <Route path="/system/showtimes/select" component={SelectShowtimes} /> {/* Thêm route mới */}
                            <Route path="/system/theaters/:theaterId/showtimes" component={Showtimes} />
                            <Route path="/system/tickets" component={TicketList} />
                            <Route path="/system/revenue" component={RevenueDashboard} />
                            <Route path="/system/revenue-by-movie" component={RevenueByMovieWeekly} />
                            <Route path="/system/revenue-by-showtime" component={RevenueByShowtime} />
                            <Route path="/system/staff/theater" component={CinemaSelector} />
                            <Route path="/system/staff/scan-qr" component={TicketScanner} />







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
