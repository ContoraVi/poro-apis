import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';

import {getCoas} from '../../actions/coasActions';
import {getLedgerReceipts} from '../../actions/ledgerReceiptsActions';

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class Dashboard extends React.Component {

    componentDidMount() {
        if (!this.props.apiAuth.isApiAuthenticated) {
            this.props.history.push('/apiLogin')
        }
    }

    onChartOfAccountsClick() {
        const accessToken = {
            access_token: this.props.apiAuth.apiUser.access_token
        };
        this.props.getCoas(accessToken);
        this.props.history.push('/coas')
    }

    onGetLedgerReceiptsClick() {
        const accessToken = {
            access_token: this.props.apiAuth.apiUser.access_token
        };
        this.props.getLedgerReceipts(accessToken);
        this.props.history.push('/ledgerreceipts')
    }

    render() {
        const {classes} = this.props;
        return (

            <div>
                <Button
                    onClick={this.onChartOfAccountsClick.bind(this)}
                    variant="contained"
                    color="primary"
                    className={classes.menuButton}
                >
                    get char of accounts
                </Button>
                <Button
                    onClick={this.onGetLedgerReceiptsClick.bind(this)}
                    variant="contained"
                    color="primary"
                    className={classes.menuButton}
                >
                    get ledger receipts
                </Button>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCoas: PropTypes.func.isRequired,
    getLedgerReceipts: PropTypes.func.isRequired,
    apiAuth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    apiAuth: state.apiAuth,
});

export default connect(mapStateToProps, {getCoas, getLedgerReceipts})(withStyles(styles)(Dashboard));
