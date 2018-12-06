const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load Input Validation
const validateApiLoginInput = require('../validation/api-login');

// @route   GET /api-auth/test
// @desc    Login test
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'GET api-auth/test Works'}));

// @route   POST /api-auth/test
// @desc    Login test
// @access  Private
router.post('/test',
    passport.authenticate('jwt', {session: false}),
    (req, res) => res.json({msg: 'POST api-auth/test Works?'}));

// @route   POST /api-auth/login
// @desc    Login to api
// @access  Public at the moment
router.post('/login',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {

        // Validate
        const {errors, isValid} = validateApiLoginInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        let dataString = 'response_type=code&username=xxxx&password=yyyy&company=zzzz&redirect_uri=redirect-uri-placeholder';

        const un = /xxxx/gi;
        const pw = /yyyy/gi;
        const co = /zzzz/gi;
        let getString = '';

        getString = dataString.replace(un, req.body.username);
        getString = getString.replace(pw, req.body.password);
        getString = getString.replace(co, req.body.company);

        const client_id = req.body.client_id;
        const client_secret = req.body.client_secret;

        //****************************************
        // 1. Authorization code grant
        //****************************************
        const apiCode = {
            method: 'post',
            baseURL: 'https://api-test.procountor.com/api/oauth/authz',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                response_type: 'code',
                client_id: client_id,
            },
            data: getString,
            validateStatus: function (status) {
                return status === 302;
            },
            maxRedirects: 0
        };

        axios.request(apiCode)
            .then(response => {
                var srch1 = '?code=';
                var srch2 = '&expires_in=';
                var ind1 = response.headers['location'].indexOf(srch1);
                var ind2 = response.headers['location'].indexOf(srch2);

                var code = response.headers['location'].substring(ind1 + 6, ind2);

                dataString = '';
                dataString =
                    "response_type=code" +
                    "&redirect_uri=redirect-uri-placeholder" +
                    "&code=xxxx" +
                    "&client_id=" + client_id +
                    "&client_secret=" + client_secret +
                    "&grant_type=authorization_code";

                const co = /xxxx/gi;
                let getString = '';

                getString = dataString.replace(co, code);

                //****************************************
                // 2. Access token
                //****************************************
                const apiToken = {
                    method: 'post',
                    baseURL: 'https://api-test.procountor.com/api/oauth/token',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: getString,
                    maxRedirects: 0
                };

                axios.request(apiToken)
                    .then(response => {

                        // Api user data
                        const payload =
                            {
                                company: req.body.company,
                                username: req.body.username,
                                client_id: req.body.client_id,
                                access_token: response.data.access_token,
                                refresh_token: response.data.refresh_token,
                                expires_in: response.data.expires_in
                            };

                        // Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                        // res.status(200).json(response.data); tämä oli eka versio
                    })
                    .catch(err => {
                        errors.password = 'Access Token not returned';
                        return res.status(400).json(errors);
                    });
                return response;
            })
            .catch(err => {
                errors.password = 'Authorization code not returned';
                res.status(400).json(errors);
            });
    }
);

module.exports = router;
