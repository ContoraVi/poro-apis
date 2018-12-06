const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

// Load User model
const User = require('../../models/User');

// @route   POST /api/coa
// @desc    Test COA path
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'api/test path works'}));

// @route   GET api/coa
// @desc    Get COA data
// @access  Private
router.get('/coas',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {

        const errors = {};

        // console.log('req.params ' + req.query.accessToken);
        // 'Authorization': 'Bearer 8705ee2867b673e6ae67b8ccc9c26cfc647d582eb858ed08fefdbd3e2b49637a'

        const getCoa = {
            method: 'get',
            baseURL: 'https://api-test.procountor.com/api/coa',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + req.query.accessToken
            },
            maxRedirects: 0
        };

        axios.request(getCoa)
            .then(response => {
                res.status(200).json(JSON.stringify(response.data));
            })
            .catch(err => {
                const error = err.response.data;
                res.status(403).json(error);
            });
    }
);

module.exports = router;
