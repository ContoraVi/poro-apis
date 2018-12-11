import React, {Component} from 'react';

import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {withStyles} from "@material-ui/core";

// Material table imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import {getLedgerReceipts} from "../../actions/ledgerReceiptsActions";
import {clearLedgerReceipts} from "../../actions/ledgerReceiptsActions";
import {getLedgerReceiptId} from "../../actions/ledgerReceiptIdActions";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    head: {
        backgroundColor: "#fff",
        position: "sticky",
        top: 55
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

let ledgerReceiptsData = [];

class LedgerReceipts extends Component {

    componentDidMount() {
        if (!this.props.ledgerReceipts.loading && !this.props.ledgerReceipts.ledgerReceipts) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillUnmount() {
        ledgerReceiptsData = [];
        //this.props.clearLedgerReceipts();
    }

    onLedgerReceiptIdClick(event, receiptId) {
        const accessToken = {
            access_token: this.props.apiAuth.apiUser.access_token
        };

        this.props.getLedgerReceiptId(accessToken, receiptId);
        this.props.history.push('/ledgerreceipt')
    }

    render() {
        const {classes} = this.props;
        const {ledgerReceipts, loading, errors} = this.props.ledgerReceipts;

        if (errors) {
            ledgerReceiptsData.push({'id': 1, 'ledgerAccountCode': '' + errors, 'name': ''});
        } else {
            if (!loading && ledgerReceipts) {
                ledgerReceiptsData = ledgerReceipts.results;
            }
        }

        return (
            <Grid container justify="center">
                <div>
                    {
                        loading && ledgerReceipts === null ?
                            (
                                <Grid container justify="center">
                                    <CircularProgress className={classes.progress}/>
                                </Grid>
                            )
                            :
                            (
                                <Paper>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.head}>Receipt Id</TableCell>
                                                <TableCell className={classes.head}>Type</TableCell>
                                                <TableCell className={classes.head}>Status</TableCell>
                                                <TableCell className={classes.head}>Name</TableCell>
                                                <TableCell className={classes.head}>Receipt Date</TableCell>
                                                <TableCell className={classes.head}>Invoice Number</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {ledgerReceiptsData.map(row => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={event => this.onLedgerReceiptIdClick(event, row.receiptId)}
                                                        className={classes.row}
                                                        key={row.receiptId}
                                                    >
                                                        <TableCell component="th"
                                                                   scope="row">{row.receiptId}</TableCell>
                                                        <TableCell>{row.type}</TableCell>
                                                        <TableCell>{row.status}</TableCell>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.receiptDate}</TableCell>
                                                        <TableCell>{row.invoiceNumber}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            )
                    }
                </div>
            </Grid>
        )
    }
}

LedgerReceipts.propTypes = {
    getLedgerReceipts: PropTypes.func.isRequired,
    clearLedgerReceipts: PropTypes.func.isRequired,
    getLedgerReceiptId: PropTypes.func.isRequired,
    apiAuth: PropTypes.object.isRequired,
    ledgerReceipts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    apiAuth: state.apiAuth,
    ledgerReceipts: state.ledgerReceipts,
});

export default connect(mapStateToProps, {getLedgerReceipts, clearLedgerReceipts, getLedgerReceiptId})(withStyles(styles)(LedgerReceipts));
