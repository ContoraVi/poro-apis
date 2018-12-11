import React, {Component} from 'react';

import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {withStyles} from "@material-ui/core";

// Material table imports
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@material-ui/core/es/TextField/TextField";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import {clearLedgerReceiptId} from "../../actions/ledgerReceiptIdActions";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    headerText: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
        width: 200,
    },
    fields: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
        width: 200,
    },
    paper1: {
        textAlign: 'left',
        width: 300,
    },
    paper2: {
        width: 600,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        //width: 280,
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

class LedgerReceiptId extends Component {
    componentDidMount() {
        if (!this.props.ledgerReceiptId.loading && !this.props.ledgerReceiptId.ledgerReceiptId) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillUnmount() {
        //this.props.clearLedgerReceiptId();
    }

    render() {
        const {classes} = this.props;
        const {ledgerReceiptId, loading, errors} = this.props.ledgerReceiptId;

        if (errors) {
            // TODO: If nothing found -> do something?
        }

        return (
            <Grid container justify="center" className={classes.root}>
                <div>
                    {
                        loading && ledgerReceiptId === null ?
                            (
                                <Grid container justify="center">
                                    <CircularProgress className={classes.progress}/>
                                </Grid>
                            )
                            :
                            (
                                <div className={classes.root}>
                                    <Grid container justify={"center"} className={classes.root}>
                                        <Paper className={classes.paper1}>
                                            <Grid>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Receipt Id"
                                                        defaultValue={ledgerReceiptId.receiptId}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Type"
                                                        defaultValue={ledgerReceiptId.type}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Status"
                                                        defaultValue={ledgerReceiptId.status}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Name"
                                                        defaultValue={ledgerReceiptId.name}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Receipt Date"
                                                        defaultValue={ledgerReceiptId.receiptDate}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                            </Grid>
                                        </Paper>
                                        <Paper className={classes.paper1}>
                                            <Grid>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="VAT Type"
                                                        defaultValue={ledgerReceiptId.vatType}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="VAT Status"
                                                        defaultValue={ledgerReceiptId.vatStatus}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="VAT Processing"
                                                        defaultValue={ledgerReceiptId.vatProcessing}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Invoice Id"
                                                        defaultValue={ledgerReceiptId.invoiceId}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Invoice Notes"
                                                        defaultValue={ledgerReceiptId.invoiceNotes}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                            </Grid>
                                        </Paper>
                                        <Paper className={classes.paper1}>
                                            <Grid>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Invoice Number"
                                                        defaultValue={ledgerReceiptId.invoiceNumber}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Accountants Notes"
                                                        defaultValue={ledgerReceiptId.accountantsNotes}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Transaction Description"
                                                        defaultValue={ledgerReceiptId.transactionDescription}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Receipt Validity"
                                                        defaultValue={ledgerReceiptId.receiptValidity}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Period Start Date"
                                                        defaultValue={ledgerReceiptId.periodStartDate}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                            </Grid>
                                        </Paper>
                                        <Paper className={classes.paper1}>
                                            <Grid>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Period End Date"
                                                        defaultValue={ledgerReceiptId.periodEndDate}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Partner Code"
                                                        defaultValue={ledgerReceiptId.partnerCode}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Version"
                                                        defaultValue={ledgerReceiptId.version}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="Depreciation"
                                                        defaultValue={ledgerReceiptId.depreciation}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        disabled
                                                        label="VAT Date"
                                                        defaultValue={ledgerReceiptId.vatDate}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <br/>
                                    <Paper>
                                        <Grid>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className={classes.head}>Transaction Id</TableCell>
                                                    <TableCell className={classes.head}>Type</TableCell>
                                                    <TableCell className={classes.head}>Account</TableCell>
                                                    <TableCell className={classes.head}>Accounting Value</TableCell>
                                                    <TableCell className={classes.head}>VAT Percent</TableCell>
                                                    <TableCell className={classes.head}>Invoice Number</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {ledgerReceiptId.transactions.map(row => {
                                                    return (
                                                        <TableRow
                                                            className={classes.row}
                                                            key={row.transactionId}
                                                        >
                                                            <TableCell component="th"
                                                                       scope="row">{row.transactionId}</TableCell>
                                                            <TableCell>{row.transactionType}</TableCell>
                                                            <TableCell>{row.account}</TableCell>
                                                            <TableCell>{row.accountingValue}</TableCell>
                                                            <TableCell>{row.vatPercent}</TableCell>
                                                            <TableCell>{row.vatDeductionPercent}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                        </Grid>
                                    </Paper>
                                </div>
                            )
                    }
                </div>
            </Grid>
        )
    }
}

LedgerReceiptId.propTypes = {
    clearLedgerReceiptId: PropTypes.func.isRequired,
    apiAuth: PropTypes.object.isRequired,
    ledgerReceiptId: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    apiAuth: state.apiAuth,
    ledgerReceiptId: state.ledgerReceiptId,
});

export default connect(mapStateToProps, {clearLedgerReceiptId})(withStyles(styles)(LedgerReceiptId));
