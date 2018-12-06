import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {loginUser} from "../../actions/authActions";

const styles = theme => ({
    card: {
        flexGrow: 1,
        maxWidth: 500,
        padding: '10px'                     //padding inside card
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 0,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password
        };

        // Login user
        this.props.loginUser(userData);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className="background">
                <Grid container justify="center">
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid>
                                <Typography align={"center"}
                                            color="primary"
                                            variant="headline">
                                    Login
                                </Typography>
                            </Grid>
                            <TextField
                                label="User Name"
                                name="username"
                                fullWidth
                                onChange={this.onChange}
                                error={!!this.state.errors.username}
                                helperText={this.state.errors.username}
                            />
                            <br/>
                            <TextField
                                type="password"
                                label="Password"
                                name="password"
                                fullWidth
                                onChange={this.onChange}
                                error={!!this.state.errors.password}
                                helperText={this.state.errors.password}
                            />
                            <br/>
                            <br/>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={this.onSubmit}
                            >Login</Button>
                        </CardActions>

                    </Card>
                </Grid>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {loginUser})(withStyles(styles)(withRouter(Login)));
