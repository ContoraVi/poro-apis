const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

// Load User model
const User = require('../../models/User');

// @route   POST /api/coas
// @desc    Test  /api path
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'api/test path works'}));

// @route   GET api/coas
// @desc    Get Char Of Accounts
// @access  Private
router.get('/coas',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {

        const errors = {};

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
                res.status(200).json(response.data);
            })
            .catch(err => {
                const error = err.response.data;
                res.status(403).json(error);
            });
    }
);

// @route   GET api/ledgerreceipts
// @desc    Get Ledger Receips
// @access  Private
router.get('/ledgerreceipts',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {};

        const getLedgerReceipts = {
            method: 'get',
            baseURL: 'https://api-test.procountor.com/api/ledgerreceipts',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + req.query.accessToken
            },
            maxRedirects: 0
        };

        axios.request(getLedgerReceipts)
            .then(response => {
                res.status(200).json(response.data);
            })
            .catch(err => {
                const error = err.response.data;
                res.status(403).json(error);
            });
    }
);

// @route   GET api/ledgerreceipt
// @desc    Get Ledger Receip
// @access  Private
router.get('/ledgerreceipt',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {};

        const getLedgerReceiptId = {
            method: 'get',
            baseURL: 'https://api-test.procountor.com/api/ledgerreceipts/' + req.query.receiptId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + req.query.accessToken
            },
            maxRedirects: 0
        };

        axios.request(getLedgerReceiptId)
            .then(response => {
                res.status(200).json(response.data);
            })
            .catch(err => {
                const error = err.response.data;
                res.status(403).json(error);
            });
    }
);

module.exports = router;
