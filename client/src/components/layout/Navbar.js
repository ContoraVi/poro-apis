import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authActions";
import {logoutApiUser} from "../../actions/apiAuthActions";


// import Login from "../auth/Login";
// import ApiLogin from "../auth/ApiLogin";
// import Landing from '../layout/Landing';
// import classNames from 'classnames';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    padding: {
        paddingBottom: 20
    },
};

class Navbar extends Component {

    onLogoutClick(event) {
        event.preventDefault();
        this.props.logoutUser();
        this.props.logoutApiUser();
    }

    render() {
        const {classes} = this.props;
        const {isAuthenticated} = this.props.auth;

        const isNotLoggedIn =
            (<Button
                component={NavLink}
                to="/login"
                exact
                variant="contained"
                color="primary"
                className={classes.menuButton}>
                Login
            </Button>);

        const isLoggedIn =
            (<Button
                component={NavLink}
                onClick={this.onLogoutClick.bind(this)}
                to="/"
                exact
                variant="contained"
                color="primary"
                className={classes.menuButton}>
                Logout
            </Button>);

        return (
            <div>
                <div className={classes.padding}>
                    <AppBar position="sticky">
                        <Toolbar>
                            <Typography
                                component={NavLink}
                                style={{textDecoration: 'none'}}
                                to="/"
                                align="left"
                                variant="h6"
                                color="inherit"
                                className={classes.grow}>
                                Header
                            </Typography>
                            {isAuthenticated ? isLoggedIn : isNotLoggedIn}
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    logoutApiUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, logoutApiUser})(withStyles(styles)(Navbar));
