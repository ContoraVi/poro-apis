import React, {Component} from 'react';

import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {withStyles} from "@material-ui/core";

// Material table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {getCoas} from "../../actions/coasActions";
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

const rows = [];

function createData(coas) {
    const coaData = JSON.parse(coas);
    coaData.ledgerAccounts.map((row, id) => {
        return (rows.push({'id': id, 'ledgerAccountCode': row.ledgerAccountCode, 'name': row.name}));
    })
}

class Coas extends Component {

    componentDidMount() {
        if (!this.props.coas.loading && !this.props.coas.coas) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        const {classes} = this.props;
        const {loading, coas} = this.props.coas;

        if (!loading && coas) {
            createData(coas);
        }

        return (
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
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Code</TableCell>
                                            <TableCell>Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => {
                                            return (
                                                <TableRow key={row.id}>
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
        )
    }
}

Coas.propTypes = {
    getCoas: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    apiAuth: PropTypes.object.isRequired,
    coas: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    apiAuth: state.apiAuth,
    coas: state.coas,
});

export default connect(mapStateToProps, {getCoas})(withStyles(styles)(Coas));
