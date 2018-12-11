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

import {getCoas} from "../../actions/coasActions";
import {clearCoas} from "../../actions/coasActions";

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

let coaData = [];

class Coas extends Component {

    componentDidMount() {
        if (!this.props.coas.loading && !this.props.coas.coas) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillUnmount() {
        coaData = [];
        this.props.clearCoas();
    }

    render() {
        const {classes} = this.props;
        const {loading, coas, coas_errors} = this.props.coas;

        if (coas_errors) {
            coaData.push({'id': 1, 'ledgerAccountCode': '' + coas_errors, 'name': ''});
        } else {
            if (!loading && coas) {
                coaData = coas.ledgerAccounts;
            }
        }

        return (
            <Grid container justify="center">
                <div>
                    {
                        loading && !coas ?
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
                                                <TableCell className={classes.head}>Code</TableCell>
                                                <TableCell className={classes.head}>Name</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                           {coaData.map(row => {
                                                return (
                                                    <TableRow className={classes.row} key={row.ledgerAccountCode}>
                                                        <TableCell component="th" scope="row">
                                                            {row.ledgerAccountCode}
                                                        </TableCell>
                                                        <TableCell>{row.name}</TableCell>
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

Coas.propTypes = {
    getCoas: PropTypes.func.isRequired,
    clearCoas: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    apiAuth: PropTypes.object.isRequired,
    coas: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    apiAuth: state.apiAuth,
    coas: state.coas,
});

export default connect(mapStateToProps, {getCoas, clearCoas})(withStyles(styles)(Coas));
