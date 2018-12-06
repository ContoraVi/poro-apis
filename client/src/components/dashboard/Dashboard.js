import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';

import {getCoas} from "../../actions/coasActions";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
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
    table: {
        minWidth: 700,
    },
});

class Dashboard extends React.Component {

    componentDidMount() {
        if (!this.props.apiAuth.isApiAuthenticated) {
            this.props.history.push('/apiLogin')
        }
    }

    onGetCoaDataClick() {
        const accessToken = {
            access_token: this.props.apiAuth.apiUser.access_token
        };
        this.props.getCoas(accessToken);
        this.props.history.push('/coas')
    }

    render() {
        const {classes} = this.props;
        return (

            <div>
                <Button
                    onClick={this.onGetCoaDataClick.bind(this)}
                    variant="contained"
                    color="primary"
                    className={classes.menuButton}
                >
                    get coa's
                </Button>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCoas: PropTypes.func.isRequired,
    apiAuth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    apiAuth: state.apiAuth,
});

export default connect(mapStateToProps, {getCoas})(withStyles(styles)(Dashboard));
