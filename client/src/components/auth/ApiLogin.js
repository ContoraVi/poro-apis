import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {apiLogin} from '../../actions/apiAuthActions';

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

class ApiLogin extends Component {
    constructor() {
        super();
        this.state = {
            company: '',
            username: '',
            password: '',
            client_id: '',
            client_secret: '',
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.apiAuth.isApiAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.apiAuth.isApiAuthenticated) {
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

        const apiLoginData = {
            company: this.state.company,
            username: this.state.username,
            password: this.state.password,
            client_id: this.state.client_id,
            client_secret: this.state.client_secret
        };

        // Login to api
        this.props.apiLogin(apiLoginData);
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
                                    Api Login
                                </Typography>
                            </Grid>
                            <TextField
                                label="Company"
                                name="company"
                                fullWidth
                                onChange={this.onChange}
                                error={!!this.state.errors.company}
                                helperText={this.state.errors.company}
                            />
                            <br/>
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
                            <TextField
                                type="text"
                                label="Client Id"
                                name="client_id"
                                fullWidth
                                onChange={this.onChange}
                                error={!!this.state.errors.client_id}
                                helperText={this.state.errors.client_id}
                            />
                            <TextField
                                type="password"
                                label="Client Secret"
                                name="client_secret"
                                fullWidth
                                onChange={this.onChange}
                                error={!!this.state.errors.client_secret}
                                helperText={this.state.errors.client_secret}
                            />
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

ApiLogin.propTypes = {
    apiLogin: PropTypes.func.isRequired,
    apiAuth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    apiAuth: state.apiAuth,
    errors: state.errors,
});

export default connect(mapStateToProps, {apiLogin})(withStyles(styles)(ApiLogin));
