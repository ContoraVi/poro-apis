const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateApiLoginInput(data) {
    let errors = {};

    data.company = !isEmpty(data.company) ? data.company : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.client_id = !isEmpty(data.client_id) ? data.client_id : '';
    data.client_secret = !isEmpty(data.client_secret) ? data.client_secret : '';

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(data.client_id)) {
        errors.client_id = 'Password field is required';
    }

    if (Validator.isEmpty(data.client_secret)) {
        errors.client_secret = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
