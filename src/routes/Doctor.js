import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule'
import ManageScheduleOfDoctor from '../containers/System/Doctor/ManageScheduleOfDoctor'
import ManageHandbook from '../containers/System/Handbook/ManageHandbook'
import ManagePatient from '../containers/System/Doctor/ManagePatient'

class Doctor extends Component {
    render() {
        return (
            
            <>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-schedule-of-doctor" component={ManageScheduleOfDoctor} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} />
                            <Route path="/system/manage-handbook" component={ManageHandbook} />
                            <Route component={() => { return (<Redirect to={this.props.systemMenuPath} />) }} />

                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPathAdmin,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
